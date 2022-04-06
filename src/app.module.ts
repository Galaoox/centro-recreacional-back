import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@modules/roles/roles.module';
import { HorariosModule } from '@modules/horarios/horarios.module';
import { CategoriasMenuModule } from '@modules/categorias-menu/categorias-menu.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('HOST'),
                port: configService.get<number>('PORT'),
                username: configService.get('USERNAME'),
                password: configService.get('PASSWORD'),
                database: configService.get('DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        RolesModule,
        HorariosModule,
        CategoriasMenuModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
