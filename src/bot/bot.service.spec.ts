import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit {
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

        if (text === 'hello'|| text === 'hi' ) {
            const randomIndex = Math.floor(Math.random() * this.funnyStatements.length);
            this.bot.sendMessage(chatId, this.funnyStatements[randomIndex]);
        } else {
            this.bot.sendMessage(chatId, "Sorry, I didn't understand that command.");
        }
    }
}
