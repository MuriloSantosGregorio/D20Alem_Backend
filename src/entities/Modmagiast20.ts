import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Magiast20 } from './Magiast20';

@Entity('modmagiast20')
export class Modmagiast20 {
  @PrimaryGeneratedColumn('uuid')
  modmagiaid: string = uuidv4();

  @Column({ type: 'integer', nullable:  true })
  modmagiacusto!: number;

  @Column({ type: 'text' })
  modmagiadescricao!: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  modmagiaexclusivo!: string;

  @ManyToOne(() => Magiast20, (magiast20) => magiast20.modmagiasts)
  @JoinColumn([{ name: 'magiaid', referencedColumnName: 'magiaid' }])
  magia!: Magiast20;
}