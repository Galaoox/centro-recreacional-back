import { ApiProperty } from '@nestjs/swagger';

export class InputTipoDocumentoDto {
    @ApiProperty()
    nombre: string;
}
