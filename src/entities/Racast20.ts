import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Deusracat20 } from './Deusracat20';
import { Personagenst20 } from './Personagenst20';
import { Racaatributot20 } from './Racaatributot20';
import { Racahabilidadet20 } from './Racahabilidadet20';
import { Tamanhost20 } from './Tamanhost20';

@Entity('racast20')
export class Racast20 {
  @PrimaryGeneratedColumn('uuid')
  racaid: string = uuidv4();

  @Column({ type: 'varchar', length: 25 })
  racanome!: string;

  @Column({ type: 'text' })
  racadescricao!: string;

  @OneToMany(() => Deusracat20, (deusracat20) => deusracat20.raca)
  deusracats!: Deusracat20[];

  @OneToMany(() => Personagenst20, (personagenst20) => personagenst20.raca)
  personagensts!: Personagenst20[];

  @OneToMany(() => Racaatributot20, (racaatributot20) => racaatributot20.raca)
  racaatributots!: Racaatributot20[];

  @OneToMany(() => Racahabilidadet20, (racahabilidadet20) => racahabilidadet20.raca)
  racahabilidadets!: Racahabilidadet20[];

  @ManyToOne(() => Tamanhost20, (tamanhost20) => tamanhost20.racasts)
  @JoinColumn([{ name: 'tamanhoid', referencedColumnName: 'tamanhoid' }])
  tamanho!: Tamanhost20;
}