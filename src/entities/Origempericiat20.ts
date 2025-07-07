import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Origenst20 } from './Origenst20';
import { Periciast20 } from './Periciast20';

@Entity('origempericiat20')
export class Origempericiat20 {
  @PrimaryGeneratedColumn('uuid')
  origempericiaid: string = uuidv4();

  @ManyToOne(() => Origenst20, (origenst20) => origenst20.origempericiats)
  @JoinColumn([{ name: 'origemid', referencedColumnName: 'origemid' }])
  origem: Origenst20 = new Origenst20();

  @ManyToOne(() => Periciast20, (periciast20) => periciast20.origempericiats)
  @JoinColumn([{ name: 'periciaid', referencedColumnName: 'periciaid' }])
  pericia!: Periciast20;
}