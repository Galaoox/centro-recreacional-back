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
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { InputAtraccionDto } from './dto/input-atraccion.dto';
import { AtraccionDto } from './dto/atraccion.dto';
import { AtraccionesService } from './atracciones.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { editFileName, imageFileFilter } from '@utils/file-upload.utility';
import { diskStorage } from 'multer';

@ApiTags('Atracciones')
@Controller('atracciones')
export class AtraccionesController {
    constructor(private atraccionesService: AtraccionesService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                filename: editFileName,
                destination: './uploads/atracciones',
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async create(
        // @Body() rol: InputAtraccionDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        try {
            console.log(image);
            // await this.atraccionesService.create(rol);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<AtraccionDto[]> {
        return await this.atraccionesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<AtraccionDto> {
        try {
            return await this.atraccionesService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() rol: InputAtraccionDto) {
        try {
            await this.atraccionesService.update(id, rol);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.atraccionesService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
