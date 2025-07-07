import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Origenst20 } from './Origenst20';
import { Poderest20 } from './Poderest20';

@Entity('origempodert20')
export class Origempodert20 {
  @PrimaryGeneratedColumn('uuid')
  origempoderid: string = uuidv4();

  @ManyToOne(() => Origenst20, (origenst20) => origenst20.origempoderts)
  @JoinColumn([{ name: 'origemid', referencedColumnName: 'origemid' }])
  origem!: Origenst20;

  @ManyToOne(() => Poderest20, (poderest20) => poderest20.origempoderts)
  @JoinColumn([{ name: 'poderid', referencedColumnName: 'poderid' }])
  poder!: Poderest20;
}