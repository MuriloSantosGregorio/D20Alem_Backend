import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Poderest20 } from './Poderest20';

@Entity('classepodert20')
export class Classepodert20 {
  @PrimaryGeneratedColumn('uuid')
  classepoderid: string = uuidv4();

  @Column({ type: 'integer'})
  classepodernivel!: number | null;

  @ManyToOne(() => Classest20, (classest20) => classest20.classepoderts)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Poderest20, (poderest20) => poderest20.classepoderts)
  @JoinColumn([{ name: 'poderid', referencedColumnName: 'poderid' }])
  poder!: Poderest20;
}