import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
 
 const app = await NestFactory.create(AppModule, {cors: true});

app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');

   const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NEST AUTH DEMO')
    .setDescription('The NEST AUTH API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Application is running on: ${PORT}/api-docs`);
}
bootstrap();
