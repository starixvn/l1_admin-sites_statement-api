import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'ticket_silos' })
export class PlayerTicket {
  @Prop()
  playerId: string;

  @Prop()
  gameId: number;

  @Prop()
  stake: number;

  @Prop()
  payout: number;

  @Prop()
  win: number;

  @Prop()
  currency: string;

  @Prop()
  time: Date;

  @Prop()
  roundId: number;
}

export const PlayerTicketSchema = SchemaFactory.createForClass(PlayerTicket);
