import { Roles } from '@entities/Roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputRolDto } from './dto/input-rol.dto';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) {}

    async create(rol: InputRolDto): Promise<void> {
        this.rolesRepository.save(rol);
    }

    async update(id: number, rol: InputRolDto): Promise<void> {
        const rolToUpdate = await this.rolesRepository.findOne(id);
        if (!rolToUpdate) throw new Error("Rol doesn't exist");
        this.rolesRepository.save({ ...rolToUpdate, ...rol });
    }

    async findAll(): Promise<RolDto[]> {
        return this.rolesRepository.find({
            select: ['id', 'nombre'],
        });
    }

    findOne(id: number): Promise<RolDto> {
        return this.rolesRepository.findOne(id, { select: ['id', 'nombre'] });
    }

    async remove(id: number): Promise<any> {
        return this.rolesRepository.softDelete(id);
    }
}
