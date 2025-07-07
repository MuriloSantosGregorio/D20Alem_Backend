import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Personagematributot20 } from './Personagematributot20';
import { Personagemclasset20 } from './Personagemclasset20';
import { Personagemhabilidadet20 } from './Personagemhabilidadet20';
import { Personagempericiat20 } from './Personagempericiat20';
import { Personagempodert20 } from './Personagempodert20';
import { Personagemproficienciat20 } from './Personagemproficienciat20';
import { Deusest20 } from './Deusest20';
import { Origenst20 } from './Origenst20';
import { Racast20 } from './Racast20';
import { Tamanhost20 } from './Tamanhost20';
import { Usuarios } from './Usuarios';

@Entity('personagenst20')
export class Personagenst20 {
  @PrimaryGeneratedColumn('uuid')
  personagemid: string = uuidv4();

  @Column({ type: 'varchar', length: 100 })
  personagemnome!: string;

  @Column({ type: 'integer', nullable: true })
  personagemdefesa!: number;

  @Column({ type: 'integer', nullable: true })
  personagemcdmagia!: number;

  @Column({ type: 'integer', nullable: true })
  personagemdeslocamento!: number;

  @Column({ type: 'integer', nullable: true })
  personagemcarga!: number;

  @Column({ type: 'integer', nullable: true })
  personagemcargaespaco!: number;

  @Column({ type: 'integer', nullable: true })
  personagempv!: number;

  @Column({ type: 'integer', nullable: true })
  personagempvtotal!: number;

  @Column({ type: 'integer', nullable: true })
  personagempm!: number;

  @Column({ type: 'integer', nullable: true })
  personagempmtotal!: number;

  @Column({ type: 'integer', nullable: true })
  personagemexperiencia!: number;

  @Column({ type: 'integer', nullable: true })
  personagemtibar!: number;

  // Relationships
  @OneToMany(() => Personagematributot20, (personagematributot20) => personagematributot20.personagem)
  personagematributots!: Personagematributot20[];

  @OneToMany(() => Personagemclasset20, (personagemclasset20) => personagemclasset20.personagem)
  personagemclassets!: Personagemclasset20[];

  @OneToMany(() => Personagemhabilidadet20, (personagemhabilidadet20) => personagemhabilidadet20.personagem)
  personagemhabilidadets!: Personagemhabilidadet20[];

  @OneToMany(() => Personagempericiat20, (personagempericiat20) => personagempericiat20.personagem)
  personagempericiats!: Personagempericiat20[];

  @OneToMany(() => Personagempodert20, (personagempodert20) => personagempodert20.personagem)
  personagempoderts!: Personagempodert20[];

  @OneToMany(() => Personagemproficienciat20, (personagemproficienciat20) => personagemproficienciat20.personagem)
  personagemproficienciats!: Personagemproficienciat20[];

  @ManyToOne(() => Deusest20, (deusest20) => deusest20.personagensts, { nullable: true })
  @JoinColumn([{ name: 'deusid', referencedColumnName: 'deusid'}])
  deus?: Deusest20;

  @ManyToOne(() => Origenst20, (origenst20) => origenst20.personagensts)
  @JoinColumn([{ name: 'origemid', referencedColumnName: 'origemid' }])
  origem!: Origenst20;

  @ManyToOne(() => Racast20, (racast20) => racast20.personagensts)
  @JoinColumn([{ name: 'racaid', referencedColumnName: 'racaid' }])
  raca!: Racast20;

  @ManyToOne(() => Tamanhost20, (tamanhost20) => tamanhost20.personagensts)
  @JoinColumn([{ name: 'tamanhoid', referencedColumnName: 'tamanhoid' }])
  tamanho!: Tamanhost20;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.personagensts)
  @JoinColumn([{ name: 'usuarioid', referencedColumnName: 'usuarioid' }])
  usuario!: Usuarios;
}