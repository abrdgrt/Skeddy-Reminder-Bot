const chrono = require('chrono-node');

/**
 * Parse a reminder command and extract the message and date/time
 * @param {string} text - The user's input text
 * @returns {Object|null} - Object with message and dateTime, or null if parsing failed
 */
function parseReminderCommand(text) {
  // Remove common prefixes
  let cleanText = text
    .replace(/^remind me (to |about )?/i, '')
    .replace(/^remind me/i, '')
    .trim();
  
  // Parse the date/time using chrono-node
  const parsed = chrono.parse(cleanText, new Date(), { forwardDate: true });
  
  if (parsed.length === 0) {
    return null;
  }
  
  const chronoResult = parsed[0];
  const dateTime = chronoResult.start.date();
  
  // Extract the message by removing the date/time text
  let message = cleanText.substring(0, chronoResult.index).trim();
  
  // If message is at the end, extract it
  if (!message) {
    const afterDateTime = cleanText.substring(chronoResult.index + chronoResult.text.length).trim();
    if (afterDateTime) {
      message = afterDateTime;
    } else {
      // Message might be the whole text before date
      message = cleanText.replace(chronoResult.text, '').trim();
    }
  }
  
  if (!message) {
    return null;
  }
  
  return {
    message,
    dateTime
  };
}

/**
 * Format a list of reminders for display
 * @param {Array} reminders - Array of reminder objects
 * @returns {string} - Formatted string
 */
function formatRemindersList(reminders) {
  return reminders
    .map(r => {
      const formattedDate = r.dateTime.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      return `🆔 *${r.id}* | ${r.message}\n⏰ ${formattedDate}`;
    })
    .join('\n\n');
}

module.exports = {
  parseReminderCommand,
  formatRemindersList
};