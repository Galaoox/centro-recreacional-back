import { Module } from '@nestjs/common';
import { TiposAlojamientoService } from './tipos-alojamiento.service';
import { TiposAlojamientoController } from './tipos-alojamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoAlojamiento])],
    providers: [TiposAlojamientoService],
    controllers: [TiposAlojamientoController],
})
export class TiposAlojamientoModule {}
