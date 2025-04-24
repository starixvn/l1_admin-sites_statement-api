/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStatementsModule } from './daily-statements/daily-statements.module';
import { PlayerTicketsModule } from './player-tickets/player-tickets.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Connection for daily statements (summary_arc)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DB_NAME'),
      }),
      inject: [ConfigService],
      connectionName: 'summary',
    }),
    // Connection for player tickets (minigame_arc)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI_SECOND'),
        dbName: configService.get<string>('MONGODB_DB_NAME_SECOND'),
      }),
      inject: [ConfigService],
      connectionName: 'minigame',
    }),
    DailyStatementsModule,
    PlayerTicketsModule,
    HealthModule,
  ],
})
export class AppModule {}
