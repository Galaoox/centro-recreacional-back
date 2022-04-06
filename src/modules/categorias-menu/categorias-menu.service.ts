import { CategoriaMenu } from '@entities/CategoriaMenu.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputCategoriaMenuDto } from './dto/input-categoria-menu.dto';

@Injectable()
export class CategoriasMenuService {
    constructor(
        @InjectRepository(CategoriaMenu)
        private categoriaMenuRepository: Repository<CategoriaMenu>,
    ) {}

    async create(categoriaMenu: InputCategoriaMenuDto): Promise<CategoriaMenu> {
        return this.categoriaMenuRepository.save(categoriaMenu);
    }

    async update(
        id: number,
        categoriaMenu: InputCategoriaMenuDto,
    ): Promise<CategoriaMenu> {
        const categoriaMenuToUpdate =
            await this.categoriaMenuRepository.findOne(id);
        if (!categoriaMenuToUpdate) throw new Error("Categoria doesn't exist");
        return this.categoriaMenuRepository.save({
            ...categoriaMenuToUpdate,
            ...categoriaMenu,
        });
    }

    findAll(): Promise<CategoriaMenu[]> {
        return this.categoriaMenuRepository.find();
    }

    async findOne(id: number): Promise<CategoriaMenu> {
        const data = await this.categoriaMenuRepository.findOne(id);
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.categoriaMenuRepository.softDelete(id);
    }
}
