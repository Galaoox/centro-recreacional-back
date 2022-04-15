import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InputTipoDocumentoDto {
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;
}
