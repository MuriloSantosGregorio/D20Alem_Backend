import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Deusest20 } from './Deusest20';

@Entity('deusclasset20')
export class Deusclasset20 {
  @PrimaryGeneratedColumn('uuid')
  deusclasseid: string = uuidv4();

  @ManyToOne(() => Classest20, (classest20) => classest20.deusclassets)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Deusest20, (deusest20) => deusest20.deusclassets)
  @JoinColumn([{ name: 'deusid', referencedColumnName: 'deusid' }])
  deus!: Deusest20;
}