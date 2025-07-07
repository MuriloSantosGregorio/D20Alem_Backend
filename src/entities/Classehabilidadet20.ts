import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Habilidadest20 } from './Habilidadest20';

@Entity('classehabilidadet20')
export class Classehabilidadet20 {
  @PrimaryGeneratedColumn('uuid')
  classehabilidadeid: string = uuidv4();

  @Column({ type: 'integer' })
  classehabilidadenivel!: number;

  @ManyToOne(() => Classest20, (classest20) => classest20.classehabilidadets)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Habilidadest20, (habilidadest20) => habilidadest20.classehabilidadets)
  @JoinColumn([{ name: 'habilidadeid', referencedColumnName: 'habilidadeid' }])
  habilidade!: Habilidadest20;
}