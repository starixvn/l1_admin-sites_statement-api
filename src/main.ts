import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable compression
  app.use(
    compression({
      filter: shouldCompress,
      threshold: 0, // compress all responses
    }),
  );

  // Validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Daily Statements API')
    .setDescription('API documentation for Daily Statements')
    .setVersion('1.0')
    .addTag('daily-statements')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

// Compression filter function
function shouldCompress(req, res) {
  // Don't compress responses with this request header
  if (req.headers['x-no-compression']) {
    return false;
  }

  // Use compression
  return compression.filter(req, res);
}

bootstrap();
