import { IsDateString, IsNotEmpty, IsOptional, IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetPlayerTicketsDto {
  @ApiProperty({
    description: 'Player ID',
    example: 'player123',
  })
  @IsNotEmpty()
  @IsString()
  playerId: string;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-03-20',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    default: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 100;
}
