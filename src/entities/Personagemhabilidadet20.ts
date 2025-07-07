import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Habilidadest20 } from './Habilidadest20';
import { Personagenst20 } from './Personagenst20';

@Entity('personagemhabilidadet20')
export class Personagemhabilidadet20 {
  @PrimaryGeneratedColumn('uuid')
  personagemhabilidadeid: string = uuidv4();

  @Column({ type: 'varchar', length: 25 })
  personagemhabilidadefonte!: string;

  @ManyToOne(() => Habilidadest20, (habilidadest20) => habilidadest20.personagemhabilidadets)
  @JoinColumn([{ name: 'habilidadeid', referencedColumnName: 'habilidadeid' }])
  habilidade!: Habilidadest20;

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagemhabilidadets)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;
}