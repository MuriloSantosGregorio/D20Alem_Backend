import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classeproficienciat20 } from './Classeproficienciat20';
import { Personagemproficienciat20 } from './Personagemproficienciat20';

@Entity('proficienciast20')
export class Proficienciast20 {
  @PrimaryGeneratedColumn('uuid')
  proficienciaid: string = uuidv4();

  @Column({ type: 'varchar', length: 30 })
  proficiencianome!: string;

  @OneToMany(() => Classeproficienciat20, (classeproficienciat20) => classeproficienciat20.proficiencia)
  classeproficienciats!: Classeproficienciat20[];

  @OneToMany(() => Personagemproficienciat20, (personagemproficienciat20) => personagemproficienciat20.proficiencia)
  personagemproficienciats!: Personagemproficienciat20[];
}