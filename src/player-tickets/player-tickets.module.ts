import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerTicketsController } from './player-tickets.controller';
import { PlayerTicketsService } from './player-tickets.service';
import { PlayerTicket, PlayerTicketSchema } from './schemas/player-ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: PlayerTicket.name,
          schema: PlayerTicketSchema,
        },
      ],
      'minigame',
    ), // Use minigame_arc connection
  ],
  controllers: [PlayerTicketsController],
  providers: [PlayerTicketsService],
})
export class PlayerTicketsModule {}
