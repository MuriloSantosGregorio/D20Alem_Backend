import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Deusclasset20 } from './Deusclasset20';
import { Deuspodert20 } from './Deuspodert20';
import { Deusracat20 } from './Deusracat20';
import { Personagenst20 } from './Personagenst20';

@Entity('deusest20')
export class Deusest20 {
  @PrimaryGeneratedColumn('uuid')
  deusid: string = uuidv4();

  @Column({ type: 'varchar', length: 20 })
  deusnome!: string;

  @Column({ type: 'varchar', length: 125 })
  deussimbolo!: string;

  @Column({ type: 'varchar', length: 8 })
  deusenergia!: string;

  @Column({ type: 'varchar', length: 25 })
  deusarma!: string;

  @Column({ type: 'text' })
  deusdescricao!: string;

  @Column({ type: 'text' })
  deusobjetivos!: string;

  @Column({ type: 'text' })
  deusobrigacoes!: string;

  @OneToMany(() => Deusclasset20, (deusclasset20) => deusclasset20.deus)
  deusclassets!: Deusclasset20[];

  @OneToMany(() => Deuspodert20, (deuspodert20) => deuspodert20.deus)
  deuspoderts!: Deuspodert20[];

  @OneToMany(() => Deusracat20, (deusracat20) => deusracat20.deus)
  deusracats!: Deusracat20[];

  @OneToMany(() => Personagenst20, (personagenst20) => personagenst20.deus)
  personagensts?: Personagenst20[];
}