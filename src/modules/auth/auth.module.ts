import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosService } from '@modules/usuarios/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@entities/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [UsuariosService, AuthService, JwtStrategy, ConfigService],
    controllers: [AuthController],
})
export class AuthModule {}
