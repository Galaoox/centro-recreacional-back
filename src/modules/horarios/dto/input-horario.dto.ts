import { ApiProperty } from '@nestjs/swagger';

export class InputHorarioDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    horaInicial: string;
    @ApiProperty()
    horaFinal: string;
}
