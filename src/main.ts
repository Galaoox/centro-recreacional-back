import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
        bufferLogs: true,
    });
    app.use(express.static(__dirname + 'uploads'));
    app.setGlobalPrefix('api');
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    const config = new DocumentBuilder()
        .setTitle('Centro recreacional api')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
}
bootstrap();
