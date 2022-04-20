import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteFile } from '@utils/file-upload.utility';
import { Repository } from 'typeorm';
import { InputTipoAlojamientoDto } from './dto/input-tipo-alojamiento.dto';
import { TipoAlojamientoDto } from './dto/tipo-alojamiento.dto';
import { HttpNotFoundError } from '@utils/custom-errors-http.utility';

@Injectable()
export class TiposAlojamientoService {
    constructor(
        @InjectRepository(TipoAlojamiento)
        private repository: Repository<TipoAlojamiento>,
    ) {}

    async create(
        tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<TipoAlojamientoDto> {
        return await this.repository.save({
            ...tipoAlojamiento,
        });
    }

    async update(
        id: number,
        tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<void> {
        const tipoAlojamientoToUpdate = await this.repository.findOne(id);
        if (!tipoAlojamientoToUpdate) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        this.repository.save({
            ...tipoAlojamientoToUpdate,
            ...tipoAlojamiento,
        });
    }

    async findAll(): Promise<TipoAlojamientoDto[]> {
        const data = await this.repository.find();
        return data;
    }

    async findOne(id: number): Promise<TipoAlojamientoDto> {
        const data = await this.repository.findOne(id);
        if (!data) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const tipoAlojamientoToUpdate = await this.repository.findOne(id);
        if (!tipoAlojamientoToUpdate) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        deleteFile(tipoAlojamientoToUpdate.imagen);
        tipoAlojamientoToUpdate.imagen = imagen;
        this.repository.save(tipoAlojamientoToUpdate);
    }
}
