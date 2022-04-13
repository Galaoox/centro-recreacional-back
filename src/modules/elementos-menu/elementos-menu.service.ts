import { ElementoMenu } from '@entities/elemento-menu.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementoMenuDto } from './dto/elemento-menu.dto';
import { InputElementoMenuDto } from './dto/input-elemento-menu.dto';

@Injectable()
export class ElementosMenuService {
    constructor(
        @InjectRepository(ElementoMenu)
        private elementoMenuRepository: Repository<ElementoMenu>,
    ) {}

    async create(elementoMenu: InputElementoMenuDto): Promise<void> {
        this.elementoMenuRepository.save(elementoMenu);
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
        });
    }

    async findAll(): Promise<ElementoMenuDto[]> {
        const data = await this.elementoMenuRepository.find();
        console.log(data);
        return data;
    }

    async findOne(id: number): Promise<ElementoMenuDto> {
        const data = await this.elementoMenuRepository.findOne(id);
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.elementoMenuRepository.softDelete(id);
    }
}
