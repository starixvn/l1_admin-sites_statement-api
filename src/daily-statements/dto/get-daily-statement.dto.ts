import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDailyStatementDto {
  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-03-20',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
