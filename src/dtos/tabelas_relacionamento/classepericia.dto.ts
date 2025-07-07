import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassePericiaDto {
  @ApiProperty({ example: 'Primária', description: 'Tipo da relação entre classe e perícia' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  classepericiatipo!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  @IsNotEmpty()
  @IsUUID()
  classeid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID da perícia associada' })
  @IsNotEmpty()
  @IsUUID()
  periciaid!: string;
}

export class UpdateClassePericiaDto {
  @ApiProperty({ example: 'Secundária', description: 'Tipo da relação entre classe e perícia', required: false })
  @IsString()
  @MaxLength(10)
  classepericiatipo?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada', required: false })
  @IsUUID()
  classeid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID da perícia associada', required: false })
  @IsUUID()
  periciaid?: string;
}

export class ClassePericiaResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID da relação classe-perícia' })
  classepericiaid!: string;

  @ApiProperty({ example: 'Primária', description: 'Tipo da relação entre classe e perícia' })
  classepericiatipo!: string;

  @ApiProperty({ 
    example: { classeid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', classenome: 'Guerreiro' },
    description: 'Classe associada'
  })
  classe!: {
    classeid: string;
    classenome: string;
  };

  @ApiProperty({ 
    example: { periciaid: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', pericianome: 'Acrobacia' },
    description: 'Perícia associada'
  })
  pericia!: {
    periciaid: string;
    pericianome: string;
  };
}