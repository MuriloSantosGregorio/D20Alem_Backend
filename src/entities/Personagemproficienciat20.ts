import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Personagenst20 } from './Personagenst20';
import { Proficienciast20 } from './Proficienciast20';

@Entity('personagemproficienciat20')
export class Personagemproficienciat20 {
  @PrimaryGeneratedColumn('uuid')
  personagemproficienciaid: string = uuidv4();

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagemproficienciats)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;

  @ManyToOne(() => Proficienciast20, (proficienciast20) => proficienciast20.personagemproficienciats)
  @JoinColumn([{ name: 'proficienciaid', referencedColumnName: 'proficienciaid' }])
  proficiencia!: Proficienciast20;
}