import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyStatement } from './schemas/daily-statement.schema';

@Injectable()
export class DailyStatementsService {
  constructor(
    @InjectModel(DailyStatement.name)
    private dailyStatementModel: Model<DailyStatement>,
  ) {}

  async findByDate(date: string): Promise<DailyStatement[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    return this.dailyStatementModel
      .find({
        time: {
          $gte: startDate,
          $lt: endDate,
        },
        win: { $gt: 0 },
      })
      .select({
        playerId: 1,
        USD: 1,
        stake: 1,
        loss: 1,
        gameId: 1,
        rounds: 1,
        payout: 1,
        currency: 1,
        time: 1,
        _id: 0,
      })
      .lean()
      .exec();
  }
}
