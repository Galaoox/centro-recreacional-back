import { Roles } from '@entities/Roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) {}

    async create(rol: CreateRolDto): Promise<Roles> {
        return this.rolesRepository.save(rol);
    }

    async update(id: number, rol: UpdateRolDto): Promise<Roles> {
        const rolToUpdate = await this.rolesRepository.findOne(id);
        if (!rolToUpdate) throw new Error("Rol doesn't exist");
        return this.rolesRepository.save({ ...rolToUpdate, ...rol });
    }

    findAll(): Promise<Roles[]> {
        return this.rolesRepository.find();
    }

    findOne(id: number): Promise<Roles> {
        return this.rolesRepository.findOne(id);
    }

    async remove(id: number): Promise<any> {
        return this.rolesRepository.softDelete(id);
    }
}
