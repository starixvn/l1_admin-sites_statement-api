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
    const { date, minStake = 0, cappedPoint = 100 } = params;

    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

    // Reuse existing query pattern but get all tickets
    const tickets = await this.playerTicketModel
      .find({
        time: {
          $gte: startDate,
          $lte: endDate,
        },
        stake: { $gte: minStake },
        win: { $gt: 0 },
      })
      .select({
        playerId: 1,
        win: 1,
        _id: 0,
      })
      .lean()
      .exec();

    // Group tickets by player and calculate points
    const playerPoints = tickets.reduce((acc, ticket) => {
      if (!acc[ticket.playerId]) {
        acc[ticket.playerId] = 0;
      }

      // Calculate points for this ticket
      const points = ticket.win > 0 ? Math.min(ticket.win / 100, cappedPoint) : 0;
      acc[ticket.playerId] += points;

      return acc;
    }, {});

    // Transform to array and format response
    const results = Object.entries(playerPoints).map(([playerId, points]) => ({
      pid: playerId,
      rp: Math.floor(points as number),
    }));

    // Sort by points descending
    const filteredResults = results.filter((result) => result.rp > 0);

    const sortedResults = filteredResults.sort((a, b) => b.rp - a.rp);

    return {
      d: sortedResults,
      t: sortedResults.length,
    };
  }
}
