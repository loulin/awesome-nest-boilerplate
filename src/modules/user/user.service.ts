import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
  ) {}

  findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData, { relations: ['ward'] });
  }

  async findByUsername(options: {
    username: string;
  }): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (!options.username) {
      return null;
    }

    queryBuilder.orWhere('user.username = :username', {
      username: options.username,
    });

    return queryBuilder.getOne();
  }

  createUser(data: UserDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.ward', 'ward');
    const [users, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}
