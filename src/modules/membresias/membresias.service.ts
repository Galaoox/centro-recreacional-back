import { Membresia } from '@entities/membresia.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembresiasService {
    constructor(
        @InjectRepository(Membresia)
        private repository: Repository<Membresia>,
    ) {}

    async create(data: any) {
        await this.repository.softDelete({
            usuario: {
                id: data.usuarioId,
            },
        });
        return await this.repository.save({
            valor: data.valor,
            descuentos: data.descuentos,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            tipoMembresia: {
                id: data.tipoMembresiaId,
            },
            usuario: {
                id: data.usuarioId,
            },
        });
    }

    async getMembresiasByUser(usuarioId: number) {
        const result = await this.repository.findOne({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },
        });
        return result;
    }
}
