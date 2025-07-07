import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Deusest20 } from './Deusest20';
import { Racast20 } from './Racast20';

@Entity('deusracat20')
export class Deusracat20 {
  @PrimaryGeneratedColumn('uuid')
  deusracaid: string = uuidv4();

  @ManyToOne(() => Deusest20, (deusest20) => deusest20.deusracats)
  @JoinColumn([{ name: 'deusid', referencedColumnName: 'deusid' }])
  deus!: Deusest20;

  @ManyToOne(() => Racast20, (racast20) => racast20.deusracats)
  @JoinColumn([{ name: 'racaid', referencedColumnName: 'racaid' }])
  raca!: Racast20;
}