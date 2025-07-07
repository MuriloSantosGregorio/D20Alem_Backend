import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classest20 } from './Classest20';
import { Proficienciast20 } from './Proficienciast20';

@Entity('classeproficienciat20')
export class Classeproficienciat20 {
  @PrimaryGeneratedColumn('uuid')
  classeproficienciaid: string = uuidv4();

  @ManyToOne(() => Classest20, (classest20) => classest20.classeproficienciats)
  @JoinColumn([{ name: 'classeid', referencedColumnName: 'classeid' }])
  classe!: Classest20;

  @ManyToOne(() => Proficienciast20, (proficienciast20) => proficienciast20.classeproficienciats)
  @JoinColumn([{ name: 'proficienciaid', referencedColumnName: 'proficienciaid' }])
  proficiencia!: Proficienciast20;
}