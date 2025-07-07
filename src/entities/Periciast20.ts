import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Atributot20 } from './Atributost20';
import { Classepericiat20 } from './Classepericiat20';
import { Personagempericiat20 } from './Personagempericiat20';
import { Origempericiat20 } from './Origempericiat20';

@Entity('periciast20')
export class Periciast20 {
  @PrimaryGeneratedColumn('uuid')
  periciaid: string = uuidv4();

  @Column({ type: 'varchar', length: 25 })
  pericianome!: string;

  @Column({ type: 'boolean', default: false })
  periciaarmadura!: boolean;

  @Column({ type: 'boolean', default: false })
  periciatreinada!: boolean;

  @Column({ type: 'text' })
  periciadescricao!: string;

  @ManyToOne(() => Atributot20, (atributost20) => atributost20.periciasts)
  @JoinColumn({ name: 'atributoid' }) 
  atributoid!: Atributot20;

  @ManyToOne(() => Classepericiat20, (classepericiat20) => classepericiat20.pericia)
  @JoinTable({ name: 'classepericiat20' })
  classepericiats!: Classepericiat20[];

  @ManyToOne(() => Origempericiat20, (origempericiats) => origempericiats.pericia)
  @JoinTable({ name: 'origempericiat20' })
  origempericiats!: Origempericiat20[];

  @ManyToOne(() => Personagempericiat20, (personagempericiat20) => personagempericiat20.pericia)
  @JoinTable({ name: 'personagempericiat20' })
  personagempericiat20!: Personagempericiat20[];
}