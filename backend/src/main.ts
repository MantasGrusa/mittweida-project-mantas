import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for GitHub Pages
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://mantasgrusa.github.io'
    ],
    credentials: true
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('Location Game API')
      .setDescription('API for the location-based game')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API Documentation: http://localhost:${port}/api`);
}
bootstrap();