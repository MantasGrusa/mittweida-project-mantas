import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://192.168.178.61:5174',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
// app.enableCors({
  //   origin: '*',
  // });
  // for troubleshooting, use this version of enableCors


  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('Mittwieda')
      .setDescription('A simple user authentication API for student project')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');

}
bootstrap();