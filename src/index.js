require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const ReminderManager = require('./reminderManager');
const { parseReminderCommand, formatRemindersList } = require('./utils');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('❌ TELEGRAM_BOT_TOKEN is not defined in .env file');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const reminderManager = new ReminderManager(bot);

console.log('🤖 Skeddy Bot is running...');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
🤖 *Welcome to Skeddy Bot!*

I'm your personal reminder assistant. Here's how to use me:

*Set a reminder:*
• "remind me grocery tomorrow at 5pm"
• "remind me call mom in 2 hours"
• "remind me meeting on friday at 9am"
• "remind me workout at 6:30pm"

*Manage reminders:*
• /list - View all your reminders
• /cancel - Cancel a specific reminder
• /help - Show this help message

Just type your reminder naturally, and I'll handle the rest! 🚀
  `;
  
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
📚 *Skeddy Bot Help*

*How to set reminders:*
Just type naturally what you want to be reminded about!

*Examples:*
• remind me grocery tomorrow at 5pm
• remind me call John in 30 minutes
• remind me dentist appointment next Monday at 10am
• remind me take medicine at 8pm

*Commands:*
/list - View all your active reminders
/cancel - Cancel a reminder by ID
/help - Show this help message

*Time formats I understand:*
• Specific times: "at 5pm", "at 17:00"
• Relative times: "in 2 hours", "in 30 minutes"
• Dates: "tomorrow", "next friday", "on monday"
• Combined: "tomorrow at 3pm", "next week at 9am"

⏰ I'll send you a reminder at the scheduled time!
  `;
  
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// List reminders command
bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  const reminders = reminderManager.getUserReminders(chatId);
  
  if (reminders.length === 0) {
    bot.sendMessage(chatId, '📭 You have no active reminders.');
    return;
  }
  
  const remindersList = formatRemindersList(reminders);
  bot.sendMessage(chatId, `📝 *Your Reminders:*\n\n${remindersList}`, { 
    parse_mode: 'Markdown' 
  });
});

// Cancel reminder command
bot.onText(/\/cancel (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const reminderId = match[1].trim();
  
  const success = reminderManager.cancelReminder(chatId, reminderId);
  
  if (success) {
    bot.sendMessage(chatId, `✅ Reminder #${reminderId} has been cancelled.`);
  } else {
    bot.sendMessage(chatId, `❌ Could not find reminder #${reminderId}.`);
  }
});

// Handle text messages (reminder creation)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // Ignore commands
  if (text.startsWith('/')) return;
  
  try {
    const parsedReminder = parseReminderCommand(text);
    
    if (!parsedReminder) {
      bot.sendMessage(
        chatId, 
        '❌ I couldn\'t understand that reminder. Please try again.\n\nExample: "remind me grocery tomorrow at 5pm"'
      );
      return;
    }
    
    const { message, dateTime } = parsedReminder;
    
    if (dateTime < new Date()) {
      bot.sendMessage(chatId, '❌ That time is in the past! Please set a future time.');
      return;
    }
    
    const reminder = reminderManager.addReminder(chatId, message, dateTime);
    
    const formattedDate = dateTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    bot.sendMessage(
      chatId,
      `✅ Reminder set!\n\n📌 *${message}*\n⏰ ${formattedDate}\n🆔 ID: ${reminder.id}`,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Error processing reminder:', error);
    bot.sendMessage(
      chatId,
      '❌ Sorry, I encountered an error processing your reminder. Please try again.'
    );
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Skeddy Bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down Skeddy Bot...');
  bot.stopPolling();
  process.exit(0);
});