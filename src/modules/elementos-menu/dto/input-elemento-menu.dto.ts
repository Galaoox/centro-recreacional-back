import { ApiProperty } from '@nestjs/swagger';

export class InputElementoMenuDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    valor: number;
    @ApiProperty()
    categoriaMenuId: number;
}
