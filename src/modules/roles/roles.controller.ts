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
    Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from '@entities/Roles.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private _rolesService: RolesService) {}

    @Post()
    async create(@Body() createRolDto: CreateRolDto) {
        try {
            await this._rolesService.create(createRolDto);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<Roles[]> {
        return await this._rolesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Roles> {
        try {
            return await this._rolesService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateRolDto: UpdateRolDto) {
        try {
            await this._rolesService.update(id, updateRolDto);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this._rolesService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
