import { Module } from '@nestjs/common';
import { AtraccionesController } from './atracciones.controller';
import { AtraccionesService } from './atracciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atraccion } from '@entities/atraccion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Atraccion])],
    controllers: [AtraccionesController],
    providers: [AtraccionesService],
})
export class AtraccionesModule {}
