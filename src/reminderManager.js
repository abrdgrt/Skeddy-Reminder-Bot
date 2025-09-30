const cron = require('node-cron');

class ReminderManager {
  constructor(bot) {
    this.bot = bot;
    this.reminders = new Map();
    this.reminderIdCounter = 1;
    
    // Check for due reminders every minute
    this.checkInterval = setInterval(() => this.checkReminders(), 60000);
  }
  
  addReminder(chatId, message, dateTime) {
    const id = this.reminderIdCounter++;
    
    const reminder = {
      id: id.toString(),
      chatId,
      message,
      dateTime,
      createdAt: new Date(),
      sent: false
    };
    
    if (!this.reminders.has(chatId)) {
      this.reminders.set(chatId, []);
    }
    
    this.reminders.get(chatId).push(reminder);
    
    console.log(`✅ Reminder added: ID=${id}, User=${chatId}, Time=${dateTime}`);
    
    return reminder;
  }
  
  getUserReminders(chatId) {
    const userReminders = this.reminders.get(chatId) || [];
    return userReminders.filter(r => !r.sent);
  }
  
  cancelReminder(chatId, reminderId) {
    const userReminders = this.reminders.get(chatId);
    
    if (!userReminders) return false;
    
    const index = userReminders.findIndex(r => r.id === reminderId && !r.sent);
    
    if (index === -1) return false;
    
    userReminders.splice(index, 1);
    console.log(`🗑️ Reminder cancelled: ID=${reminderId}, User=${chatId}`);
    
    return true;
  }
  
  checkReminders() {
    const now = new Date();
    
    for (const [chatId, userReminders] of this.reminders.entries()) {
      for (const reminder of userReminders) {
        if (!reminder.sent && reminder.dateTime <= now) {
          this.sendReminder(reminder);
        }
      }
      
      // Clean up old sent reminders (older than 24 hours)
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      this.reminders.set(
        chatId,
        userReminders.filter(r => !r.sent || r.dateTime > dayAgo)
      );
    }
  }
  
  sendReminder(reminder) {
    const message = `
🔔 *REMINDER*

${reminder.message}

_This reminder was set on ${reminder.createdAt.toLocaleString()}_
    `;
    
    this.bot.sendMessage(reminder.chatId, message, { parse_mode: 'Markdown' })
      .then(() => {
        reminder.sent = true;
        console.log(`📤 Reminder sent: ID=${reminder.id}, User=${reminder.chatId}`);
      })
      .catch(err => {
        console.error(`❌ Failed to send reminder: ID=${reminder.id}`, err);
      });
  }
  
  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

module.exports = ReminderManager;