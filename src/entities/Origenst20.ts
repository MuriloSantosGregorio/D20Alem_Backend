import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Origempericiat20 } from './Origempericiat20';
import { Origempodert20 } from './Origempodert20';
import { Personagenst20 } from './Personagenst20';

@Entity('origenst20')
export class Origenst20 {
  @PrimaryGeneratedColumn('uuid')
  origemid: string = uuidv4();

  @Column({ type: 'varchar', length: 25 })
  origemnome!: string;

  @Column({ type: 'text' })
  origemdescricao!: string;

  @OneToMany(() => Origempericiat20, (origempericiat20) => origempericiat20.origem)
  origempericiats!: Origempericiat20[];

  @OneToMany(() => Origempodert20, (origempodert20) => origempodert20.origem)
  origempoderts!: Origempodert20[];

  @OneToMany(() => Personagenst20, (personagenst20) => personagenst20.origem)
  personagensts!: Personagenst20[];
}