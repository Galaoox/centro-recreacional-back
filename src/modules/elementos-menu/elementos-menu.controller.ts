import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ElementoMenuDto } from './dto/elemento-menu.dto';
import { InputElementoMenuDto } from './dto/input-elemento-menu.dto';
import { ElementosMenuService } from './elementos-menu.service';

@ApiTags('Elementos menu')
@Controller('elementos-menu')
export class ElementosMenuController {
    constructor(private elementosMenuService: ElementosMenuService) {}

    @Post()
    async create(@Body() categoriaMenu: InputElementoMenuDto) {
        try {
            await this.elementosMenuService.create(categoriaMenu);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<ElementoMenuDto[]> {
        return await this.elementosMenuService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ElementoMenuDto> {
        try {
            return await this.elementosMenuService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() categoriaMenu: InputElementoMenuDto,
    ) {
        try {
            await this.elementosMenuService.update(id, categoriaMenu);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.elementosMenuService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
