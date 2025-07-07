import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Modmagiast20 } from './Modmagiast20';

@Entity('magiast20')
export class Magiast20 {
  @PrimaryGeneratedColumn('uuid')
  magiaid: string = uuidv4();

  @Column({ type: 'varchar', length: 100 })
  magianome!: string;
  
  @Column({ type: 'varchar', length: 100 })
  magiaescola!: string;

  @Column({ type: 'integer' })
  magiacirculo!: number;
  
  @Column({ type: 'varchar', length: 9 })
  magiatipo!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaexecucao!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaalcance!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaalvo!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaarea!: string;

  @Column({ type: 'text'})
  magiaefeito!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaduracao!: string;

  @Column({ type: 'varchar', length: 100 })
  magiaresistencia!: string;

  @Column({ type: 'text' })
  magiadescricao!: string;

  @Column({ type: 'varchar', length: 250 })
  magiacomponente!: string;


  @OneToMany(() => Modmagiast20, (modmagiast20) => modmagiast20.magia)
  modmagiasts!: Modmagiast20[];
}