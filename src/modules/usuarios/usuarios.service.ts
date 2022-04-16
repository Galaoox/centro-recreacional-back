import { Usuario } from '@entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encrypt } from '@utils/bcrypt.utility';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    async create(usuario: CreateUsuarioDto): Promise<CreateUsuarioDto> {
        const emailExists = await this.validateIfEmailExists(
            usuario.correoElectronico,
        );
        if (emailExists) throw new Error('Email already exists');
        usuario.contrasena = await encrypt(usuario.contrasena);
        return await this.usuarioRepository.save({
            ...usuario,
            rol: {
                id: usuario.rolId,
            },
            tipoDocumento: {
                id: usuario.tipoDocumentoId,
            },
        });
    }

    async update(id: number, usuario: UpdateUsuarioDto): Promise<void> {
        const usuarioToUpdate = await this.usuarioRepository.findOne(id);
        if (!usuarioToUpdate) throw new Error("Usuario doesn't exist");
        this.usuarioRepository.save({
            ...usuarioToUpdate,
            ...usuario,
            rol: {
                id: usuario.rolId,
            },
            tipoDocumento: {
                id: usuario.tipoDocumentoId,
            },
        });
    }

    async findAll(): Promise<UsuarioDto[]> {
        return this.usuarioRepository.find({
            select: [
                'id',
                'nombre1',
                'nombre2',
                'apellido1',
                'apellido2',
                'correoElectronico',
                'documento',
            ],
            relations: ['tipoDocumento', 'rol'],
        });
    }

    async findOne(id: number): Promise<UsuarioDto> {
        const data = await this.usuarioRepository.findOne(id, {
            select: [
                'id',
                'nombre1',
                'nombre2',
                'apellido1',
                'apellido2',
                'correoElectronico',
                'documento',
            ],
            relations: ['tipoDocumento', 'rol'],
        });
        if (!data) throw new Error('Tipo documento not found');
        return data;
    }

    async findByEmail(email: string): Promise<UsuarioDto> {
        const data = await this.usuarioRepository.findOne({
            where: {
                correoElectronico: email,
            },
            select: [
                'id',
                'nombre1',
                'nombre2',
                'apellido1',
                'apellido2',
                'correoElectronico',
                'documento',
                'contrasena',
            ],
        });
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.usuarioRepository.softDelete(id);
    }

    private async validateIfEmailExists(email: string): Promise<boolean> {
        const counter = await this.usuarioRepository.count({
            where: {
                correoElectronico: email,
            },
        });
        return counter > 0;
    }
}