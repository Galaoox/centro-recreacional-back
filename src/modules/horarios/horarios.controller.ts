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
import { HorariosService } from './horarios.service';
import { Horario } from '@entities/Horario.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@ApiTags('Horarios')
@Controller('horarios')
export class HorariosController {
    constructor(private rolesService: HorariosService) {}

    @Post()
    async create(@Body() createRolDto: CreateHorarioDto) {
        try {
            await this.rolesService.create(createRolDto);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<Horario[]> {
        return await this.rolesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Horario> {
        try {
            return await this.rolesService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() horario: UpdateHorarioDto) {
        try {
            await this.rolesService.update(id, horario);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.rolesService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
