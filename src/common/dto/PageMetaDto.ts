import { ApiProperty } from '@nestjs/swagger';

import { PageOptionsDto } from './PageOptionsDto';

interface IPageMetaDtoParameters {
  pageOptionsDto?: PageOptionsDto;
  itemCount?: number;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number = 1;

  @ApiProperty()
  readonly take: number = 10;

  @ApiProperty()
  readonly itemCount: number = 0;

  @ApiProperty()
  readonly pageCount: number = 0;

  @ApiProperty()
  readonly hasPreviousPage: boolean = false;

  @ApiProperty()
  readonly hasNextPage: boolean = false;

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters = {}) {
    if (!pageOptionsDto) {
      return;
    }

    this.page = pageOptionsDto?.page;
    this.take = pageOptionsDto?.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
