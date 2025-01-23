import { Controller, Get, Query } from '@nestjs/common';
import { DailyStatementsService } from './daily-statements.service';
import { GetDailyStatementDto } from './dto/get-daily-statement.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('daily-statements')
@Controller('daily-statements')
export class DailyStatementsController {
  constructor(private readonly dailyStatementsService: DailyStatementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get daily statements by date' })
  @ApiResponse({
    status: 200,
    description: 'Returns daily statements for the specified date',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid date format',
  })
  async findByDate(@Query() query: GetDailyStatementDto) {
    return this.dailyStatementsService.findByDate(query.date);
  }
}
