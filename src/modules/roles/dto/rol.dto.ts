import { ApiProperty } from '@nestjs/swagger';

export class RolDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }
}
