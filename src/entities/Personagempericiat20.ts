import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Periciast20 } from './Periciast20';
import { Personagenst20 } from './Personagenst20';

@Entity('personagempericiat20')
export class Personagempericiat20 {
  @PrimaryGeneratedColumn('uuid')
  personagempericiaid: string = uuidv4();

  @Column({ type: 'integer', nullable: true })
  bonusadicional!: number | null;

  @ManyToOne(() => Periciast20, (periciast20) => periciast20.personagempericiat20)
  @JoinColumn([{ name: 'periciaid', referencedColumnName: 'periciaid' }])
  pericia!: Periciast20;

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagempericiats)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;
}