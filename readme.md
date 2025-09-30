# 🤖 Skeddy Bot - Telegram Reminder Bot

A professional, production-ready Telegram bot that helps you set and manage personal reminders using natural language processing. Never forget important tasks again!

![Node.js](https://img.shields.io/badge/node.js->=16.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🗣️ **Natural Language Processing** - Set reminders using everyday language
- ⏰ **Flexible Time Formats** - Supports relative and absolute time expressions
- 📝 **Reminder Management** - List, view, and cancel reminders easily
- 🔔 **Reliable Notifications** - Get notified exactly when you need to
- 💾 **In-Memory Storage** - Fast and lightweight (no database required)
- 🛡️ **Error Handling** - Robust error handling and validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.0.0 or higher)
- npm (comes with Node.js)
- A Telegram account

## 🚀 Getting Started

### 1. Create Your Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the prompts to create your bot
4. Copy the bot token provided by BotFather

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/skeddy-telegram-bot.git
cd skeddy-telegram-bot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your bot token:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

### 5. Run the Bot

**Production mode:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

You should see:
```
🤖 Skeddy Bot is running...
```

## 📖 Usage

### Setting Reminders

Just type your reminder naturally! The bot understands various formats:

```
remind me grocery tomorrow at 5pm
remind me call John in 2 hours
remind me dentist appointment next Monday at 10am
remind me take medicine at 8pm
remind me workout in 30 minutes
```

### Commands

- `/start` - Welcome message and quick start guide
- `/help` - Detailed help and examples
- `/list` - View all your active reminders
- `/cancel <id>` - Cancel a specific reminder by ID

### Time Format Examples

**Relative times:**
- "in 30 minutes"
- "in 2 hours"
- "in 1 day"

**Specific dates:**
- "tomorrow at 5pm"
- "next friday at 9am"
- "on monday at 3pm"
- "december 25 at noon"

**Specific times:**
- "at 5pm"
- "at 17:30"
- "at 8:00am"

## 🏗️ Project Structure

```
skeddy-telegram-bot/
├── src/
│   ├── index.js              # Main bot application
│   ├── reminderManager.js    # Reminder management logic
│   └── utils.js              # Helper functions
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from BotFather | Yes |

## 🛠️ Development

### Available Scripts

- `npm start` - Run the bot in production mode
- `npm run dev` - Run the bot in development mode with auto-reload
- `npm test` - Run tests (to be implemented)

### Adding Features

The project is structured to make it easy to add new features:

1. **New commands** - Add handlers in `src/index.js`
2. **Reminder logic** - Modify `src/reminderManager.js`
3. **Parsing** - Update `src/utils.js`

## 📦 Dependencies

- **node-telegram-bot-api** - Telegram Bot API wrapper
- **chrono-node** - Natural language date/time parser
- **node-cron** - Task scheduler
- **dotenv** - Environment variable management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Bot doesn't respond

1. Check if the bot is running (you should see "🤖 Skeddy Bot is running...")
2. Verify your `TELEGRAM_BOT_TOKEN` in `.env` is correct
3. Make sure you've started a conversation with your bot on Telegram

### Reminders not being sent

1. Check the server time is correct
2. Verify the reminder time is in the future
3. Check console logs for any errors

### "Could not find reminder" error

Make sure you're using the correct reminder ID from the `/list` command.

## 💡 Tips

- The bot stores reminders in memory, so restarting the bot will clear all reminders
- For production use, consider implementing persistent storage (database)
- Run the bot on a server or VPS to ensure 24/7 availability
- Use PM2 or similar process managers for production deployment

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/skeddy-telegram-bot/issues).

## 🌟 Acknowledgments

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API implementation
- [chrono-node](https://github.com/wanasit/chrono) - Natural language date parser
- All contributors and users of this project

---

Made with ❤️ by [Your Name]

**Star ⭐ this repository if you find it helpful!**