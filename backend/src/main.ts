import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://yourusername.github.io',
      /^http:\/\/192\.168\.\d+\.\d+:5173$/, // Allow any local network IP
      /^http:\/\/10\.\d+\.\d+\.\d+:5173$/,  // Allow other network ranges
    ],
    credentials: true
  });
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('User Authentication API')
      .setDescription('A simple user authentication API for student project')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
  console.log('Server running on http://localhost:3000');
  console.log('Swagger documentation: http://localhost:3000/api');
}
bootstrap();