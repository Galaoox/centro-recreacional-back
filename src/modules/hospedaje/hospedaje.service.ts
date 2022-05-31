import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { Alojamiento } from '@entities/alojamiento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HospedajeService {
    constructor(
        @InjectRepository(Alojamiento)
        private alojamientoRepository: Repository<Alojamiento>,
        @InjectRepository(AdicionAlojamiento)
        private adicionAlojamientoRepository: Repository<AdicionAlojamiento>,
    ) {}

    async create(data: any): Promise<any> {
        const resultAlojamiento = await this.alojamientoRepository.save({
            numeroPersonas: data.numeroPersonas,
            cantidadDias: data.cantidadDias,
            fechaIngreso: data.fechaIngreso,
            fechaSalida: data.fechaSalida,
            valor: data.valor,
            valorTotal: data.valorTotal,
            tipoAlojamiento: {
                id: data.tipoAlojamientoId,
            },
            usuario: {
                id: data.usuarioId,
            },
        });

        data.adiciones.forEach(async (adicion: any) => {
            await this.adicionAlojamientoRepository.save({
                alojamiento: {
                    id: resultAlojamiento.id,
                },
                tipoAdicionAlojamiento: {
                    id: adicion.id,
                },
                valor: adicion.valor,
            });
        });
    }
}
