import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Personagenst20 } from './Personagenst20';
import { Racast20 } from './Racast20';

@Entity('tamanhost20')
export class Tamanhost20 {
  @PrimaryGeneratedColumn('uuid')
  tamanhoid: string = uuidv4();

  @Column({ type: 'varchar', length: 10 })
  tamanhocategoria!: string;

  @Column({ type: 'varchar', length: 4 })
  tamanhoalcanceespaco!: string;

  @Column({ type: 'integer' })
  tamanhofurtividade!: number;

  @Column({ type: 'integer' })
  tamanhomanobra!: number;

  @Column({ type: 'integer' })
  tamanhonumero!: number;

  @OneToMany(() => Personagenst20, (personagenst20) => personagenst20.tamanho)
  personagensts!: Personagenst20[];

  @OneToMany(() => Racast20, (racast20) => racast20.tamanho)
  racasts!: Racast20[];
}