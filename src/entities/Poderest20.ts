import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classepodert20 } from './Classepodert20';
import { Deuspodert20 } from './Deuspodert20';
import { Origempodert20 } from './Origempodert20';
import { Personagempodert20 } from './Personagempodert20';

@Entity('poderest20')
export class Poderest20 {
  @PrimaryGeneratedColumn('uuid')
  poderid: string = uuidv4();

  @Column({ type: 'varchar', length: 50 })
  podernome!: string;

  @Column({ type: 'text' })
  poderdescricao!: string;

  @Column({ type: 'varchar', length: 10 })
  poderalcance!: string;

  @Column({ type: 'varchar', length: 10 })
  poderduracao!: string;

  @Column({ type: 'integer' })
  poderpmcusto!: number;

  @Column({ type: 'varchar', length: 10 })
  poderexecucao!: string;

  @OneToMany(() => Classepodert20, (classepodert20) => classepodert20.poder)
  classepoderts!: Classepodert20[];

  @OneToMany(() => Deuspodert20, (deuspodert20) => deuspodert20.poder)
  deuspoderts!: Deuspodert20[];

  @OneToMany(() => Origempodert20, (origempodert20) => origempodert20.poder)
  origempoderts!: Origempodert20[];

  @OneToMany(() => Personagempodert20, (personagempodert20) => personagempodert20.poder)
  personagempoderts!: Personagempodert20[];
}