import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classehabilidadet20 } from './Classehabilidadet20';
import { Classepericiat20 } from './Classepericiat20';
import { Classepodert20 } from './Classepodert20';
import { Classeproficienciat20 } from './Classeproficienciat20';
import { Deusclasset20 } from './Deusclasset20';
import { Personagemclasset20 } from './Personagemclasset20';

@Entity('classest20')
export class Classest20 {
  @PrimaryGeneratedColumn('uuid')
  classeid: string = uuidv4();

  @Column({ type: 'varchar', length: 10 })
  classenome!: string;

  @Column({ type: 'text' })
  classedescricao!: string;

  @Column({ type: 'integer' })
  classepvinicial!: number;

  @Column({ type: 'integer' })
  classepvnivel!: number;

  @Column({ type: 'integer' })
  classepmnivel!: number;

  @Column({ type: 'integer' })
  classenumpericias!: number;

  @OneToMany(() => Classehabilidadet20, (classehabilidadet20) => classehabilidadet20.classe)
  classehabilidadets!: Classehabilidadet20[];

  @OneToMany(() => Classepericiat20, (classepericiat20) => classepericiat20.classe)
  classepericiats!: Classepericiat20[];

  @OneToMany(() => Classepodert20, (classepodert20) => classepodert20.classe)
  classepoderts!: Classepodert20[];

  @OneToMany(() => Classeproficienciat20, (classeproficienciat20) => classeproficienciat20.classe)
  classeproficienciats!: Classeproficienciat20[];

  @OneToMany(() => Deusclasset20, (deusclasset20) => deusclasset20.classe)
  deusclassets!: Deusclasset20[];

  @OneToMany(() => Personagemclasset20, (personagemclasset20) => personagemclasset20.classe)
  personagemclassets!: Personagemclasset20[];
}