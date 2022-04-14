import { Atraccion } from '@entities/atraccion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputAtraccionDto } from './dto/input-atraccion.dto';
import { AtraccionDto } from './dto/atraccion.dto';
import { deleteFile } from '@utils/file-upload.utility';

@Injectable()
export class AtraccionesService {
    constructor(
        @InjectRepository(Atraccion)
        private atraccionesRepository: Repository<Atraccion>,
    ) {}

    async create(atraccion: InputAtraccionDto): Promise<AtraccionDto> {
        return await this.atraccionesRepository.save(atraccion);
    }

    async update(id: number, atraccion: InputAtraccionDto): Promise<void> {
        const atraccionToUpdate = await this.atraccionesRepository.findOne(id);
        if (!atraccionToUpdate) throw new Error("atraccion doesn't exist");
        this.atraccionesRepository.save({ ...atraccionToUpdate, ...atraccion });
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const atraccionToUpdate = await this.atraccionesRepository.findOne(id);
        if (!atraccionToUpdate) throw new Error("atraccion doesn't exist");
        deleteFile(atraccionToUpdate.imagen);
        atraccionToUpdate.imagen = imagen;
        this.atraccionesRepository.save(atraccionToUpdate);
    }

    async findAll(): Promise<AtraccionDto[]> {
        return this.atraccionesRepository.find({
            select: ['id', 'nombre', 'descripcion', 'imagen'],
        });
    }

    async findOne(id: number): Promise<AtraccionDto> {
        const data = await this.atraccionesRepository.findOne(id, {
            select: ['id', 'nombre'],
        });
        if (!data) throw new Error('atraccion not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.atraccionesRepository.softDelete(id);
    }
}
