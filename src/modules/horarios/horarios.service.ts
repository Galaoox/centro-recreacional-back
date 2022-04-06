import { Horario } from '@entities/Horario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class HorariosService {
    constructor(
        @InjectRepository(Horario)
        private horarioRepository: Repository<Horario>,
    ) {}

    async create(horario: CreateHorarioDto): Promise<Horario> {
        return this.horarioRepository.save(horario);
    }

    async update(id: number, horario: UpdateHorarioDto): Promise<Horario> {
        const horarioToUpdate = await this.horarioRepository.findOne(id);
        if (!horarioToUpdate) throw new Error("Horario doesn't exist");
        return this.horarioRepository.save({ ...horarioToUpdate, ...horario });
    }

    findAll(): Promise<Horario[]> {
        return this.horarioRepository.find();
    }

    async findOne(id: number): Promise<Horario> {
        const data = await this.horarioRepository.findOne(id);
        if (!data) throw new Error('Horario not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.horarioRepository.softDelete(id);
    }
}
