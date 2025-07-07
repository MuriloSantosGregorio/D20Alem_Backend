import { Entity, Column, PrimaryColumn, OneToMany, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Personagenst20 } from './Personagenst20';

@Entity('usuarios')
@Index('usuarios_usuarioemail_key', ['usuarioemail'], { unique: true })
export class Usuarios {
  @PrimaryColumn('uuid')
  usuarioid: string = uuidv4();

  @Column({ type: 'varchar', length: 100 })
  usuarionome!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  usuarioemail!: string;

  @Column({ type: 'varchar', length: 100 })
  usuariosenha!: string;

  @Column({ type: 'boolean', default: true })
  usuariostatus!: boolean;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  created_at!: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  updated_at!: string;

    @OneToMany(() => Personagenst20, (personagenst20) => personagenst20.usuario)
  personagensts!: Personagenst20[];
}