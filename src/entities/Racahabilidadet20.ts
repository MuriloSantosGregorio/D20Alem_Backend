import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Habilidadest20 } from './Habilidadest20';
import { Racast20 } from './Racast20';

@Entity('racahabilidadet20')
export class Racahabilidadet20 {
  @PrimaryGeneratedColumn('uuid')
  racahabilidadeid: string = uuidv4();

  @Column({ type: 'boolean', default: false })
  racahabilidademodular!: boolean;

  @ManyToOne(() => Habilidadest20, (habilidadest20) => habilidadest20.racahabilidadets)
  @JoinColumn([{ name: 'habilidadeid', referencedColumnName: 'habilidadeid' }])
  habilidade!: Habilidadest20;

  @ManyToOne(() => Racast20, (racast20) => racast20.racahabilidadets)
  @JoinColumn([{ name: 'racaid', referencedColumnName: 'racaid' }])
  raca!: Racast20;
}