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
import { CategoriaMenu } from '@entities/CategoriaMenu.entity';

@Entity()
export class ElementoMenu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    nombre: string;

    @Column({
        length: 200,
        nullable: false,
    })
    descripcion: string;

    @Column({
        length: 200,
        nullable: false,
    })
    imagen: string;

    @Column('numeric', {
        precision: 16,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    })
    public valor: number;

    @ManyToOne(
        () => CategoriaMenu,
        (categoriaMenu) => categoriaMenu.elementosMenu,
    )
    categoriaMenu: CategoriaMenu;

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
