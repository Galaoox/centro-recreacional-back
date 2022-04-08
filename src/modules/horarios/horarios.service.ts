import { Horario } from '@entities/Horario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateToHourAndMinutes } from '@utils/transformDate';
import { Repository } from 'typeorm';
import { HorarioDto } from './dto/horario.dto';
import { InputHorarioDto } from './dto/input-horario.dto';

@Injectable()
export class HorariosService {
    constructor(
        @InjectRepository(Horario)
        private horarioRepository: Repository<Horario>,
    ) {}

    async create(horario: InputHorarioDto): Promise<void> {
        const data = {
            ...horario,
            horaInicial: dateToHourAndMinutes(new Date(horario.horaInicial)),
            horaFinal: dateToHourAndMinutes(new Date(horario.horaFinal)),
        };
        console.log(data);
        this.horarioRepository.save(data);
    }

    async update(id: number, horario: InputHorarioDto): Promise<Horario> {
        const horarioToUpdate = await this.horarioRepository.findOne(id);
        if (!horarioToUpdate) throw new Error("Horario doesn't exist");
        return this.horarioRepository.save({
            ...horarioToUpdate,
            ...horario,
            horaInicial: dateToHourAndMinutes(new Date(horario.horaInicial)),
            horaFinal: dateToHourAndMinutes(new Date(horario.horaFinal)),
        });
    }

    findAll(): Promise<HorarioDto[]> {
        return this.horarioRepository.find({
            select: ['id', 'nombre', 'descripcion', 'horaInicial', 'horaFinal'],
        });
    }

    async findOne(id: number): Promise<HorarioDto> {
        const data = await this.horarioRepository.findOne(id, {
            select: ['id', 'nombre', 'descripcion', 'horaInicial', 'horaFinal'],
        });
        if (!data) throw new Error('Horario not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.horarioRepository.softDelete(id);
    }
}
