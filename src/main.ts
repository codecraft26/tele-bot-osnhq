import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Telegraf } from 'telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.telegram.setWebhook(`${process.env.APP_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`)
    .then(() => {
      console.log('Webhook set successfully');
    })
    .catch((error) => {
      console.error('Error setting webhook', error);
    });

  app.use(bot.webhookCallback(`/bot${process.env.TELEGRAM_BOT_TOKEN}`));
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
