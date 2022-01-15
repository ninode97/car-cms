import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const env = process.env.NODE_ENV;
  const isProduction = env == 'production';

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: !isProduction,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(5000);
}
bootstrap();
