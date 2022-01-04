import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  await app.listen(3000);
}
bootstrap();
