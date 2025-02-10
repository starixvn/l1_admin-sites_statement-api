import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerTicket } from './schemas/player-ticket.schema';
import { GetPlayerTicketsDto } from './dto/get-player-tickets.dto';
import { GetRewardPointsDto } from './dto/get-reward-points.dto';

@Injectable()
export class PlayerTicketsService {
  constructor(
    @InjectModel(PlayerTicket.name, 'minigame_arc')
    private playerTicketModel: Model<PlayerTicket>,
  ) {}

  async findByPlayerIdAndDate(params: GetPlayerTicketsDto) {
    const { playerId, date, page = 1, limit = 100 } = params;
    const skip = (page - 1) * limit;

    // Create date range for the same date
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

    const [data, total] = await Promise.all([
      this.playerTicketModel
        .find({
          playerId,
          time: {
            $gte: startDate,
            $lte: endDate,
          },
          win: { $gt: 0 },
        })
        .select({
          playerId: 1,
          gameId: 1,
          win: 1,
          stake: 1,
          payout: 1,
          time: 1,
          _id: 0,
        })
        .lean()
        .skip(skip)
        .limit(limit)
        .exec(),

      this.playerTicketModel.countDocuments({
        playerId,
        time: {
          $gte: startDate,
          $lte: endDate,
        },
      }),
    ]);

    // Transform data to minimize payload
    const transformedData = data.map((ticket) => ({
      pid: ticket.playerId,
      gid: ticket.gameId,
      w: ticket.win,
      s: ticket.stake,
      p: ticket.payout,
      t: ticket.time,
    }));

    return {
      d: transformedData,
      m: {
        t: total,
        p: page,
        l: limit,
        tp: Math.ceil(total / limit),
      },
    };
  }

  async calculateRewardPoints(params: GetRewardPointsDto) {
    const { playerId, date, minStake = 0, cappedPoint = 100 } = params;

    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

    const tickets = await this.playerTicketModel
      .find({
        playerId,
        time: {
          $gte: startDate,
          $lte: endDate,
        },
        stake: { $gte: minStake },
      })
      .select({
        win: 1,
        _id: 0,
      })
      .lean()
      .exec();

    // Calculate total reward points
    const totalPoints = tickets.reduce((sum, ticket) => {
      const points = Math.min(ticket.win / 100, cappedPoint);
      return sum + points;
    }, 0);

    return {
      pid: playerId,
      rp: Math.floor(totalPoints), // Round down to nearest integer
    };
  }
}
