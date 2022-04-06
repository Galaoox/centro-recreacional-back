import { Module } from '@nestjs/common';
import { CategoriasMenuController } from './categorias-menu.controller';
import { CategoriasMenuService } from './categorias-menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaMenu } from '@entities/CategoriaMenu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaMenu])],
    controllers: [CategoriasMenuController],
    providers: [CategoriasMenuService],
})
export class CategoriasMenuModule {}
