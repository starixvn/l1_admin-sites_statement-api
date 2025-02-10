import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerTicketsService } from './player-tickets.service';
import { GetPlayerTicketsDto } from './dto/get-player-tickets.dto';
import { GetRewardPointsDto } from './dto/get-reward-points.dto';

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

  @Get('reward-points')
  @ApiOperation({ summary: 'Calculate reward points for player' })
  @ApiResponse({
    status: 200,
    description: 'Returns total reward points for the player',
    schema: {
      type: 'object',
      properties: {
        pid: {
          type: 'string',
          example: 'player123',
        },
        rp: {
          type: 'number',
          example: 150,
        },
      },
    },
  })
  async calculateRewardPoints(@Query() query: GetRewardPointsDto) {
    return this.playerTicketsService.calculateRewardPoints(query);
  }
}
