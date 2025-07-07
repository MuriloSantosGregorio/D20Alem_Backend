import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Deusest20 } from './Deusest20';
import { Poderest20 } from './Poderest20';

@Entity('deuspodert20')
export class Deuspodert20 {
  @PrimaryGeneratedColumn('uuid')
  deuspoderid: string = uuidv4();

  @ManyToOne(() => Deusest20, (deusest20) => deusest20.deuspoderts)
  @JoinColumn([{ name: 'deusid', referencedColumnName: 'deusid' }])
  deus!: Deusest20;

  @ManyToOne(() => Poderest20, (poderest20) => poderest20.deuspoderts)
  @JoinColumn([{ name: 'poderid', referencedColumnName: 'poderid' }])
  poder!: Poderest20;
}