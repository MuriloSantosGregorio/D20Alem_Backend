import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Personagemclasset20 } from './Personagemclasset20';
import { Personagenst20 } from './Personagenst20';
import { Poderest20 } from './Poderest20';

@Entity('personagempodert20')
export class Personagempodert20 {
  @PrimaryGeneratedColumn('uuid')
  personagempoderid: string = uuidv4();

  @ManyToOne(() => Personagemclasset20, (personagemclasset20) => personagemclasset20.personagempoderts)
  @JoinColumn([{ name: 'personagemclasseid', referencedColumnName: 'personagemclasseid' }])
  personagemclasse!: Personagemclasset20;

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagempoderts)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;

  @ManyToOne(() => Poderest20, (poderest20) => poderest20.personagempoderts)
  @JoinColumn([{ name: 'poderid', referencedColumnName: 'poderid' }])
  poder!: Poderest20;
}