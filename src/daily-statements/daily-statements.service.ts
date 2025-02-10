import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyStatement } from './schemas/daily-statement.schema';
import { GetDailyStatementDto } from './dto/get-daily-statement.dto';

@Injectable()
export class DailyStatementsService {
  constructor(
    @InjectModel(DailyStatement.name, 'summary_arc')
    private dailyStatementModel: Model<DailyStatement>,
  ) {}

  async findByDate(params: GetDailyStatementDto) {
    const { date, page = 1, limit = 1000 } = params;
    const skip = (page - 1) * limit;
    const queryDate = new Date(date + 'T00:00:00.000Z');

    const [data, total] = await Promise.all([
      this.dailyStatementModel
        .find({
          time: queryDate,
          win: { $gt: 0 },
        })
        .select({
          playerId: 1,
          'USD.stake': 1,
          'USD.payout': 1,
          'USD.winloss': 1,
          stake: 1,
          loss: 1,
          gameId: 1,
          payout: 1,
          time: 1,
          _id: 0,
        })
        .lean()
        .transform((docs) => {
          return docs.map((doc) => ({
            pid: doc.playerId,
            gid: doc.gameId,
            stk: doc.stake,
            pay: doc.payout,
            los: doc.loss,
            t: doc.time,
            usd: {
              s: doc.USD.stake,
              p: doc.USD.payout,
              w: doc.USD.winloss,
            },
          }));
        })
        .skip(skip)
        .limit(limit)
        .exec(),

      this.dailyStatementModel.countDocuments({
        time: queryDate,
        win: { $gt: 0 },
      }),
    ]);

    return {
      d: data,
      m: {
        t: total,
        p: page,
        l: limit,
        tp: Math.ceil(total / limit),
      },
    };
  }
}
