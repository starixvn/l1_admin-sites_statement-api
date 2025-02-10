import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerTicketsService } from './player-tickets.service';
import { GetPlayerTicketsDto } from './dto/get-player-tickets.dto';

@ApiTags('player-tickets')
@Controller('player-tickets')
export class PlayerTicketsController {
  constructor(private readonly playerTicketsService: PlayerTicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get player tickets by playerId and date' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated player tickets',
  })
  async findByPlayerIdAndDate(@Query() query: GetPlayerTicketsDto) {
    return this.playerTicketsService.findByPlayerIdAndDate(query);
  }
}
