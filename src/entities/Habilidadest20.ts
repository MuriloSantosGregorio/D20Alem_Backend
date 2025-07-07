import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Classehabilidadet20 } from './Classehabilidadet20';
import { Personagemhabilidadet20 } from './Personagemhabilidadet20';
import { Racahabilidadet20 } from './Racahabilidadet20';

@Entity('habilidadest20')
export class Habilidadest20 {
  @PrimaryGeneratedColumn('uuid')
  habilidadeid: string = uuidv4();

  @Column({ type: 'varchar', length: 50 })
  habilidadenome!: string;

  @Column({ type: 'text' })
  habilidadedescricao!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  habilidadealcance!: string;

  @Column({ type: 'varchar', length: 20, nullable: true  })
  habilidadeduracao!: string;

  @Column({ type: 'integer', nullable: true  })
  habilidadepmcusto!: number;

  @Column({ type: 'varchar', length: 15 })
  habilidadeexecucao!: string;

  @Column({ type: 'varchar', length: 20, nullable: true  })
  habilidaderesistencia!: string;

  @Column({ type: 'varchar', length: 15, nullable: true  })
  habilidadeefeito!: string;

  @OneToMany(() => Classehabilidadet20, (classehabilidadet20) => classehabilidadet20.habilidade)
  classehabilidadets!: Classehabilidadet20[];

  @OneToMany(() => Personagemhabilidadet20, (personagemhabilidadet20) => personagemhabilidadet20.habilidade)
  personagemhabilidadets!: Personagemhabilidadet20[];

  @OneToMany(() => Racahabilidadet20, (racahabilidadet20) => racahabilidadet20.habilidade)
  racahabilidadets!: Racahabilidadet20[];
}