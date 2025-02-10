import { IsDateString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRewardPointsDto {
  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-03-20',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description: 'Minimum stake required',
    default: 0,
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minStake?: number = 0;

  @ApiPropertyOptional({
    description: 'Maximum points per ticket',
    default: 100,
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cappedPoint?: number = 100;
}
