import { ApiProperty } from '@nestjs/swagger';

export class InputAtraccionDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
}
