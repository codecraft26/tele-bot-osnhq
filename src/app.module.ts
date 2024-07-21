import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
