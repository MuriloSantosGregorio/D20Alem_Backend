import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Personagenst20 } from './Personagenst20';
import { Personagempodert20 } from './Personagempodert20';

@Entity('personagemclasset20')
export class Personagemclasset20 {
  @PrimaryGeneratedColumn('uuid')
  personagemclasseid: string = uuidv4();

  @Column({ type: 'integer' })
  personagemclasse!: number;

  @ManyToOne(() => Classest20, (classest20) => classest20.personagemclassets)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Personagenst20, (personagenst20) => personagenst20.personagemclassets)
  @JoinColumn([{ name: 'personagemid', referencedColumnName: 'personagemid' }])
  personagem!: Personagenst20;

  @OneToMany(() => Personagempodert20, (personagempodert20) => personagempodert20.personagemclasse)
  personagempoderts!: Personagempodert20[];
}