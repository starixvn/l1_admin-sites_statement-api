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
  @ApiOperation({ summary: 'Calculate reward points for all players' })
  @ApiResponse({
    status: 200,
    description: 'Returns reward points for all players',
    schema: {
      type: 'object',
      properties: {
        d: {
          type: 'array',
          items: {
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
        },
        t: {
          type: 'number',
          example: 10,
        },
      },
    },
  })
  async calculateRewardPoints(@Query() query: GetRewardPointsDto) {
    return this.playerTicketsService.calculateRewardPoints(query);
  }
}
