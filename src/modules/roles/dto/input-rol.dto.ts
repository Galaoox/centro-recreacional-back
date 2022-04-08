import { ApiProperty } from '@nestjs/swagger';

export class InputRolDto {
    @ApiProperty()
    nombre: string;
}
