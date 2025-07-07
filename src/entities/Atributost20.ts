import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Periciast20 } from './Periciast20';
import { Personagematributot20 } from './Personagematributot20';
import { Racaatributot20 } from './Racaatributot20';

@Entity('atributost20')
export class Atributot20 {
  @PrimaryGeneratedColumn('uuid')
  atributoid: string = uuidv4();

  @Column({ type: 'varchar', length: 15 })
  atributonome!: string;

  @Column({ type: 'varchar', length: 6 })
  atributotipo!: string;

  @Column({ type: 'text' })
  atributodescricao!: string;

  @OneToMany(() => Periciast20, (periciast20) => periciast20.atributoid)
  periciasts!: Periciast20[];

  @OneToMany(() => Personagematributot20, (personagematributot20) => personagematributot20.atributo)
  personagematributots!: Personagematributot20[];

  @OneToMany(() => Racaatributot20, (racaatributot20) => racaatributot20.atributo)
  racaatributots!: Racaatributot20[];
}