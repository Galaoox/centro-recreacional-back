import { Atraccion } from '@entities/Atraccion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputAtraccionDto } from './dto/input-atraccion.dto';
import { AtraccionDto } from './dto/atraccion.dto';

@Injectable()
export class AtraccionesService {
    constructor(
        @InjectRepository(Atraccion)
        private atraccionesRepository: Repository<Atraccion>,
    ) {}

    async create(rol: InputAtraccionDto): Promise<void> {
        this.atraccionesRepository.save(rol);
    }

    async update(id: number, rol: InputAtraccionDto): Promise<void> {
        const rolToUpdate = await this.atraccionesRepository.findOne(id);
        if (!rolToUpdate) throw new Error("Rol doesn't exist");
        this.atraccionesRepository.save({ ...rolToUpdate, ...rol });
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
        if (!data) throw new Error('Rol not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.atraccionesRepository.softDelete(id);
    }
}
