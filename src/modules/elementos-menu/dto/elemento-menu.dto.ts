import { ApiProperty } from '@nestjs/swagger';

export class ElementoMenuDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    valor: number;
}
