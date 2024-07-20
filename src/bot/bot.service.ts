import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit {
    private readonly logger = new Logger(BotService.name);
    private bot: TelegramBot;
    private readonly funnyStatements: string[] = [
        "Hello there! What, no Hi for me? Why so formal?",
        "Hi! Did you just 'hello' me? How old-school!",
        "Hey! What's up? Just 'hello'?",
        "Hello! Are you a bot too?",
        "Hi there! Did you just say hello?"
    ];

    constructor(private configService: ConfigService) {}

    onModuleInit() {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        this.bot = new TelegramBot(token, { polling: true });
        this.bot.on('message', this.handleMessage.bind(this));
    }

    private handleMessage(msg: TelegramBot.Message) {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();
        this.logger.log(`Incoming message: ${text} from chat ID: ${chatId}`);

        const greetings = ['hello', 'hi','/start'];
        if (greetings.includes(text)) {
            const randomIndex = Math.floor(Math.random() * this.funnyStatements.length);
            const response = this.funnyStatements[randomIndex];
            this.bot.sendMessage(chatId, response);
            this.logger.log(`Bot response: ${response} to chat ID: ${chatId}`);
        } else {
            const response = "Sorry, I didn't understand that command.";
            this.bot.sendMessage(chatId, response);
            this.logger.log(`Bot response: ${response} to chat ID: ${chatId}`);
        }
    }
}
