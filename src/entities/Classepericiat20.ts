import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Periciast20 } from './Periciast20';

@Entity('classepericiat20')
export class Classepericiat20 {
  @PrimaryGeneratedColumn('uuid')
  classepericiaid: string = uuidv4();

  @Column({ type: 'varchar', length: 10 })
  classepericiatipo!: string;

  @ManyToOne(() => Classest20, (classest20) => classest20.classepericiats)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Periciast20, (periciast20) => periciast20.classepericiats)
  @JoinColumn([{ name: 'periciaid', referencedColumnName: 'periciaid' }])
  pericia!: Periciast20;
}