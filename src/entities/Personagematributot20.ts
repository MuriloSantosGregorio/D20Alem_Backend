import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Atributot20 } from './Atributost20';
import { Personagenst20 } from './Personagenst20';

@Entity('personagematributot20')
export class Personagematributot20 {
  @PrimaryGeneratedColumn('uuid')
  personagematributoid: string = uuidv4();

  @Column({ type: 'integer' })
  personagematributovalor!: number;

  @Column({ type: 'integer', nullable: true })
  modificadortemporario!: number | null;

  @ManyToOne(() => Atributot20, (atributost20) => atributost20.personagematributots)
  @JoinColumn([{ name: 'atributoid', referencedColumnName: 'atributoid' }])
  atributo!: Atributot20;

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagematributots)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;
}