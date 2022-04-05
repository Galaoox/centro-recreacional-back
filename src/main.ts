import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Centro recreacional api')
        .setDescription('nada')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
    await app.listen(3000);
}
bootstrap();
