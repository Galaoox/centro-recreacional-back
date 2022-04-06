import { ApiProperty } from '@nestjs/swagger';

export class InputCategoriaMenuDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
}
