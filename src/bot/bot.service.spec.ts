import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BotService } from './bot.service';
import * as TelegramBot from 'node-telegram-bot-api';

jest.mock('node-telegram-bot-api');

describe('BotService', () => {
    let service: BotService;
    let botSendMessageSpy: jest.SpyInstance;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BotService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('fake-telegram-bot-token'),
                    },
                },
            ],
        }).compile();

        service = module.get<BotService>(BotService);

        // Manually call onModuleInit to initialize the bot
        await service.onModuleInit();

        // Mock the sendMessage method of TelegramBot
        botSendMessageSpy = jest.spyOn((service as any).bot, 'sendMessage').mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should respond with a funny statement on "hello" or "hi"', () => {
        const message = { chat: { id: 123 }, text: 'hello' };
        (service as any).handleMessage(message);
        expect(botSendMessageSpy).toHaveBeenCalledWith(123, expect.any(String));

        const messageHi = { chat: { id: 123 }, text: 'hi' };
        (service as any).handleMessage(messageHi);
        expect(botSendMessageSpy).toHaveBeenCalledWith(123, expect.any(String));
    });

    it('should respond with an error message on unknown command', () => {
        const message = { chat: { id: 123 }, text: 'unknown' };
        (service as any).handleMessage(message);
        expect(botSendMessageSpy).toHaveBeenCalledWith(123, "Sorry, I didn't understand that command.");
    });
});
