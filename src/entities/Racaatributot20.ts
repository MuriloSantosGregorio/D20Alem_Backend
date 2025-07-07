import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Atributot20 } from './Atributost20';
import { Racast20 } from './Racast20';

@Entity('racaatributot20')
export class Racaatributot20 {
  @PrimaryGeneratedColumn('uuid')
  racaatributoid: string = uuidv4();

  @Column({ type: 'integer' })
  racaatributovalor!: number;

  @Column({ type: 'varchar', length: 10 })
  racaatributotipo!: string;

  @ManyToOne(() => Atributot20, (atributost20) => atributost20.racaatributots)
  @JoinColumn([{ name: 'atributoid', referencedColumnName: 'atributoid' }])
  atributo!: Atributot20;

  @ManyToOne(() => Racast20, (racast20) => racast20.racaatributots)
  @JoinColumn([{ name: 'racaid', referencedColumnName: 'racaid' }])
  raca!: Racast20;
}