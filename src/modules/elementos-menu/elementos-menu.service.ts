import { ElementoMenu } from '@entities/elemento-menu.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteFile } from '@utils/file-upload.utility';
import { Repository } from 'typeorm';
import { ElementoMenuDto } from './dto/elemento-menu.dto';
import { GroupedElementoMenuDto } from './dto/grouped-elemento-menu.dto';
import { InputElementoMenuDto } from './dto/input-elemento-menu.dto';

@Injectable()
export class ElementosMenuService {
    constructor(
        @InjectRepository(ElementoMenu)
        private elementoMenuRepository: Repository<ElementoMenu>,
    ) {}

    async create(elementoMenu: InputElementoMenuDto): Promise<ElementoMenuDto> {
        return await this.elementoMenuRepository.save({
            ...elementoMenu,
            categoriaMenu: {
                id: elementoMenu.categoriaMenuId,
            },
        });
    }

    async update(
        id: number,
        elementoMenu: InputElementoMenuDto,
    ): Promise<void> {
        const elementoMenuToUpdate = await this.elementoMenuRepository.findOne(
            id,
        );
        if (!elementoMenuToUpdate) throw new Error("Elemento doesn't exist");
        this.elementoMenuRepository.save({
            ...elementoMenuToUpdate,
            ...elementoMenu,
            categoriaMenu: {
                id: elementoMenu.categoriaMenuId,
            },
        });
    }

    async findAll(): Promise<ElementoMenuDto[]> {
        const data = await this.elementoMenuRepository.find();
        return data;
    }

    async findOne(id: number): Promise<ElementoMenuDto> {
        const data = await this.elementoMenuRepository.findOne(id, {
            relations: ['categoriaMenu'],
        });
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async findGroupedByCategoryMenu(): Promise<GroupedElementoMenuDto> {
        const data = await this.elementoMenuRepository.find({
            relations: ['categoriaMenu'],
        });
        const groupedData = data.reduce((acc, curr) => {
            if (!acc[curr.categoriaMenu.nombre]) {
                acc[curr.categoriaMenu.nombre] = [];
            }
            acc[curr.categoriaMenu.nombre].push(curr);
            return acc;
        }, {});
        return groupedData;
    }

    async remove(id: number): Promise<any> {
        return this.elementoMenuRepository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const elementoMenuToUpdate = await this.elementoMenuRepository.findOne(
            id,
        );
        if (!elementoMenuToUpdate)
            throw new Error("Elemento Menu doesn't exist");
        deleteFile(elementoMenuToUpdate.imagen);
        elementoMenuToUpdate.imagen = imagen;
        this.elementoMenuRepository.save(elementoMenuToUpdate);
    }
}
