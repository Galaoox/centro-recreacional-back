import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { Rol } from '@entities/Rol.entity';
import { TipoDocumento } from '@entities/TipoDocumento.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    nombre1: string;

    @Column({
        length: 50,
        nullable: true,
    })
    nombre2: string;

    @Column({
        length: 50,
        nullable: false,
    })
    apellido1: string;

    @Column({
        length: 50,
        nullable: true,
    })
    apellido2: string;

    @Column({
        length: 15,
        nullable: false,
    })
    documento: string;

    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    correoElectronico: string;

    @Column({
        length: 150,
        nullable: false,
    })
    contrasena: string;

    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    rol: Rol;

    @ManyToOne(() => TipoDocumento, (tipoDocumento) => tipoDocumento.usuarios)
    tipoDocumento: Rol;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
