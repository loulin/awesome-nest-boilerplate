import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, swaggerOpts): void {
  const options = new DocumentBuilder()
    .setTitle('Terumo MediSafe API')
    .setVersion('1.0.0')
    .addServer(swaggerOpts.server)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}
