import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`Incoming message: ${JSON.stringify(req.body)}`);
        const originalSend = res.send;
        res.send = function (body?: any): Response {
            this.logger.log(`Bot response: ${body}`);
            return originalSend.apply(this, arguments);
        };
        next();
    }
}
