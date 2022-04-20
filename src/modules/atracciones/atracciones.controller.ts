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
    UseInterceptors,
} from '@nestjs/common';
import { InputAtraccionDto } from './dto/input-atraccion.dto';
import { AtraccionDto } from './dto/atraccion.dto';
import { AtraccionesService } from './atracciones.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '@utils/file-upload.utility';
import { diskStorage } from 'multer';

@ApiTags('Atracciones')
@Controller('atracciones')
export class AtraccionesController {
    constructor(private atraccionesService: AtraccionesService) {}

    @Post()
    async create(@Body() atraccion: InputAtraccionDto) {
        try {
            await this.atraccionesService.create(atraccion);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Post('upload/:id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                filename: editFileName,
                destination: './uploads/atracciones',
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async upload(
        @UploadedFile() image: Express.Multer.File,
        @Param('id') id: number,
    ) {
        try {
            await this.atraccionesService.uploadImage(id, image.path);
        } catch (error) {
            console.log(error);
            throw new NotFoundException();
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
    async update(
        @Param('id') id: number,
        @Body() atraccion: InputAtraccionDto,
    ) {
        try {
            await this.atraccionesService.update(id, atraccion);
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
