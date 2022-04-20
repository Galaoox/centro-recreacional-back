import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Logger,
    BadRequestException,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from '@utils/file-upload.utility';
import { diskStorage } from 'multer';
import { InputTipoAlojamientoDto } from './dto/input-tipo-alojamiento.dto';
import { TipoAlojamientoDto } from './dto/tipo-alojamiento.dto';
import { TiposAlojamientoService } from './tipos-alojamiento.service';

@ApiTags('Tipos de alojamiento')
@Controller('tipos-alojamiento')
export class TiposAlojamientoController {
    constructor(private tipoAlojamientoService: TiposAlojamientoService) {}

    @Post()
    async create(
        @Body() tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<TipoAlojamientoDto> {
        return await this.tipoAlojamientoService.create(tipoAlojamiento);
    }

    @Get()
    async findAll(): Promise<TipoAlojamientoDto[]> {
        return await this.tipoAlojamientoService.findAll();
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id: number): Promise<TipoAlojamientoDto> {
        return await this.tipoAlojamientoService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() categoriaMenu: InputTipoAlojamientoDto,
    ) {
        await this.tipoAlojamientoService.update(id, categoriaMenu);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.tipoAlojamientoService.remove(id);
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
                destination: './uploads/tipos-alojamiento',
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async upload(
        @UploadedFile() image: Express.Multer.File,
        @Param('id') id: number,
    ) {
        await this.tipoAlojamientoService.uploadImage(id, image.path);
    }
}
