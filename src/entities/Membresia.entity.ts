import { ColumnNumericTransformer } from '@utils/ColumnNumericTransformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';
import { TipoMembresia } from '@entities/TipoMembresia.entity';
import { Factura } from './Factura.entity';
import { Usuario } from '@entities/Usuario.entity';

@Entity()
export class Membresia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

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

    @ManyToOne(() => TipoMembresia, (tipoMembresia) => tipoMembresia.membresias)
    tipoMembresia: TipoMembresia;

    @ManyToOne(() => Factura, (factura) => factura.membresias)
    factura: Factura;

    @ManyToOne(() => Usuario, (usuario) => usuario.membresias)
    usuario: Usuario;

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
