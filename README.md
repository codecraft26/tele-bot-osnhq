# Telegram Bot with NestJS

Deployed link on render - https://tele-bot-osnhq-5mr7.onrender.com/ 
## Setup Instructions

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with the following content:
    ```
    TELEGRAM_BOT_TOKEN=<your-bot-token>
    ```
4. Start the application:
    ```bash
    npm run start
    ```

## Usage Guide

- Open Telegram and search for your bot.
- Send a message "hello" or "hi" or "/start" to the bot.
- The bot will respond with a funny statement.
- If you send any other message, the bot will respond with "Sorry, I didn't understand that command."

## Middleware Logging

- All incoming messages and bot responses are logged to the console.

## Testing

- Run unit tests:
    ```bash
    npm run test
    ```
