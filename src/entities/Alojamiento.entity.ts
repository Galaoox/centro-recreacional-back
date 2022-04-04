import { ColumnNumericTransformer } from '@utils/ColumnNumericTransformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { TipoAlojamiento } from '@entities/TipoAlojamiento.entity';
import { AdicionAlojamiento } from '@entities/AdicionAlojamiento.entity';

@Entity()
export class Alojamiento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    numeroPersonas: number;

    @Column('int')
    cantidadDias: number;

    @Column('datetime')
    fechaIngreso: Date;

    @Column('datetime')
    fechaSalida: Date;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valor: number;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valorTotal: number;

    @Column({
        length: 200,
        nullable: false,
    })
    imagen: string;

    @ManyToOne(
        () => TipoAlojamiento,
        (tipoAlojamiento) => tipoAlojamiento.alojamientos,
    )
    tipoAlojamiento: TipoAlojamiento;

    @OneToMany(
        () => AdicionAlojamiento,
        (adicionAlojamiento) => adicionAlojamiento.alojamiento,
    )
    adicionesAlojamientos: AdicionAlojamiento[];

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
