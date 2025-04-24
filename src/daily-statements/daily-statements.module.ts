import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStatementsController } from './daily-statements.controller';
import { DailyStatementsService } from './daily-statements.service';
import { DailyStatement, DailyStatementSchema } from './schemas/daily-statement.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: DailyStatement.name,
          schema: DailyStatementSchema,
        },
      ],
      'summary',
    ), // Use summary_arc connection
  ],
  controllers: [DailyStatementsController],
  providers: [DailyStatementsService],
})
export class DailyStatementsModule {}
