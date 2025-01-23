import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface CurrencyStats {
  stake: number;
  payout: number;
  refund: number;
  winloss: number;
  win: number;
  loss: number;
}

@Schema({ collection: 'daily_statements_bk' })
export class DailyStatement extends Document {
  @Prop({ type: Object })
  USD: CurrencyStats;

  @Prop()
  currency: string;

  @Prop()
  gameId: number;

  @Prop()
  isTest: number;

  @Prop()
  loss: number;

  @Prop()
  operatorId: string;

  @Prop()
  payout: number;

  @Prop()
  playerId: string;

  @Prop()
  refund: number;

  @Prop({ type: Date })
  roundTime: Date;

  @Prop()
  siteId: string;

  @Prop()
  siteName: string;

  @Prop()
  stake: number;

  @Prop()
  tickets: number;

  @Prop({ type: Date })
  time: Date;

  @Prop()
  win: number;

  @Prop()
  winloss: number;
}

export const DailyStatementSchema = SchemaFactory.createForClass(DailyStatement);
