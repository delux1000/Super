require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 1000;

// Dynamic import for node-fetch v3+
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// JSONBin Configuration
const JSONBIN_API_KEY = '$2a$10$nCBLclxfTfVHOJVQH1rRSOq.M/Ds19fpLw1sEX7k9IREVmxidVeBS';
const USERS_BIN_ID = '69371f88d0ea881f401b56d2';
const TRANSACTIONS_BIN_ID = '6937206e43b1c97be9e049e6';
const INVESTMENTS_BIN_ID = '69372124ae596e708f8c086d';
const CARDS_BIN_ID = '6937224e043b5e708f8c086e';
const CHATS_BIN_ID = '69a78f20ae596e708f5cd2a0';
const ADMIN_BIN_ID = '69a78f66d0ea881f40ec6f47';

// JSONBin API URLs
const USERS_URL = `https://api.jsonbin.io/v3/b/${USERS_BIN_ID}`;
const TRANSACTIONS_URL = `https://api.jsonbin.io/v3/b/${TRANSACTIONS_BIN_ID}`;
const INVESTMENTS_URL = `https://api.jsonbin.io/v3/b/${INVESTMENTS_BIN_ID}`;
const CARDS_URL = `https://api.jsonbin.io/v3/b/${CARDS_BIN_ID}`;
const CHATS_URL = `https://api.jsonbin.io/v3/b/${CHATS_BIN_ID}`;
const ADMIN_URL = `https://api.jsonbin.io/v3/b/${ADMIN_BIN_ID}`;

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': JSONBIN_API_KEY,
  'X-Bin-Version': 'latest'
};

// Ntfy Configuration
const NTFY_TOPIC_REGISTER = 'delux_new_register';
const NTFY_TOPIC_CHAT = 'delux_new_chat';
const NTFY_TOPIC_LOGIN = 'delux_user_login';
const ADMIN_PHONE = '12568212395';
const ADMIN_PIN = '338989';
const ADMIN_EMAIL = 'admin@delux.com';
const SUPPORT_EMAIL = 'support@suppcash.com';
const SUPPORT_PASSWORD = 'Tomtom1@';

// Telegram Bot Configuration from .env
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Session middleware for Express
const sessionMiddleware = session({ 
  secret: 'delux-secret', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } 
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);

// ==================== TELEGRAM BOT INITIALIZATION ====================

let telegramBot;
let telegramEnabled = false;

try {
  if (TELEGRAM_BOT_TOKEN) {
    const TelegramBot = require('node-telegram-bot-api');
    telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
    telegramEnabled = true;
    console.log('✅ Telegram Bot initialized successfully');
    
    // Get chat ID if not set
    if (!TELEGRAM_CHAT_ID) {
      telegramBot.on('message', (msg) => {
        console.log('📱 Telegram Chat ID detected:', msg.chat.id);
        console.log('💡 Add this to your .env file: TELEGRAM_CHAT_ID=' + msg.chat.id);
      });
    }
  } else {
    console.log('⚠️ Telegram bot token not found in .env file');
  }
} catch (error) {
  console.error('❌ Failed to initialize Telegram Bot:', error.message);
}

// ==================== TELEGRAM BOT FUNCTIONS ====================

const sendTelegramNotification = async (message, options = {}) => {
  if (!telegramBot || !telegramEnabled || !TELEGRAM_CHAT_ID) {
    return;
  }

  try {
    await telegramBot.sendMessage(TELEGRAM_CHAT_ID, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...options
    });
    console.log('✅ Telegram notification sent');
  } catch (error) {
    console.error('❌ Telegram notification failed:', error.message);
  }
};

// Setup Telegram bot commands
const setupTelegramBot = () => {
  if (!telegramBot || !telegramEnabled) return;

  // Handle /start command
  telegramBot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const response = `
🤖 <b>Delux Euro Wallet Admin Bot</b>

Welcome to the admin notification bot!

<b>Available Commands:</b>
/stats - Get system statistics
/users - List recent users
/balance [email/phone] - Check user balance
/credit [email/phone] [amount] - Credit user
/investments - View active investments
/broadcast [message] - Broadcast to all users
/help - Show this help message

You'll receive notifications for:
• New user registrations
• User logins
• New chat messages
• Investment completions
• Admin actions
    `;
    telegramBot.sendMessage(chatId, response, { parse_mode: 'HTML' });
  });

  // Handle /stats command
  telegramBot.onText(/\/stats/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const users = await readUsers();
      const investments = await readInvestments();
      const chats = await readChats();
      
      const activeUsers = users.filter(u => u.isActive !== false).length;
      const totalBalance = users.reduce((sum, u) => sum + (u.balance || 0), 0);
      const totalInvestments = investments.reduce((sum, i) => sum + (i.amount || 0), 0);
      const runningInvestments = investments.filter(i => i.status === 'running').length;
      const unreadMessages = chats.reduce((sum, chat) => {
        return sum + chat.messages.filter(m => !m.read).length;
      }, 0);
      
      const response = `
📊 <b>System Statistics</b>

👥 <b>Users:</b>
• Total: ${users.length}
• Active: ${activeUsers}
• Total Balance: ${totalBalance.toFixed(2)}€

💰 <b>Investments:</b>
• Total: ${totalInvestments.toFixed(2)}€
• Active: ${runningInvestments}
• Completed: ${investments.filter(i => i.status === 'completed').length}

💬 <b>Messages:</b>
• Unread: ${unreadMessages}
• Total Chats: ${chats.length}

📱 <b>System:</b>
• Uptime: ${Math.floor(process.uptime() / 60)} minutes
• Status: ✅ Online
• Bot: ✅ Active
      `;
      telegramBot.sendMessage(chatId, response, { parse_mode: 'HTML' });
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error fetching stats');
    }
  });

  // Handle /users command
  telegramBot.onText(/\/users/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const users = await readUsers();
      const recentUsers = users.slice(-5).reverse();
      
      let response = '👥 <b>Recent Users:</b>\n\n';
      recentUsers.forEach((u, i) => {
        response += `${i+1}. <b>${u.fullName}</b>\n`;
        response += `   📧 ${u.email}\n`;
        response += `   📱 ${u.phoneNumber}\n`;
        response += `   💰 ${u.balance}€\n`;
        response += `   Status: ${u.isActive ? '✅ Active' : '❌ Inactive'}\n`;
        response += `   📅 Joined: ${new Date(u.createdAt).toLocaleDateString()}\n\n`;
      });
      
      response += `📊 <b>Total Users:</b> ${users.length}`;
      
      telegramBot.sendMessage(chatId, response, { parse_mode: 'HTML' });
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error fetching users');
    }
  });

  // Handle /balance command
  telegramBot.onText(/\/balance (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const identifier = match[1].trim();
    
    try {
      const users = await readUsers();
      const user = users.find(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (!user) {
        telegramBot.sendMessage(chatId, `❌ User not found: ${identifier}`);
        return;
      }
      
      const response = `
💰 <b>Balance for ${user.fullName}</b>

📧 Email: ${user.email}
📱 Phone: ${user.phoneNumber}
💵 Balance: ${user.balance}€
📊 Status: ${user.isActive ? '✅ Active' : '❌ Inactive'}
📅 Joined: ${new Date(user.createdAt).toLocaleDateString()}
📈 Transactions: ${user.transactions?.length || 0}
      `;
      telegramBot.sendMessage(chatId, response, { parse_mode: 'HTML' });
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error fetching balance');
    }
  });

  // Handle /credit command
  telegramBot.onText(/\/credit (.+) (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const identifier = match[1].trim();
    const amount = parseFloat(match[2]);
    
    try {
      const users = await readUsers();
      const userIndex = users.findIndex(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (userIndex === -1) {
        telegramBot.sendMessage(chatId, `❌ User not found: ${identifier}`);
        return;
      }
      
      users[userIndex].balance += amount;
      
      if (!users[userIndex].transactions) users[userIndex].transactions = [];
      users[userIndex].transactions.push({
        type: "Credit (Telegram)",
        amount: amount,
        date: new Date().toISOString(),
        description: `Telegram bot credited account with ${amount}€`,
        balanceAfterTransaction: users[userIndex].balance
      });
      
      await saveUsers(users);
      
      telegramBot.sendMessage(chatId, 
        `✅ <b>Credited ${amount}€ to ${users[userIndex].fullName}</b>\n` +
        `New balance: ${users[userIndex].balance}€`
      , { parse_mode: 'HTML' });
      
      // Also notify via ntfy
      sendNtfyRegistration(
        'Telegram Bot Credit',
        `User: ${users[userIndex].fullName}\nAmount: ${amount}€\nBy: Telegram Bot`,
        3
      ).catch(err => console.error('Telegram credit notification error:', err));
      
      // Notify user via chat
      const chatRoom = [users[userIndex].email, adminBot?.botUserId].sort().join('_');
      if (adminBot) {
        await adminBot.sendBotMessage(chatRoom, 
          `💰 Your account has been credited with ${amount}€ by Telegram Bot.\nNew balance: ${users[userIndex].balance}€`
        );
      }
      
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error crediting user');
    }
  });

  // Handle /broadcast command
  telegramBot.onText(/\/broadcast (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1].trim();
    
    try {
      const users = await readUsers();
      const activeUsers = users.filter(u => u.isActive !== false);
      
      // Send to all active users via their rooms
      activeUsers.forEach(user => {
        const userRoom = `user:${user.email}`;
        io.to(userRoom).emit('notification', {
          type: 'broadcast',
          message: `📢 <b>Broadcast from Telegram:</b>\n${message}`,
          from: 'Telegram Bot'
        });
      });

      telegramBot.sendMessage(chatId, 
        `✅ Broadcast sent to ${activeUsers.length} active users`
      );
      
      // Notify admin bot
      if (adminBot) {
        const adminChatId = [adminBot.botUserId, 'system'].sort().join('_');
        await adminBot.sendBotMessage(adminChatId, 
          `📢 Broadcast sent via Telegram to ${activeUsers.length} users:\n\n${message}`
        );
      }
      
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error sending broadcast');
    }
  });

  // Handle /investments command
  telegramBot.onText(/\/investments/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const investments = await readInvestments();
      const running = investments.filter(i => i.status === 'running');
      const completed = investments.filter(i => i.status === 'completed');
      
      let response = '📈 <b>Investment Summary</b>\n\n';
      response += `💰 <b>Total Invested:</b> ${investments.reduce((sum, i) => sum + i.amount, 0)}€\n`;
      response += `💎 <b>Running:</b> ${running.length}\n`;
      response += `✅ <b>Completed:</b> ${completed.length}\n\n`;
      
      if (running.length > 0) {
        response += '⏳ <b>Active Investments:</b>\n';
        running.slice(0, 5).forEach(i => {
          const daysLeft = Math.ceil((new Date(i.completeDate) - new Date()) / (1000 * 60 * 60 * 24));
          response += `• ${i.fullName}: ${i.amount}€ (${daysLeft} days left)\n`;
        });
      }
      
      telegramBot.sendMessage(chatId, response, { parse_mode: 'HTML' });
    } catch (error) {
      telegramBot.sendMessage(chatId, '❌ Error fetching investments');
    }
  });

  // Handle /help command
  telegramBot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpText = `
🤖 <b>Available Commands:</b>

📊 <b>Information:</b>
/stats - Get system statistics
/users - List recent users
/investments - View investment summary
/help - Show this help message

👤 <b>User Actions:</b>
/balance [email/phone] - Check user balance
/credit [email/phone] [amount] - Credit user

📢 <b>Broadcast:</b>
/broadcast [message] - Send message to all users

📝 <b>Examples:</b>
/balance user@example.com
/credit user@example.com 100
/credit +1234567890 50
/broadcast Important system update!

<b>Notifications you'll receive:</b>
• New user registrations
• User logins
• New chat messages
• Investment completions
• Admin actions
• System alerts

<b>Status:</b> ✅ Bot is active and monitoring
    `;
    telegramBot.sendMessage(chatId, helpText, { parse_mode: 'HTML' });
  });

  // Handle unknown commands
  telegramBot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text && msg.text.startsWith('/')) {
      const command = msg.text.split(' ')[0].toLowerCase();
      const validCommands = ['/start', '/stats', '/users', '/balance', '/credit', '/investments', '/broadcast', '/help'];
      
      if (!validCommands.includes(command)) {
        telegramBot.sendMessage(chatId, 
          '❌ Unknown command. Type /help to see available commands.'
        );
      }
    }
  });

  console.log('✅ Telegram bot commands registered');
};

// Call setup if bot is enabled
if (telegramEnabled && telegramBot) {
  setupTelegramBot();
}

// ==================== NTFY NOTIFICATION FUNCTIONS ====================

const sendNtfyRegistration = async (title, message, priority = 4) => {
  try {
    const cleanTitle = title.replace(/[^\x20-\x7E]/g, '').trim();
    
    await fetch(`https://ntfy.sh/${NTFY_TOPIC_REGISTER}`, {
      method: 'POST',
      body: message,
      headers: {
        'Title': cleanTitle || 'New Registration',
        'Priority': priority.toString(),
        'Tags': 'tada'
      }
    });
    console.log(`✅ Ntfy registration notification sent: ${cleanTitle}`);
    
    // Also send to Telegram
    if (telegramEnabled) {
      const nameMatch = message.match(/Name: ([^\n]+)/);
      const emailMatch = message.match(/Email: ([^\n]+)/);
      const phoneMatch = message.match(/Phone: ([^\n]+)/);
      
      sendTelegramNotification(`
🔔 <b>New User Registration</b>

👤 <b>Name:</b> ${nameMatch ? nameMatch[1] : 'N/A'}
📧 <b>Email:</b> ${emailMatch ? emailMatch[1] : 'N/A'}
📱 <b>Phone:</b> ${phoneMatch ? phoneMatch[1] : 'N/A'}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `).catch(err => console.error('Telegram notification error:', err));
    }
    
  } catch (error) {
    console.error('❌ Ntfy registration notification failed:', error.message);
  }
};

const sendNtfyChat = async (title, message, priority = 3) => {
  try {
    const cleanTitle = title.replace(/[^\x20-\x7E]/g, '').trim();
    
    await fetch(`https://ntfy.sh/${NTFY_TOPIC_CHAT}`, {
      method: 'POST',
      body: message,
      headers: {
        'Title': cleanTitle || 'New Chat Message',
        'Priority': priority.toString(),
        'Tags': 'speech_balloon'
      }
    });
    console.log(`✅ Ntfy chat notification sent: ${cleanTitle}`);
    
    // Also send to Telegram
    if (telegramEnabled) {
      const fromMatch = message.match(/From: ([^\n]+)/);
      const toMatch = message.match(/To: ([^\n]+)/);
      const msgMatch = message.match(/Message: ([^\n]+)/);
      
      sendTelegramNotification(`
💬 <b>New Chat Message</b>

👤 <b>From:</b> ${fromMatch ? fromMatch[1] : 'N/A'}
📨 <b>To:</b> ${toMatch ? toMatch[1] : 'N/A'}
📝 <b>Message:</b> ${msgMatch ? msgMatch[1] : message.substring(0, 100)}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `).catch(err => console.error('Telegram notification error:', err));
    }
    
  } catch (error) {
    console.error('❌ Ntfy chat notification failed:', error.message);
  }
};

const sendNtfyLogin = async (title, message, priority = 2) => {
  try {
    const cleanTitle = title.replace(/[^\x20-\x7E]/g, '').trim();
    
    await fetch(`https://ntfy.sh/${NTFY_TOPIC_LOGIN}`, {
      method: 'POST',
      body: message,
      headers: {
        'Title': cleanTitle || 'User Login',
        'Priority': priority.toString(),
        'Tags': 'door'
      }
    });
    console.log(`✅ Ntfy login notification sent: ${cleanTitle}`);
    
    // Also send to Telegram
    if (telegramEnabled) {
      const isAdmin = message.includes('Admin logged in');
      const userMatch = message.match(/(?:User|Admin) logged in: ([^\n]+)/);
      
      sendTelegramNotification(`
🚪 <b>${isAdmin ? 'Admin Login' : 'User Login'}</b>

👤 <b>${isAdmin ? 'Admin' : 'User'}:</b> ${userMatch ? userMatch[1] : 'N/A'}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
📧 <b>Email:</b> ${message.includes('Email:') ? message.split('Email:')[1]?.split('\n')[0] : 'N/A'}
📱 <b>Phone:</b> ${message.includes('Phone:') ? message.split('Phone:')[1]?.split('\n')[0] : 'N/A'}
      `).catch(err => console.error('Telegram notification error:', err));
    }
    
  } catch (error) {
    console.error('❌ Ntfy login notification failed:', error.message);
  }
};

// ==================== ADMIN BOT WITH BUTTON INTERFACE ====================

class AdminBot {
  constructor(io, sessionMiddleware) {
    this.io = io;
    this.sessionMiddleware = sessionMiddleware;
    this.botUserId = 'support@suppcash.com';
    this.botUserName = 'Support Bot';
    this.isActive = false;
    this.socket = null;
    this.connected = false;
    this.activeMenus = new Map(); // Track user menu states
    
    // Command handlers
    this.commandHandlers = {
      '/help': this.showHelp.bind(this),
      '/menu': this.showMainMenu.bind(this),
      '/users': this.listUsers.bind(this),
      '/stats': this.showStats.bind(this),
      '/credit': this.creditUser.bind(this),
      '/deactivate': this.deactivateUser.bind(this),
      '/activate': this.activateUser.bind(this),
      '/balance': this.getUserBalance.bind(this),
      '/transactions': this.getUserTransactions.bind(this),
      '/investments': this.getUserInvestments.bind(this),
      '/broadcast': this.broadcastMessage.bind(this),
      '/clear': this.clearChat.bind(this),
      '/telegram': this.showTelegramStatus.bind(this)
    };
  }

  async initialize() {
    try {
      // Ensure bot user exists in admin settings
      const adminSettings = await readAdminSettings();
      const botExists = adminSettings.some(a => a.email === this.botUserId);
      
      if (!botExists) {
        adminSettings.push({
          phone: 'BOT-SYSTEM',
          pin: 'BOT-NO-LOGIN',
          fullName: this.botUserName,
          email: this.botUserId,
          isBot: true,
          createdAt: new Date().toISOString()
        });
        await saveAdminSettings(adminSettings);
        console.log('✅ Admin Bot user initialized');
      }

      // Connect bot socket
      this.connectBotSocket();
      
      console.log('🤖 Admin Bot is ready with button interface');
    } catch (error) {
      console.error('Bot initialization error:', error);
    }
  }

  connectBotSocket() {
    // Create a fake socket for the bot
    const botSocket = {
      id: 'bot-socket',
      userId: this.botUserId,
      userName: this.botUserName,
      isAdmin: true,
      join: (room) => {
        console.log(`Bot joined room: ${room}`);
      },
      emit: (event, data) => {
        console.log(`Bot emitting ${event}:`, data);
      },
      to: (room) => {
        return {
          emit: (event, data) => {
            this.io.to(room).emit(event, data);
          }
        };
      }
    };

    this.socket = botSocket;
    this.connected = true;
    
    // Join admin room
    botSocket.join('admin');
    
    console.log('🤖 Bot connected to Socket.IO');
  }

  async processCommand(command, fromUser, chatRoom) {
    try {
      const parts = command.split(' ');
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (this.commandHandlers[cmd]) {
        await this.commandHandlers[cmd](args, fromUser, chatRoom);
      } else {
        await this.sendButtonMessage(chatRoom, 
          '❌ Unknown command. Please use the buttons below or type /help',
          this.getMainMenuButtons()
        );
      }
    } catch (error) {
      console.error('Command processing error:', error);
      await this.sendButtonMessage(chatRoom, 
        '❌ Error processing command. Please try again.',
        this.getMainMenuButtons()
      );
    }
  }

  // Button menu generators
  getMainMenuButtons() {
    return [
      [{ text: '📊 Statistics', callback_data: 'stats' }, { text: '👥 Users', callback_data: 'list_users' }],
      [{ text: '💰 Credit User', callback_data: 'credit_menu' }, { text: '📈 Investments', callback_data: 'investments' }],
      [{ text: '📢 Broadcast', callback_data: 'broadcast_menu' }, { text: '🤖 Telegram Status', callback_data: 'telegram_status' }],
      [{ text: '❓ Help', callback_data: 'help' }]
    ];
  }

  getUserActionsMenu(userEmail) {
    return [
      [{ text: '💰 Check Balance', callback_data: `balance_${userEmail}` }],
      [{ text: '💳 Credit Account', callback_data: `credit_${userEmail}` }],
      [{ text: '📊 Transactions', callback_data: `transactions_${userEmail}` }],
      [{ text: '📈 Investments', callback_data: `user_investments_${userEmail}` }],
      [{ text: '✅ Activate', callback_data: `activate_${userEmail}` }, { text: '❌ Deactivate', callback_data: `deactivate_${userEmail}` }],
      [{ text: '🔙 Back to Main Menu', callback_data: 'main_menu' }]
    ];
  }

  getCreditAmountMenu(userEmail) {
    return [
      [{ text: '100€', callback_data: `credit_amount_${userEmail}_100` }, { text: '500€', callback_data: `credit_amount_${userEmail}_500` }],
      [{ text: '1000€', callback_data: `credit_amount_${userEmail}_1000` }, { text: '5000€', callback_data: `credit_amount_${userEmail}_5000` }],
      [{ text: 'Custom', callback_data: `credit_custom_${userEmail}` }],
      [{ text: '🔙 Back', callback_data: `user_menu_${userEmail}` }]
    ];
  }

  getBroadcastMenu() {
    return [
      [{ text: '📢 Send Test Message', callback_data: 'broadcast_test' }],
      [{ text: '📢 Send to All Users', callback_data: 'broadcast_all' }],
      [{ text: '📢 Send to Active Only', callback_data: 'broadcast_active' }],
      [{ text: '🔙 Back to Main Menu', callback_data: 'main_menu' }]
    ];
  }

  // Send message with buttons
  async sendButtonMessage(roomId, text, buttons) {
    try {
      // Convert buttons to a format that can be displayed in chat
      const buttonText = this.formatButtonsAsText(buttons);
      const message = `${text}\n\n${buttonText}`;
      
      await this.sendBotMessage(roomId, message);
    } catch (error) {
      console.error('Error sending button message:', error);
    }
  }

  formatButtonsAsText(buttons) {
    let result = '📱 <b>Available Actions:</b>\n';
    buttons.forEach(row => {
      result += '\n';
      row.forEach(btn => {
        result += `• <b>${btn.text}</b> (click to execute)\n`;
      });
    });
    return result;
  }

  async handleButtonCallback(callbackData, fromUser, chatRoom) {
    try {
      console.log(`🖱️ Bot button clicked: ${callbackData} by ${fromUser}`);
      
      if (callbackData === 'main_menu') {
        await this.showMainMenu([], fromUser, chatRoom);
      }
      else if (callbackData === 'stats') {
        await this.showStats([], fromUser, chatRoom);
      }
      else if (callbackData === 'list_users') {
        await this.listUsers([], fromUser, chatRoom);
      }
      else if (callbackData === 'credit_menu') {
        await this.sendButtonMessage(chatRoom,
          '💰 <b>Credit User</b>\n\nPlease enter the user email and amount using:\n/credit email@example.com 100\n\nOr select a user from the list:',
          this.getUserSelectionMenu()
        );
      }
      else if (callbackData === 'investments') {
        await this.showInvestmentsSummary(chatRoom);
      }
      else if (callbackData === 'broadcast_menu') {
        await this.sendButtonMessage(chatRoom,
          '📢 <b>Broadcast Menu</b>\n\nChoose broadcast type:',
          this.getBroadcastMenu()
        );
      }
      else if (callbackData === 'telegram_status') {
        await this.showTelegramStatus([], fromUser, chatRoom);
      }
      else if (callbackData === 'help') {
        await this.showHelp([], fromUser, chatRoom);
      }
      else if (callbackData === 'broadcast_test') {
        await this.sendBotMessage(chatRoom, '📢 This is a test broadcast message!');
      }
      else if (callbackData === 'broadcast_all') {
        await this.sendButtonMessage(chatRoom,
          '📢 <b>Send Broadcast to All Users</b>\n\nPlease type your broadcast message:',
          [[{ text: '🔙 Cancel', callback_data: 'broadcast_menu' }]]
        );
        // Store state for next message
        this.activeMenus.set(fromUser, { action: 'awaiting_broadcast', type: 'all' });
      }
      else if (callbackData === 'broadcast_active') {
        await this.sendButtonMessage(chatRoom,
          '📢 <b>Send Broadcast to Active Users Only</b>\n\nPlease type your broadcast message:',
          [[{ text: '🔙 Cancel', callback_data: 'broadcast_menu' }]]
        );
        this.activeMenus.set(fromUser, { action: 'awaiting_broadcast', type: 'active' });
      }
      else if (callbackData.startsWith('balance_')) {
        const email = callbackData.replace('balance_', '');
        await this.getUserBalance([email], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('credit_')) {
        const email = callbackData.replace('credit_', '');
        await this.sendButtonMessage(chatRoom,
          `💰 <b>Credit User: ${email}</b>\n\nSelect amount:`,
          this.getCreditAmountMenu(email)
        );
      }
      else if (callbackData.startsWith('credit_amount_')) {
        const parts = callbackData.split('_');
        const email = parts[2];
        const amount = parseInt(parts[3]);
        await this.creditUser([email, amount.toString()], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('credit_custom_')) {
        const email = callbackData.replace('credit_custom_', '');
        await this.sendButtonMessage(chatRoom,
          `💰 <b>Custom Credit for ${email}</b>\n\nPlease enter amount:`,
          [[{ text: '🔙 Cancel', callback_data: `credit_${email}` }]]
        );
        this.activeMenus.set(fromUser, { action: 'awaiting_custom_credit', email });
      }
      else if (callbackData.startsWith('transactions_')) {
        const email = callbackData.replace('transactions_', '');
        await this.getUserTransactions([email], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('user_investments_')) {
        const email = callbackData.replace('user_investments_', '');
        await this.getUserInvestments([email], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('activate_')) {
        const email = callbackData.replace('activate_', '');
        await this.activateUser([email], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('deactivate_')) {
        const email = callbackData.replace('deactivate_', '');
        await this.deactivateUser([email], fromUser, chatRoom);
      }
      else if (callbackData.startsWith('user_menu_')) {
        const email = callbackData.replace('user_menu_', '');
        await this.sendButtonMessage(chatRoom,
          `👤 <b>User Actions: ${email}</b>`,
          this.getUserActionsMenu(email)
        );
      }
      
    } catch (error) {
      console.error('Button callback error:', error);
      await this.sendBotMessage(chatRoom, '❌ Error processing button action');
    }
  }

  getUserSelectionMenu() {
    // This would normally list users, but for now return a simple menu
    return [
      [{ text: '🔍 Search User', callback_data: 'search_user' }],
      [{ text: '🔙 Back', callback_data: 'main_menu' }]
    ];
  }

  async showInvestmentsSummary(chatRoom) {
    try {
      const investments = await readInvestments();
      const running = investments.filter(i => i.status === 'running');
      const completed = investments.filter(i => i.status === 'completed');
      
      let text = '📈 <b>Investment Summary</b>\n\n';
      text += `💰 <b>Total Invested:</b> ${investments.reduce((sum, i) => sum + i.amount, 0)}€\n`;
      text += `💎 <b>Running:</b> ${running.length}\n`;
      text += `✅ <b>Completed:</b> ${completed.length}\n\n`;
      
      if (running.length > 0) {
        text += '⏳ <b>Recent Active Investments:</b>\n';
        running.slice(0, 5).forEach(i => {
          const daysLeft = Math.ceil((new Date(i.completeDate) - new Date()) / (1000 * 60 * 60 * 24));
          text += `• ${i.fullName}: ${i.amount}€ (${daysLeft} days left)\n`;
        });
      }
      
      await this.sendButtonMessage(chatRoom, text, this.getMainMenuButtons());
    } catch (error) {
      console.error('Investment summary error:', error);
      await this.sendBotMessage(chatRoom, '❌ Error loading investments');
    }
  }

  async showHelp(args, fromUser, chatRoom) {
    const helpText = `
🤖 <b>Support Bot Commands & Features</b>

📋 <b>Available Commands:</b>
/help - Show this help message
/menu - Show main menu with buttons
/users - List all users
/stats - Show system statistics
/balance [email/phone] - Get user balance
/credit [email/phone] [amount] - Credit user account
/transactions [email/phone] - Get user transactions
/investments [email/phone] - Get user investments
/deactivate [email/phone] - Deactivate user
/activate [email/phone] - Activate user
/broadcast [message] - Broadcast to all users
/clear - Clear chat history
/telegram - Show Telegram bot status

🎯 <b>Button Features:</b>
• Click on any button below to execute actions
• User menu shows all available actions for a specific user
• Quick credit amounts for easy crediting
• Broadcast options for system messages

📱 <b>Telegram Integration:</b>
• Remote monitoring via Telegram
• Receive notifications for all events
• Execute commands from Telegram
• Broadcast messages to users

<b>Type /menu to see the main menu with buttons!</b>
    `;
    
    await this.sendButtonMessage(chatRoom, helpText, this.getMainMenuButtons());
  }

  async showMainMenu(args, fromUser, chatRoom) {
    const menuText = `
🤖 <b>Support Bot Main Menu</b>

Welcome to the Delux Euro Wallet Support Bot!
Use the buttons below to navigate and execute actions.

<b>Quick Stats:</b>
• System is online and monitoring
• All admin functions available
• Real-time updates enabled
    `;
    
    await this.sendButtonMessage(chatRoom, menuText, this.getMainMenuButtons());
  }

  async showTelegramStatus(args, fromUser, chatRoom) {
    const status = telegramEnabled ? '✅ Active' : '❌ Inactive';
    const tokenStatus = TELEGRAM_BOT_TOKEN ? '✅ Configured' : '❌ Not configured';
    const chatIdStatus = TELEGRAM_CHAT_ID ? '✅ Configured' : '❌ Not configured';
    
    const statusText = `
🤖 <b>Telegram Bot Status</b>

• Status: ${status}
• Token: ${tokenStatus}
• Chat ID: ${chatIdStatus}

<b>Telegram Commands:</b>
/stats - System statistics
/users - List recent users
/balance [email] - Check balance
/credit [email] [amount] - Credit user
/broadcast [message] - Send broadcast
/investments - View investments

<b>To get your Chat ID:</b>
Send any message to your Telegram bot
The ID will appear in the server console
    `;
    
    await this.sendButtonMessage(chatRoom, statusText, this.getMainMenuButtons());
  }

  async showStats(args, fromUser, chatRoom) {
    try {
      const users = await readUsers();
      const investments = await readInvestments();
      const chats = await readChats();
      
      const activeUsers = users.filter(u => u.isActive !== false).length;
      const totalBalance = users.reduce((sum, u) => sum + (u.balance || 0), 0);
      const totalInvestments = investments.reduce((sum, i) => sum + (i.amount || 0), 0);
      
      const today = new Date().toDateString();
      const todayReg = users.filter(u => new Date(u.createdAt).toDateString() === today).length;
      
      const unreadMessages = chats.reduce((sum, chat) => {
        return sum + chat.messages.filter(m => !m.read).length;
      }, 0);

      const runningInvestments = investments.filter(i => i.status === 'running').length;
      const completedInvestments = investments.filter(i => i.status === 'completed').length;

      const statsText = `
📊 <b>System Statistics</b>

👥 <b>Users:</b>
• Total Users: ${users.length}
• Active Users: ${activeUsers}
• New Today: ${todayReg}
• Total Balance: ${totalBalance.toFixed(2)}€

💰 <b>Investments:</b>
• Total Invested: ${totalInvestments.toFixed(2)}€
• Running: ${runningInvestments}
• Completed: ${completedInvestments}

💬 <b>Messages:</b>
• Unread Messages: ${unreadMessages}
• Total Chats: ${chats.length}

📱 <b>System Status:</b>
• Bot: ✅ Active
• Socket.IO: ✅ Connected
• JSONBin: ✅ Online
• Telegram: ${telegramEnabled ? '✅' : '❌'}
      `;
      
      await this.sendButtonMessage(chatRoom, statsText, this.getMainMenuButtons());
    } catch (error) {
      console.error('Stats error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to load statistics');
    }
  }

  async listUsers(args, fromUser, chatRoom) {
    try {
      const users = await readUsers();
      const activeUsers = users.filter(u => u.isActive !== false);
      const inactiveUsers = users.filter(u => u.isActive === false);
      
      let userList = '📋 <b>User List:</b>\n\n';
      userList += `<b>Active Users (${activeUsers.length}):</b>\n`;
      activeUsers.slice(0, 10).forEach(u => {
        userList += `• <b>${u.fullName}</b> - ${u.email} - Balance: ${u.balance}€\n`;
      });
      
      if (activeUsers.length > 10) {
        userList += `... and ${activeUsers.length - 10} more active users\n`;
      }
      
      userList += `\n<b>Total Users:</b> ${users.length}\n`;
      userList += `<b>Inactive:</b> ${inactiveUsers.length}\n\n`;
      userList += `Click on a user below to manage them:`;
      
      // Create user selection buttons
      const userButtons = [];
      activeUsers.slice(0, 5).forEach(u => {
        userButtons.push([{ text: `${u.fullName} (${u.balance}€)`, callback_data: `user_menu_${u.email}` }]);
      });
      userButtons.push([{ text: '🔙 Main Menu', callback_data: 'main_menu' }]);
      
      await this.sendButtonMessage(chatRoom, userList, userButtons);
    } catch (error) {
      console.error('List users error:', error);
      await this.sendButtonMessage(chatRoom, '❌ Failed to load users', this.getMainMenuButtons());
    }
  }

  async creditUser(args, fromUser, chatRoom) {
    if (args.length < 2) {
      await this.sendButtonMessage(chatRoom, 
        '❌ Please provide email/phone and amount\nExample: /credit user@example.com 100',
        this.getMainMenuButtons()
      );
      return;
    }

    const identifier = args[0];
    const amount = parseFloat(args[1]);

    if (isNaN(amount) || amount <= 0) {
      await this.sendBotMessage(chatRoom, '❌ Invalid amount. Please enter a positive number.');
      return;
    }

    try {
      const users = await readUsers();
      const userIndex = users.findIndex(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (userIndex === -1) {
        await this.sendButtonMessage(chatRoom, `❌ User not found: ${identifier}`, this.getMainMenuButtons());
        return;
      }

      users[userIndex].balance += amount;
      
      if (!users[userIndex].transactions) users[userIndex].transactions = [];
      users[userIndex].transactions.push({
        type: "Credit (Bot)",
        amount: amount,
        date: new Date().toISOString(),
        description: `Bot credited account with ${amount}€`,
        balanceAfterTransaction: users[userIndex].balance
      });

      await saveUsers(users);

      // Send notification
      await this.sendButtonMessage(chatRoom, 
        `✅ <b>Successfully credited ${amount}€ to ${users[userIndex].fullName}</b>\n\n` +
        `New balance: ${users[userIndex].balance}€`,
        this.getUserActionsMenu(users[userIndex].email)
      );

      // Notify user
      const userRoom = `user:${users[userIndex].email}`;
      this.io.to(userRoom).emit('notification', {
        type: 'credit',
        message: `Your account has been credited with ${amount}€ by Support Bot. New balance: ${users[userIndex].balance}€`
      });

      // Send ntfy notification
      sendNtfyRegistration(
        'Bot Credit',
        `User: ${users[userIndex].fullName}\nAmount: ${amount}€\nNew Balance: ${users[userIndex].balance}€`,
        3
      ).catch(err => console.error('Bot credit notification error:', err));

      // Send Telegram notification
      if (telegramEnabled) {
        sendTelegramNotification(`
💰 <b>Bot Credit</b>

👤 <b>User:</b> ${users[userIndex].fullName}
📧 <b>Email:</b> ${users[userIndex].email}
💵 <b>Amount:</b> ${amount}€
💳 <b>New Balance:</b> ${users[userIndex].balance}€
👑 <b>By:</b> ${fromUser}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
        `).catch(err => console.error('Telegram credit notification error:', err));
      }

    } catch (error) {
      console.error('Credit user error:', error);
      await this.sendButtonMessage(chatRoom, '❌ Failed to credit user', this.getMainMenuButtons());
    }
  }

  async deactivateUser(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /deactivate <email/phone>');
      return;
    }

    const identifier = args[0];

    try {
      const users = await readUsers();
      const userIndex = users.findIndex(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (userIndex === -1) {
        await this.sendBotMessage(chatRoom, `❌ User not found: ${identifier}`);
        return;
      }

      users[userIndex].isActive = false;
      await saveUsers(users);

      await this.sendButtonMessage(chatRoom, 
        `✅ User ${users[userIndex].fullName} has been deactivated`,
        this.getUserActionsMenu(users[userIndex].email)
      );

      // Notify user
      const userRoom = `user:${users[userIndex].email}`;
      this.io.to(userRoom).emit('notification', {
        type: 'account',
        message: 'Your account has been deactivated. Please contact support.'
      });

      // Send Telegram notification
      if (telegramEnabled) {
        sendTelegramNotification(`
⚠️ <b>User Deactivated</b>

👤 <b>User:</b> ${users[userIndex].fullName}
📧 <b>Email:</b> ${users[userIndex].email}
📱 <b>Phone:</b> ${users[userIndex].phoneNumber}
👑 <b>By:</b> ${fromUser}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
        `).catch(err => console.error('Telegram deactivation notification error:', err));
      }

    } catch (error) {
      console.error('Deactivate user error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to deactivate user');
    }
  }

  async activateUser(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /activate <email/phone>');
      return;
    }

    const identifier = args[0];

    try {
      const users = await readUsers();
      const userIndex = users.findIndex(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (userIndex === -1) {
        await this.sendBotMessage(chatRoom, `❌ User not found: ${identifier}`);
        return;
      }

      users[userIndex].isActive = true;
      await saveUsers(users);

      await this.sendButtonMessage(chatRoom, 
        `✅ User ${users[userIndex].fullName} has been activated`,
        this.getUserActionsMenu(users[userIndex].email)
      );

      // Notify user
      const userRoom = `user:${users[userIndex].email}`;
      this.io.to(userRoom).emit('notification', {
        type: 'account',
        message: 'Your account has been activated!'
      });

      // Send Telegram notification
      if (telegramEnabled) {
        sendTelegramNotification(`
✅ <b>User Activated</b>

👤 <b>User:</b> ${users[userIndex].fullName}
📧 <b>Email:</b> ${users[userIndex].email}
📱 <b>Phone:</b> ${users[userIndex].phoneNumber}
👑 <b>By:</b> ${fromUser}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
        `).catch(err => console.error('Telegram activation notification error:', err));
      }

    } catch (error) {
      console.error('Activate user error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to activate user');
    }
  }

  async getUserBalance(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /balance <email/phone>');
      return;
    }

    const identifier = args[0];

    try {
      const users = await readUsers();
      const user = users.find(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (!user) {
        await this.sendBotMessage(chatRoom, `❌ User not found: ${identifier}`);
        return;
      }

      await this.sendButtonMessage(chatRoom, 
        `💰 <b>Balance for ${user.fullName}</b>\n\n` +
        `Email: ${user.email}\n` +
        `Phone: ${user.phoneNumber}\n` +
        `Balance: ${user.balance}€\n` +
        `Status: ${user.isActive ? '✅ Active' : '❌ Inactive'}`,
        this.getUserActionsMenu(user.email)
      );

    } catch (error) {
      console.error('Get balance error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to get user balance');
    }
  }

  async getUserTransactions(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /transactions <email/phone>');
      return;
    }

    const identifier = args[0];

    try {
      const users = await readUsers();
      const user = users.find(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (!user) {
        await this.sendBotMessage(chatRoom, `❌ User not found: ${identifier}`);
        return;
      }

      const transactions = user.transactions || [];
      const recentTransactions = transactions.slice(-5).reverse();

      let transText = `📊 <b>Recent Transactions for ${user.fullName}</b>\n\n`;
      
      if (recentTransactions.length === 0) {
        transText += 'No transactions found.';
      } else {
        recentTransactions.forEach(t => {
          transText += `• ${new Date(t.date).toLocaleDateString()}: ${t.type} - ${t.amount}€\n`;
          if (t.description) transText += `  ${t.description}\n`;
        });
      }

      transText += `\n<b>Total Transactions:</b> ${transactions.length}`;
      
      await this.sendButtonMessage(chatRoom, transText, this.getUserActionsMenu(user.email));

    } catch (error) {
      console.error('Get transactions error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to get transactions');
    }
  }

  async getUserInvestments(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /investments <email/phone>');
      return;
    }

    const identifier = args[0];

    try {
      const investments = await readInvestments();
      const userInvestments = investments.filter(i => i.email === identifier);
      
      if (userInvestments.length === 0) {
        await this.sendButtonMessage(chatRoom, 
          `No investments found for ${identifier}`,
          this.getMainMenuButtons()
        );
        return;
      }

      let investText = `📈 <b>Investments for ${identifier}</b>\n\n`;
      const now = new Date();

      userInvestments.forEach(inv => {
        const isCompleted = new Date(inv.completeDate) <= now;
        const daysLeft = isCompleted ? 0 : Math.ceil((new Date(inv.completeDate) - now) / (1000 * 60 * 60 * 24));
        
        investText += `• Amount: ${inv.amount}€\n`;
        investText += `  Return: ${inv.returnAmount}€\n`;
        investText += `  Duration: ${inv.duration} days\n`;
        investText += `  Status: ${isCompleted ? '✅ Completed' : '⏳ Running'}\n`;
        if (!isCompleted) investText += `  Days Left: ${daysLeft}\n`;
        investText += `  Start: ${new Date(inv.startDate).toLocaleDateString()}\n\n`;
      });

      await this.sendButtonMessage(chatRoom, investText, this.getUserActionsMenu(identifier));

    } catch (error) {
      console.error('Get investments error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to get investments');
    }
  }

  async broadcastMessage(args, fromUser, chatRoom) {
    if (args.length < 1) {
      await this.sendBotMessage(chatRoom, '❌ Usage: /broadcast <message>');
      return;
    }

    const message = args.join(' ');

    try {
      const users = await readUsers();
      const activeUsers = users.filter(u => u.isActive !== false);
      
      // Send to all active users via their rooms
      activeUsers.forEach(user => {
        const userRoom = `user:${user.email}`;
        this.io.to(userRoom).emit('notification', {
          type: 'broadcast',
          message: `📢 <b>Broadcast Message:</b>\n${message}`,
          from: 'Support Bot'
        });
      });

      await this.sendButtonMessage(chatRoom, 
        `✅ Broadcast sent to ${activeUsers.length} active users`,
        this.getMainMenuButtons()
      );

      // Send ntfy notification
      sendNtfyChat(
        'Bot Broadcast',
        `Message: ${message}\nRecipients: ${activeUsers.length} users`,
        3
      ).catch(err => console.error('Broadcast notification error:', err));

      // Send Telegram notification
      if (telegramEnabled) {
        sendTelegramNotification(`
📢 <b>Bot Broadcast</b>

📝 <b>Message:</b> ${message}
👥 <b>Recipients:</b> ${activeUsers.length} users
👑 <b>By:</b> ${fromUser}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
        `).catch(err => console.error('Telegram broadcast notification error:', err));
      }

    } catch (error) {
      console.error('Broadcast error:', error);
      await this.sendButtonMessage(chatRoom, '❌ Failed to send broadcast', this.getMainMenuButtons());
    }
  }

  async clearChat(args, fromUser, chatRoom) {
    try {
      const chats = await readChats();
      const conversation = chats.find(c => c.id === chatRoom);
      
      if (conversation) {
        conversation.messages = conversation.messages.filter(m => m.from === 'system');
        conversation.lastUpdated = new Date().toISOString();
        await saveChats(chats);
      }

      await this.sendButtonMessage(chatRoom, '✅ Chat history cleared', this.getMainMenuButtons());
    } catch (error) {
      console.error('Clear chat error:', error);
      await this.sendBotMessage(chatRoom, '❌ Failed to clear chat');
    }
  }

  async sendBotMessage(roomId, message) {
    try {
      const botMessage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
        from: this.botUserId,
        to: roomId.split('_').find(p => p !== this.botUserId) || 'admin',
        message: message,
        timestamp: new Date().toISOString(),
        read: false,
        isBot: true
      };

      // Save to database
      const chats = await readChats();
      let conversation = chats.find(c => c.id === roomId);
      
      if (conversation) {
        conversation.messages.push(botMessage);
        conversation.lastUpdated = new Date().toISOString();
        await saveChats(chats);
      } else {
        // Create new conversation
        const participants = roomId.split('_');
        conversation = {
          id: roomId,
          participants: participants,
          messages: [botMessage],
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        chats.push(conversation);
        await saveChats(chats);
      }

      // Emit via Socket.IO
      this.io.to(roomId).emit('new-message', botMessage);
      
      return botMessage;
    } catch (error) {
      console.error('Send bot message error:', error);
      return null;
    }
  }

  async handleIncomingMessage(message, fromUser, chatRoom) {
    // Check if this is a response to a previous menu action
    const activeMenu = this.activeMenus.get(fromUser);
    
    if (activeMenu) {
      if (activeMenu.action === 'awaiting_broadcast') {
        // Handle broadcast message
        await this.broadcastMessage([message], fromUser, chatRoom);
        this.activeMenus.delete(fromUser);
        return;
      }
      else if (activeMenu.action === 'awaiting_custom_credit') {
        // Handle custom credit amount
        const amount = parseFloat(message);
        if (!isNaN(amount) && amount > 0) {
          await this.creditUser([activeMenu.email, amount.toString()], fromUser, chatRoom);
        } else {
          await this.sendBotMessage(chatRoom, '❌ Invalid amount. Please enter a positive number.');
        }
        this.activeMenus.delete(fromUser);
        return;
      }
    }
    
    // Check if message starts with command prefix
    if (message.startsWith('/')) {
      await this.processCommand(message, fromUser, chatRoom);
      return;
    }

    // Check for button-like text (simulate button clicks)
    const buttonActions = {
      '📊 Statistics': 'stats',
      '👥 Users': 'list_users',
      '💰 Credit User': 'credit_menu',
      '📈 Investments': 'investments',
      '📢 Broadcast': 'broadcast_menu',
      '🤖 Telegram Status': 'telegram_status',
      '❓ Help': 'help',
      '🔙 Main Menu': 'main_menu'
    };

    if (buttonActions[message]) {
      await this.handleButtonCallback(buttonActions[message], fromUser, chatRoom);
      return;
    }

    // Auto-respond to common queries
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      await this.sendButtonMessage(chatRoom, 
        `Hello! 👋 I'm the Support Bot. How can I help you today?\n\nUse the buttons below or type /menu to see all options.`,
        this.getMainMenuButtons()
      );
    }
    else if (lowerMsg.includes('balance') || lowerMsg.includes('how much')) {
      await this.sendButtonMessage(chatRoom, 
        `To check a user's balance, use:\n/balance [email]\n\nOr select a user from the list:`,
        [[{ text: '👥 View Users', callback_data: 'list_users' }], [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]]
      );
    }
    else if (lowerMsg.includes('credit') || lowerMsg.includes('add money')) {
      await this.sendButtonMessage(chatRoom, 
        `To credit a user account:\n/credit [email] [amount]\n\nExample: /credit user@example.com 100\n\nOr use the quick credit menu:`,
        [[{ text: '💰 Credit User', callback_data: 'credit_menu' }], [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]]
      );
    }
    else if (lowerMsg.includes('invest') || lowerMsg.includes('investment')) {
      await this.sendButtonMessage(chatRoom, 
        `💎 <b>Investment Information</b>\n\n` +
        `• Minimum investment: 100€\n` +
        `• Returns: 3x your investment\n` +
        `• Use the Investments page to start\n` +
        `• Check status with: /investments [email]\n\n` +
        `View current investments:`,
        [[{ text: '📈 View Investments', callback_data: 'investments' }], [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]]
      );
    }
    else if (lowerMsg.includes('card') || lowerMsg.includes('withdraw')) {
      await this.sendButtonMessage(chatRoom, 
        `💳 <b>Card & Withdrawal Info</b>\n\n` +
        `• Add cards in the Cards section\n` +
        `• Minimum withdrawal: 100€\n` +
        `• Withdraw to card or bank\n` +
        `• Check balance first with /balance`,
        this.getMainMenuButtons()
      );
    }
    else if (lowerMsg.includes('thank')) {
      await this.sendButtonMessage(chatRoom, 
        `You're welcome! 😊 Let me know if you need anything else.`,
        this.getMainMenuButtons()
      );
    }
    else if (lowerMsg.includes('help')) {
      await this.showHelp([], fromUser, chatRoom);
    }
    else {
      // Default response with menu
      await this.sendButtonMessage(chatRoom, 
        `I'm not sure how to help with that. Please use the buttons below or type /menu to see available options.`,
        this.getMainMenuButtons()
      );
    }
  }
}

// Create bot instance
let adminBot;

// ==================== SOCKET.IO WITH SESSION ====================
// Wrap session middleware for Socket.IO
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// Socket.IO authentication middleware
io.use((socket, next) => {
  const session = socket.request.session;
  if (session && session.user) {
    socket.userId = session.user;
    socket.userName = session.userName;
    socket.isAdmin = session.isAdmin || false;
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.userId} (${socket.userName}) - Admin: ${socket.isAdmin}`);

  // Join user to their personal room
  socket.join(`user:${socket.userId}`);
  
  // If admin, join admin room
  if (socket.isAdmin) {
    socket.join('admin');
    console.log('👑 Admin joined admin room');
  }

  // Handle joining a chat room with a specific user
  socket.on('join-chat', (otherUserId) => {
    const roomId = [socket.userId, otherUserId].sort().join('_');
    socket.join(roomId);
    console.log(`🚪 User ${socket.userId} joined room ${roomId}`);
    
    // If joining bot chat, send welcome message with buttons
    if (otherUserId === adminBot.botUserId) {
      setTimeout(() => {
        adminBot.sendButtonMessage(roomId, 
          `👋 Hello! I'm the Support Bot. I'm here to help!\n\nUse the buttons below to navigate:`,
          adminBot.getMainMenuButtons()
        );
      }, 500);
    }
  });

  // Handle sending messages
  socket.on('send-message', async (data) => {
    try {
      const { to, message } = data;
      const from = socket.userId;

      console.log(`📨 Message from ${from} to ${to}: ${message}`);

      // Get users and admin info
      const users = await readUsers();
      const adminSettings = await readAdminSettings();
      const admin = adminSettings[0];

      // Validate recipient exists
      let recipientExists = false;
      let recipientName = '';
      
      // Check if sending to bot
      if (to === adminBot.botUserId) {
        recipientExists = true;
        recipientName = adminBot.botUserName;
      }
      // Check if sending to admin
      else if (to === admin.email || to === admin.phone) {
        recipientExists = true;
        recipientName = admin.fullName;
      } else {
        // Check if sending to a regular user
        const recipient = users.find(u => u.email === to || u.phoneNumber === to);
        if (recipient) {
          recipientExists = true;
          recipientName = recipient.fullName;
        }
      }
      
      if (!recipientExists) {
        socket.emit('error', { message: 'Recipient not found' });
        return;
      }

      // Create chat ID (sorted to ensure consistency)
      const chatId = [from, to].sort().join('_');
      let chats = await readChats();
      
      // Find or create conversation
      let conversation = chats.find(c => c.id === chatId);
      
      if (!conversation) {
        conversation = {
          id: chatId,
          participants: [from, to],
          messages: [],
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        chats.push(conversation);
      }

      // Create new message
      const newMessage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
        from,
        to,
        message,
        timestamp: new Date().toISOString(),
        read: false
      };

      conversation.messages.push(newMessage);
      conversation.lastUpdated = new Date().toISOString();
      
      await saveChats(chats);

      // Emit to the specific room
      const roomId = [from, to].sort().join('_');
      io.to(roomId).emit('new-message', newMessage);

      // Also emit to personal rooms for notifications
      io.to(`user:${to}`).emit('notification', {
        type: 'new-message',
        from,
        message: message.substring(0, 50),
        unreadCount: await getUnreadCount(to)
      });

      // If message involves admin, emit to admin room
      if (to === admin.email || to === admin.phone || from === admin.email || from === admin.phone) {
        io.to('admin').emit('admin-notification', {
          type: 'new-message',
          from,
          to,
          message: message.substring(0, 50)
        });

        // Send ntfy notification
        const sender = users.find(u => u.email === from) || { fullName: from };
        const senderName = sender.fullName || from;
        
        sendNtfyChat(
          'New Chat Message',
          `From: ${senderName} (${from})\nTo: ${to === admin.email ? 'Admin' : to}\nMessage: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}\nTime: ${new Date().toLocaleString()}`,
          3
        ).catch(err => console.error('Background chat notification error:', err));
      }

      // If message is to bot, process it with button interface
      if (to === adminBot.botUserId) {
        await adminBot.handleIncomingMessage(message, from, roomId);
      }

      // Confirm to sender
      socket.emit('message-sent', { success: true, message: newMessage });

    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle button clicks (simulated via special messages)
  socket.on('bot-button-click', async (data) => {
    try {
      const { callbackData, roomId } = data;
      const fromUser = socket.userId;
      
      if (adminBot) {
        await adminBot.handleButtonCallback(callbackData, fromUser, roomId);
      }
    } catch (error) {
      console.error('Bot button click error:', error);
    }
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { to, isTyping } = data;
    const roomId = [socket.userId, to].sort().join('_');
    socket.to(roomId).emit('user-typing', {
      from: socket.userId,
      isTyping
    });
  });

  // Handle marking messages as read
  socket.on('mark-read', async (data) => {
    try {
      const { otherUser } = data;
      const currentUser = socket.userId;

      const chatId = [currentUser, otherUser].sort().join('_');
      const chats = await readChats();
      
      const conversation = chats.find(c => c.id === chatId);
      
      if (conversation) {
        let messagesUpdated = false;
        conversation.messages = conversation.messages.map(msg => {
          if (msg.to === currentUser && !msg.read) {
            msg.read = true;
            messagesUpdated = true;
          }
          return msg;
        });

        if (messagesUpdated) {
          await saveChats(chats);
          
          // Notify the other user that messages were read
          const roomId = [currentUser, otherUser].sort().join('_');
          io.to(roomId).emit('messages-read', {
            by: currentUser,
            timestamp: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Mark read error:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`🔌 User disconnected: ${socket.userId}`);
  });
});

// Helper function to get unread count for a user
async function getUnreadCount(userId) {
  try {
    const chats = await readChats();
    let unreadCount = 0;

    chats.forEach(conversation => {
      if (conversation.participants && conversation.participants.includes(userId)) {
        const unread = conversation.messages.filter(m => m.to === userId && !m.read).length;
        unreadCount += unread;
      }
    });

    return unreadCount;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

// ==================== JSONBIN HELPER FUNCTIONS ====================

async function readJSONBin(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Bin not found at ${url}, creating empty array`);
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.record || [];
  } catch (error) {
    console.error('Error reading from JSONBin:', error.message);
    return [];
  }
}

async function writeJSONBin(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error writing to JSONBin:', error.message);
    return null;
  }
}

async function readUsers() {
  return await readJSONBin(USERS_URL);
}

async function saveUsers(users) {
  return await writeJSONBin(USERS_URL, users);
}

async function readTransactions() {
  return await readJSONBin(TRANSACTIONS_URL);
}

async function saveTransactions(transactions) {
  return await writeJSONBin(TRANSACTIONS_URL, transactions);
}

async function readInvestments() {
  return await readJSONBin(INVESTMENTS_URL);
}

async function saveInvestments(investments) {
  return await writeJSONBin(INVESTMENTS_URL, investments);
}

async function readCards() {
  return await readJSONBin(CARDS_URL);
}

async function saveCards(cards) {
  return await writeJSONBin(CARDS_URL, cards);
}

async function readChats() {
  return await readJSONBin(CHATS_URL);
}

async function saveChats(chats) {
  return await writeJSONBin(CHATS_URL, chats);
}

async function readAdminSettings() {
  return await readJSONBin(ADMIN_URL);
}

async function saveAdminSettings(settings) {
  return await writeJSONBin(ADMIN_URL, settings);
}

// Initialize admin user and bot
async function initializeAdmin() {
  try {
    let adminSettings = await readAdminSettings();
    
    if (!adminSettings || adminSettings.length === 0) {
      adminSettings = [{
        phone: ADMIN_PHONE,
        pin: ADMIN_PIN,
        fullName: 'System Administrator',
        email: ADMIN_EMAIL,
        createdAt: new Date().toISOString()
      }];
      await saveAdminSettings(adminSettings);
      console.log('✅ Admin user initialized');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// Get admin info
async function getAdminInfo() {
  const adminSettings = await readAdminSettings();
  return adminSettings[0] || { phone: ADMIN_PHONE, fullName: 'Admin', email: ADMIN_EMAIL };
}

async function logTransaction(email, type, amount) {
  try {
    const transactions = await readTransactions();
    const transaction = { 
      email, 
      type, 
      amount, 
      date: new Date().toISOString() 
    };
    
    transactions.push(transaction);
    await saveTransactions(transactions);
  } catch (error) {
    console.error('Error logging transaction:', error.message);
  }
}

// Test JSONBin connection
async function testJSONBinConnection() {
  try {
    console.log('Testing JSONBin connection...');
    
    const users = await readUsers();
    console.log(`✓ Users bin connection successful. Found ${users.length} users.`);
    
    const transactions = await readTransactions();
    console.log(`✓ Transactions bin connection successful. Found ${transactions.length} transactions.`);
    
    const investments = await readInvestments();
    console.log(`✓ Investments bin connection successful. Found ${investments.length} investments.`);
    
    let cards = await readCards();
    if (cards.length === 0 && !Array.isArray(cards)) {
      console.log('Cards bin empty or not found, initializing with empty array...');
      cards = [];
      await saveCards(cards);
    }
    console.log(`✓ Cards bin connection successful. Found ${cards.length} cards.`);
    
    let chats = await readChats();
    if (!Array.isArray(chats)) {
      chats = [];
      await saveChats(chats);
    }
    console.log(`✓ Chats bin connection successful. Found ${chats.length} conversations.`);
    
    let admin = await readAdminSettings();
    if (!Array.isArray(admin)) {
      admin = [];
      await saveAdminSettings(admin);
    }
    console.log(`✓ Admin bin connection successful.`);
    
    return true;
  } catch (error) {
    console.error('✗ JSONBin connection test failed:', error.message);
    return false;
  }
}

// ==================== AUTHENTICATION ROUTES ====================

// Register
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, pin } = req.body;
    
    if (!fullName || !email || !phoneNumber || !pin) {
      return res.send("All fields are required.");
    }
    
    let users = await readUsers();

    if (users.find(u => u.email === email || u.phoneNumber === phoneNumber)) {
      return res.send("Email or phone number already registered.");
    }

    const newUser = {
      fullName,
      email,
      phoneNumber,
      pin,
      balance: 1800,
      profile: {
        address: '',
        city: '',
        country: '',
        postalCode: '',
        defaultWithdrawCardId: null
      },
      cards: [],
      transactions: [
        {
          type: 'Credit',
          description: 'Delux Welcome Bonus',
          amount: 1800,
          date: new Date().toLocaleString(),
          balanceAfterTransaction: 1800,
        }
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    users.push(newUser);
    await saveUsers(users);

    // Send ntfy notification
    sendNtfyRegistration(
      'New User Registered',
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nTime: ${new Date().toLocaleString()}`,
      4
    ).catch(err => console.error('Background notification error:', err));

    // Send bot welcome message with buttons
    setTimeout(async () => {
      try {
        const chatId = [email, adminBot.botUserId].sort().join('_');
        let chats = await readChats();
        
        let conversation = chats.find(c => c.id === chatId);
        if (!conversation) {
          conversation = {
            id: chatId,
            participants: [email, adminBot.botUserId],
            messages: [],
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          chats.push(conversation);
          await saveChats(chats);
        }

        const welcomeMessage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
          from: adminBot.botUserId,
          to: email,
          message: `🎉 Welcome to Delux Euro Wallet, ${fullName}!\n\n` +
                  `I'm the Support Bot, here to help you get started.\n\n` +
                  `**Quick Start Guide:**\n` +
                  `• Your welcome bonus of 1800€ is ready!\n` +
                  `• Add a card in the Cards section\n` +
                  `• Start investing with 3x returns\n` +
                  `• Chat with me anytime for help\n\n` +
                  `Use the buttons below to navigate:`,
          timestamp: new Date().toISOString(),
          read: false,
          isBot: true
        };

        conversation.messages.push(welcomeMessage);
        conversation.lastUpdated = new Date().toISOString();
        await saveChats(chats);

        io.to(`user:${email}`).emit('new-message', welcomeMessage);
        
        // Send main menu
        setTimeout(() => {
          adminBot.sendButtonMessage(chatId, 
            `What would you like to do?`,
            adminBot.getMainMenuButtons()
          );
        }, 1000);
      } catch (error) {
        console.error('Bot welcome message error:', error);
      }
    }, 1000);

    req.session.user = email;
    req.session.userName = fullName;
    req.session.isAdmin = false;

    res.send(`<h2>Registration Successful!</h2> 
              <p>Welcome ${fullName}!</p>
              <p>Your account has been created with a welcome bonus of 1800€.</p>
              <p>The Support Bot will help you get started with buttons.</p>
              <p>Redirecting to dashboard...</p> 
              <script>
                setTimeout(() => window.location.href = '/dashboard.html', 3000);
              </script>`);
  } catch (error) {
    console.error('Registration error:', error);
    res.send("Registration failed. Please try again.");
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, pin } = req.body;
    
    if (!email || !pin) {
      return res.send("Email and PIN are required.");
    }
    
    // Check if support bot login
    if (email === SUPPORT_EMAIL && pin === SUPPORT_PASSWORD) {
      req.session.user = adminBot.botUserId;
      req.session.userName = adminBot.botUserName;
      req.session.isAdmin = true;
      
      return res.send(`<h2>Support Bot Login Successful!</h2> 
                      <p>Welcome, ${adminBot.botUserName}!</p>
                      <p>Bot is now active with button interface.</p>
                      <p>Telegram integration: ${telegramEnabled ? '✅ Active' : '❌ Not configured'}</p>
                      <p>Redirecting to admin dashboard...</p> 
                      <script>
                        setTimeout(() => window.location.href = '/admin.html', 2000);
                      </script>`);
    }
    
    // Check if admin
    const adminSettings = await readAdminSettings();
    const admin = adminSettings[0];
    
    if (admin && (email === admin.email || email === admin.phone) && pin === admin.pin) {
      req.session.user = admin.email;
      req.session.userName = admin.fullName;
      req.session.isAdmin = true;
      
      // Send login notification
      sendNtfyLogin(
        'Admin Login',
        `Admin logged in: ${admin.fullName}\nTime: ${new Date().toLocaleString()}\nEmail: ${admin.email}`,
        3
      ).catch(err => console.error('Login notification error:', err));
      
      return res.send(`<h2>Admin Login Successful!</h2> 
                      <p>Welcome back, ${admin.fullName}!</p>
                      <p>The Support Bot is active with button interface.</p>
                      <p>Telegram integration: ${telegramEnabled ? '✅ Active' : '❌ Not configured'}</p>
                      <p>Redirecting to admin dashboard...</p> 
                      <script>
                        setTimeout(() => window.location.href = '/admin.html', 2000);
                      </script>`);
    }
    
    // Regular user login
    const users = await readUsers();
    const user = users.find(u => (u.email === email || u.phoneNumber === email) && u.pin === pin);

    if (!user) {
      return res.send("Invalid credentials. Please check your email/phone and PIN.");
    }
    
    if (!user.isActive) {
      return res.send("Your account has been deactivated. Please contact admin.");
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await saveUsers(users);

    req.session.user = user.email;
    req.session.userName = user.fullName;
    req.session.isAdmin = false;

    // Send login notification
    sendNtfyLogin(
      'User Login',
      `User logged in: ${user.fullName}\nTime: ${new Date().toLocaleString()}\nEmail: ${user.email}\nPhone: ${user.phoneNumber}`,
      2
    ).catch(err => console.error('Login notification error:', err));

    // Send bot greeting with menu
    setTimeout(async () => {
      try {
        const chatId = [user.email, adminBot.botUserId].sort().join('_');
        const chats = await readChats();
        const conversation = chats.find(c => c.id === chatId);
        
        if (conversation) {
          const greeting = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
            from: adminBot.botUserId,
            to: user.email,
            message: `👋 Welcome back, ${user.fullName}! Good to see you again.\n\n` +
                    `What would you like to do today?`,
            timestamp: new Date().toISOString(),
            read: false,
            isBot: true
          };

          conversation.messages.push(greeting);
          conversation.lastUpdated = new Date().toISOString();
          await saveChats(chats);

          io.to(`user:${user.email}`).emit('new-message', greeting);
          
          // Send main menu
          setTimeout(() => {
            adminBot.sendButtonMessage(chatId, 
              `Use the buttons below to navigate:`,
              adminBot.getMainMenuButtons()
            );
          }, 1000);
        }
      } catch (error) {
        console.error('Bot greeting error:', error);
      }
    }, 1000);

    res.send(`<h2>Login Successful!</h2> 
              <p>Welcome back, ${user.fullName}!</p>
              <p>Your current balance: ${user.balance}€</p>
              <p>The Support Bot is here to help with buttons.</p>
              <p>Redirecting to dashboard...</p> 
              <script>
                setTimeout(() => window.location.href = '/dashboard.html', 2000);
              </script>`);
  } catch (error) {
    console.error('Login error:', error);
    res.send("Login failed. Please try again.");
  }
});

// Check session status
app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ 
      loggedIn: true, 
      user: req.session.user,
      userName: req.session.userName,
      isAdmin: req.session.isAdmin || false
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout
app.get('/logout', (req, res) => {
  const userName = req.session.userName;
  const isAdmin = req.session.isAdmin;
  
  req.session.destroy(() => {
    if (userName) {
      console.log(`👋 User logged out: ${userName} (Admin: ${isAdmin})`);
    }
    res.redirect('/login.html');
  });
});

// ==================== USER DATA ROUTES ====================

// User Info
app.get('/user-info', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      fullName: user.fullName, 
      balance: user.balance,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile || {},
      cards: user.cards || [],
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isAdmin: req.session.isAdmin || false
    });
  } catch (error) {
    console.error('User info error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Cards
app.get('/user-cards', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ cards: user.cards || [] });
  } catch (error) {
    console.error('Get user cards error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// Transaction History
app.get('/transaction-history', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      transactions: user.transactions,
      user: {
        fullName: user.fullName,
        balance: user.balance
      }
    });
  } catch (error) {
    console.error('Transaction history error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user profile data
app.get('/profile-data', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      profile: user.profile || {},
      cards: user.cards || [],
      userInfo: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        balance: user.balance
      }
    });
  } catch (error) {
    console.error('Profile data error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// ==================== CARD MANAGEMENT ROUTES ====================

// Add New Card
app.post('/add-card', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { cardNumber, expiryDate, cvv, cardHolderName, cardType } = req.body;
    
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName || !cardType) {
      return res.send("All fields are required.");
    }

    // Validate card number
    const cleanCardNumber = cardNumber.replace(/\s+/g, '');
    if (cleanCardNumber.length < 15) {
      return res.send("Invalid card number.");
    }

    // Get users and find current user
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email === req.session.user);
    
    if (userIndex === -1) {
      return res.send("User not found. Please log in again.");
    }

    // Create new card object
    const newCard = {
      id: Date.now().toString(),
      cardNumber: cleanCardNumber,
      maskedNumber: `**** **** **** ${cleanCardNumber.slice(-4)}`,
      expiryDate,
      cvv,
      cardHolderName,
      cardType,
      status: 'pending',
      addedDate: new Date().toISOString(),
      otp: null
    };

    // Add card to user's cards array
    if (!users[userIndex].cards) {
      users[userIndex].cards = [];
    }
    
    users[userIndex].cards.push(newCard);
    
    // Save updated users
    await saveUsers(users);

    res.send(`<h2>Card Details Saved Successfully!</h2>
              <p>Your ${cardType} card ending in ${cleanCardNumber.slice(-4)} has been saved.</p>
              <p>Please enter the OTP sent to your registered phone/email to activate the card.</p>
              
              <form action="/save-card-otp" method="POST" style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <input type="hidden" name="cardId" value="${newCard.id}">
                <div style="margin-bottom: 15px;">
                  <label style="display: block; margin-bottom: 5px; font-weight: bold;">Enter OTP:</label>
                  <input type="text" name="otp" required 
                         style="padding: 10px; width: 300px; font-size: 16px;"
                         placeholder="Enter OTP here">
                </div>
                <button type="submit" style="padding: 10px 30px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  Submit OTP & Activate Card
                </button>
              </form>
              
              <p><a href="/cards.html" style="color: #007bff;">← Back to Cards</a></p>`);
  } catch (error) {
    console.error('Add card error:', error);
    res.send(`<h2>Error Adding Card</h2>
              <p>Failed to add card. Please try again.</p>
              <p><a href="/cards.html" style="color: #007bff;">← Back to Cards</a></p>`);
  }
});

// Save OTP to Card
app.post('/save-card-otp', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { cardId, otp } = req.body;
    
    if (!cardId || !otp) {
      return res.send("Card ID and OTP are required.");
    }

    // Get users and find current user
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email === req.session.user);
    
    if (userIndex === -1) {
      return res.send("User not found. Please log in again.");
    }

    // Find the card in user's cards
    const user = users[userIndex];
    const cardIndex = user.cards ? user.cards.findIndex(card => card.id === cardId) : -1;
    
    if (cardIndex === -1) {
      return res.send("Card not found. Please add the card again.");
    }

    // Update card with OTP and activate it
    user.cards[cardIndex].otp = otp;
    user.cards[cardIndex].status = 'active';
    user.cards[cardIndex].activatedDate = new Date().toISOString();
    
    // Save updated users
    await saveUsers(users);

    res.send(`<h2>Card Activated Successfully!</h2>
              <p>Your ${user.cards[cardIndex].cardType} card ending in ${user.cards[cardIndex].cardNumber.slice(-4)} has been activated.</p>
              <p>You can now use this card for withdrawals.</p>
              <p>Redirecting to cards page...</p>
              <script>
                setTimeout(() => window.location.href = '/cards.html', 3000);
              </script>`);
  } catch (error) {
    console.error('Save OTP error:', error);
    res.send(`<h2>Error Saving OTP</h2>
              <p>Failed to save OTP. Please try again.</p>
              <p><a href="/cards.html" style="color: #007bff;">← Back to Cards</a></p>`);
  }
});

// ==================== PROFILE ROUTES ====================

// Update Profile
app.post('/update-profile', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { address, city, country, postalCode, defaultWithdrawCardId } = req.body;
    
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email === req.session.user);
    
    if (userIndex === -1) {
      return res.send("User not found.");
    }

    // Update user profile
    users[userIndex].profile = {
      address: address || users[userIndex].profile?.address || '',
      city: city || users[userIndex].profile?.city || '',
      country: country || users[userIndex].profile?.country || '',
      postalCode: postalCode || users[userIndex].profile?.postalCode || '',
      defaultWithdrawCardId: defaultWithdrawCardId || users[userIndex].profile?.defaultWithdrawCardId || null
    };

    await saveUsers(users);

    res.send(`<h2>Profile Updated Successfully!</h2>
              <p>Your profile information has been saved.</p>
              <p>Redirecting to profile page...</p>
              <script>
                setTimeout(() => window.location.href = '/profile.html', 2000);
              </script>`);
  } catch (error) {
    console.error('Update profile error:', error);
    res.send("Failed to update profile. Please try again.");
  }
});

// ==================== TRANSACTION ROUTES ====================

// Withdraw to Card
app.post('/withdraw-to-card', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { amount, cardId } = req.body;
    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      return res.send("Invalid amount. Please enter a positive number.");
    }

    // Get user
    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);
    
    if (!user) {
      return res.send("User not found. Please log in again.");
    }

    // Get card from user's cards
    const card = user.cards?.find(c => c.id === cardId && c.status === 'active');
    
    if (!card) {
      return res.send("Card not found, not authorized, or not active.");
    }

    // Check balance
    if (user.balance < withdrawalAmount) {
      return res.send(`Insufficient funds. Your current balance is ${user.balance}€.`);
    }
    
    if (withdrawalAmount < 100) {
      return res.send("Minimum withdrawal amount is 100€.");
    }

    // Process withdrawal
    user.balance -= withdrawalAmount;
    user.transactions.push({ 
      type: "Withdrawal to Card", 
      amount: withdrawalAmount, 
      date: new Date().toISOString(),
      description: `Withdrawal of ${withdrawalAmount}€ to card ending in ${card.cardNumber.slice(-4)}`,
      balanceAfterTransaction: user.balance,
      cardDetails: {
        last4: card.cardNumber.slice(-4),
        cardType: card.cardType
      }
    });

    await saveUsers(users);
    await logTransaction(user.email, 'Withdrawal to Card', withdrawalAmount);

    res.send(`<h2>Withdrawal to Card Successful!</h2>
              <p>${withdrawalAmount}€ has been sent to your ${card.cardType} card ending in ${card.cardNumber.slice(-4)}.</p>
              <p>New balance: ${user.balance}€</p>
              <p>Redirecting to dashboard...</p>
              <script>
                setTimeout(() => window.location.href = '/dashboard.html', 4000);
              </script>`);
  } catch (error) {
    console.error('Withdraw to card error:', error);
    res.send("Withdrawal failed. Please try again.");
  }
});

// Wire Transfer
app.post('/wire', async (req, res) => {
  try {
    const { senderEmail, recipientEmail, amount } = req.body;
    const wireAmount = parseFloat(amount);

    if (!senderEmail || !recipientEmail || isNaN(wireAmount) || wireAmount <= 0) {
      return res.send("Invalid input. Please check all fields.");
    }

    let users = await readUsers();
    const sender = users.find(u => u.email === senderEmail);
    const recipient = users.find(u => u.email === recipientEmail);

    if (!sender) {
      return res.send("Invalid sender email. Account not found.");
    }

    if (!recipient) {
      return res.send("Invalid recipient email. Account not found.");
    }

    if (sender.balance < wireAmount) {
      return res.send(`Sender has insufficient funds. Current balance: ${sender.balance}€`);
    }

    sender.balance -= wireAmount;
    recipient.balance += wireAmount;

    const now = new Date().toISOString();

    sender.transactions.push({ 
      type: "Wire Sent", 
      to: recipientEmail, 
      amount: wireAmount, 
      date: now,
      description: `Wire transfer to ${recipientEmail}`,
      balanceAfterTransaction: sender.balance
    });
    
    recipient.transactions.push({ 
      type: "Wire Received", 
      from: senderEmail, 
      amount: wireAmount, 
      date: now,
      description: `Wire transfer from ${senderEmail}`,
      balanceAfterTransaction: recipient.balance
    });

    await saveUsers(users);
    await logTransaction(sender.email, 'Wire Sent', wireAmount);
    await logTransaction(recipient.email, 'Wire Received', wireAmount);

    res.send(`<h2>Wire Transfer Successful!</h2> 
              <p>${wireAmount}€ sent from ${senderEmail} to ${recipientEmail}.</p>
              <p>Sender's new balance: ${sender.balance}€</p>
              <p>Recipient's new balance: ${recipient.balance}€</p>
              <script>
                setTimeout(() => window.location.href = '/wire.html', 4000);
              </script>`);
  } catch (error) {
    console.error('Wire transfer error:', error);
    res.send("Wire transfer failed. Please try again.");
  }
});

// Withdraw (regular)
app.post('/withdraw', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { amount } = req.body;
    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      return res.send("Invalid amount. Please enter a positive number.");
    }

    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);

    if (!user) {
      return res.send("User not found. Please log in again.");
    }

    if (user.balance < withdrawalAmount) {
      return res.send(`Insufficient funds. Your current balance is ${user.balance}€.`);
    }
    
    if (withdrawalAmount < 100) {
      return res.send("Minimum withdrawal amount is 100€.");
    }

    user.balance -= withdrawalAmount;
    user.transactions.push({ 
      type: "Withdrawal", 
      amount: withdrawalAmount, 
      date: new Date().toISOString(),
      description: `Withdrawal of ${withdrawalAmount}€`,
      balanceAfterTransaction: user.balance
    });

    await saveUsers(users);
    await logTransaction(user.email, 'Withdrawal', withdrawalAmount);

    res.send(`<h2>Withdrawal Successful!</h2> 
              <p>${withdrawalAmount}€ has been debited from your account.</p>
              <p>New balance: ${user.balance}€</p>
              <p>Redirecting to transaction history...</p> 
              <script>
                setTimeout(() => window.location.href = '/transaction-history.html', 3000);
              </script>`);
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.send("Withdrawal failed. Please try again.");
  }
});

// ==================== INVESTMENT ROUTES ====================

// Invest
app.post('/invest', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { amount, duration } = req.body;
    const investAmount = parseFloat(amount);
    const investDays = parseInt(duration);

    if (isNaN(investAmount) || investAmount < 100) {
      return res.send("Minimum investment is 100€.");
    }

    if (isNaN(investDays) || investDays <= 0) {
      return res.send("Invalid duration. Please enter a positive number of days.");
    }

    const users = await readUsers();
    const user = users.find(u => u.email === req.session.user);

    if (!user) {
      return res.send("User not found. Please log in again.");
    }

    if (user.balance < investAmount) {
      return res.send(`Insufficient balance for investment. Your current balance is ${user.balance}€.`);
    }

    const investments = await readInvestments();
    const now = new Date();
    const completeDate = new Date(now);
    completeDate.setDate(completeDate.getDate() + investDays);
    const returnAmount = investAmount * 3;

    user.balance -= investAmount;
    user.transactions.push({ 
      type: "Investment", 
      amount: investAmount, 
      date: now.toISOString(),
      description: `Investment of ${investAmount}€ for ${investDays} days`,
      balanceAfterTransaction: user.balance
    });

    investments.push({
      email: user.email,
      fullName: user.fullName,
      amount: investAmount,
      returnAmount,
      duration: investDays,
      startDate: now.toISOString(),
      completeDate: completeDate.toISOString(),
      status: 'running'
    });

    await saveUsers(users);
    await saveInvestments(investments);
    await logTransaction(user.email, 'Investment', investAmount);

    // Bot notification about investment
    setTimeout(async () => {
      try {
        const chatId = [user.email, adminBot.botUserId].sort().join('_');
        const chats = await readChats();
        const conversation = chats.find(c => c.id === chatId);
        
        if (conversation) {
          const investMsg = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
            from: adminBot.botUserId,
            to: user.email,
            message: `💰 <b>Investment Confirmed!</b>\n\n` +
                    `You have successfully invested ${investAmount}€ for ${investDays} days.\n\n` +
                    `<b>Details:</b>\n` +
                    `• Amount: ${investAmount}€\n` +
                    `• Duration: ${investDays} days\n` +
                    `• Expected Return: ${returnAmount}€\n` +
                    `• Completion Date: ${completeDate.toLocaleDateString()}\n\n` +
                    `We'll notify you when your investment matures!`,
            timestamp: new Date().toISOString(),
            read: false,
            isBot: true
          };

          conversation.messages.push(investMsg);
          conversation.lastUpdated = new Date().toISOString();
          await saveChats(chats);

          io.to(`user:${user.email}`).emit('new-message', investMsg);
        }
      } catch (error) {
        console.error('Bot investment notification error:', error);
      }
    }, 1000);

    // Send Telegram notification
    if (telegramEnabled) {
      sendTelegramNotification(`
💰 <b>New Investment</b>

👤 <b>User:</b> ${user.fullName}
📧 <b>Email:</b> ${user.email}
💵 <b>Amount:</b> ${investAmount}€
📆 <b>Duration:</b> ${investDays} days
🎁 <b>Return:</b> ${returnAmount}€
📅 <b>Matures:</b> ${completeDate.toLocaleDateString()}
      `).catch(err => console.error('Telegram investment notification error:', err));
    }

    res.send(`<h2>Investment Started!</h2> 
              <p>You have invested ${investAmount}€ for ${investDays} days.</p>
              <p>Total Return: ${returnAmount}€ after ${investDays} days.</p>
              <p>Investment will complete on: ${completeDate.toLocaleDateString()}</p>
              <p>Loading...</p> 
              <script>
                setTimeout(() => window.location.href = '/investments.html', 5000);
              </script>`);
  } catch (error) {
    console.error('Investment error:', error);
    res.send("Investment failed. Please try again.");
  }
});

// My Investments
app.get('/my-investments', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const investments = await readInvestments();
    const userInvests = investments.filter(i => i.email === req.session.user);
    
    // Calculate current status for each investment
    const now = new Date();
    const processedInvests = userInvests.map(invest => {
      const isCompleted = new Date(invest.completeDate) <= now;
      return {
        ...invest,
        isCompleted,
        daysLeft: isCompleted ? 0 : Math.ceil((new Date(invest.completeDate) - now) / (1000 * 60 * 60 * 24))
      };
    });

    res.json({ investments: processedInvests });
  } catch (error) {
    console.error('My investments error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// Process Investments (Manual Trigger)
app.get('/process-investments', async (req, res) => {
  try {
    const investments = await readInvestments();
    const users = await readUsers();
    let changesMade = false;
    const now = new Date();
    let completedCount = 0;

    for (let invest of investments) {
      if (invest.status === 'running' && new Date(invest.completeDate) <= now) {
        invest.status = 'completed';
        const user = users.find(u => u.email === invest.email);
        if (user) {
          user.balance += invest.returnAmount;
          user.transactions.push({ 
            type: "Investment Return", 
            amount: invest.returnAmount, 
            date: now.toISOString(),
            description: `Investment return from ${invest.amount}€ investment`,
            balanceAfterTransaction: user.balance
          });
          await logTransaction(user.email, 'Investment Return', invest.returnAmount);
          changesMade = true;
          completedCount++;

          // Send bot notification
          setTimeout(async () => {
            try {
              const chatId = [user.email, adminBot.botUserId].sort().join('_');
              const chats = await readChats();
              const conversation = chats.find(c => c.id === chatId);
              
              if (conversation) {
                const returnMsg = {
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
                  from: adminBot.botUserId,
                  to: user.email,
                  message: `🎉 <b>Investment Matured!</b>\n\n` +
                          `Your investment of ${invest.amount}€ has matured!\n\n` +
                          `<b>Returns:</b>\n` +
                          `• Original Investment: ${invest.amount}€\n` +
                          `• Return Amount: ${invest.returnAmount}€\n` +
                          `• Total: ${invest.returnAmount}€ added to your balance\n\n` +
                          `Your new balance is: ${user.balance}€\n\n` +
                          `Ready to invest again? Start a new investment today!`,
                  timestamp: new Date().toISOString(),
                  read: false,
                  isBot: true
                };

                conversation.messages.push(returnMsg);
                conversation.lastUpdated = new Date().toISOString();
                await saveChats(chats);

                io.to(`user:${user.email}`).emit('new-message', returnMsg);
                io.to(`user:${user.email}`).emit('notification', {
                  type: 'investment',
                  message: `Your investment of ${invest.amount}€ has matured! ${invest.returnAmount}€ added to your balance.`
                });
              }
            } catch (error) {
              console.error('Bot investment return notification error:', error);
            }
          }, 500);

          // Send Telegram notification
          if (telegramEnabled) {
            sendTelegramNotification(`
🎉 <b>Investment Matured!</b>

👤 <b>User:</b> ${user.fullName}
📧 <b>Email:</b> ${user.email}
💵 <b>Invested:</b> ${invest.amount}€
💰 <b>Return:</b> ${invest.returnAmount}€
💳 <b>New Balance:</b> ${user.balance}€
📅 <b>Completed:</b> ${new Date().toLocaleDateString()}
            `).catch(err => console.error('Telegram investment notification error:', err));
          }
        }
      }
    }

    if (changesMade) {
      await saveInvestments(investments);
      await saveUsers(users);
      res.send(`Investment processing complete. ${completedCount} investments were completed.`);
    } else {
      res.send("No investments ready for processing at this time.");
    }
  } catch (error) {
    console.error('Process investments error:', error);
    res.status(500).send("Error processing investments.");
  }
});

// ==================== HTTP CHAT ENDPOINTS (Backup/Fallback) ====================

// Get chat history with specific user (HTTP fallback)
app.get('/api/chat/history/:otherUser', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const otherUser = req.params.otherUser;
    const currentUser = req.session.user;

    const chatId = [currentUser, otherUser].sort().join('_');
    const chats = await readChats();
    
    let conversation = chats.find(c => c.id === chatId);
    
    if (!conversation) {
      return res.json([]);
    }

    res.json(conversation.messages);
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: "Failed to load chat history" });
  }
});

// Get unread messages count for current user
app.get('/api/chat/unread', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const unreadCount = await getUnreadCount(req.session.user);
    res.json({ unreadCount });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
});

// Get user's chat list (who they can chat with)
app.get('/api/chat/users', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const currentUser = req.session.user;
    const users = await readUsers();
    const adminSettings = await readAdminSettings();
    const admin = adminSettings[0];
    const chats = await readChats();
    
    // For non-admin users, show bot and admin
    if (!req.session.isAdmin) {
      // Get unread count for bot chat
      const botChatId = [currentUser, adminBot.botUserId].sort().join('_');
      const botConversation = chats.find(c => c.id === botChatId);
      
      // Get unread count for admin chat
      const adminChatId = [currentUser, admin.email].sort().join('_');
      const adminConversation = chats.find(c => c.id === adminChatId);
      
      let botUnreadCount = 0;
      let botLastMessage = '';
      let botLastMessageTime = null;
      
      if (botConversation) {
        botUnreadCount = botConversation.messages.filter(m => m.to === currentUser && !m.read).length;
        const lastMsg = botConversation.messages[botConversation.messages.length - 1];
        if (lastMsg) {
          botLastMessage = lastMsg.message.substring(0, 30) + (lastMsg.message.length > 30 ? '...' : '');
          botLastMessageTime = lastMsg.timestamp;
        }
      }
      
      let adminUnreadCount = 0;
      let adminLastMessage = '';
      let adminLastMessageTime = null;
      
      if (adminConversation) {
        adminUnreadCount = adminConversation.messages.filter(m => m.to === currentUser && !m.read).length;
        const lastMsg = adminConversation.messages[adminConversation.messages.length - 1];
        if (lastMsg) {
          adminLastMessage = lastMsg.message.substring(0, 30) + (lastMsg.message.length > 30 ? '...' : '');
          adminLastMessageTime = lastMsg.timestamp;
        }
      }
      
      const botUser = {
        id: adminBot.botUserId,
        phone: 'BOT',
        email: adminBot.botUserId,
        fullName: adminBot.botUserName,
        displayName: 'Support Bot',
        picture: 'bot_avatar.png',
        isBot: true,
        hasButtons: true,
        lastMessage: botLastMessage,
        lastMessageTime: botLastMessageTime,
        unreadCount: botUnreadCount
      };
      
      const adminUser = {
        id: 'admin',
        phone: admin.phone,
        email: admin.email,
        fullName: admin.fullName,
        displayName: 'Admin Support',
        picture: 'admin_avatar.png',
        isAdmin: true,
        lastMessage: adminLastMessage,
        lastMessageTime: adminLastMessageTime,
        unreadCount: adminUnreadCount
      };
      
      // Return bot first, then admin
      return res.json([botUser, adminUser]);
    }
    
    // For admin, show all active users with bot also included
    const chatUsers = await Promise.all(users
      .filter(u => u.email !== currentUser && u.isActive !== false)
      .map(async (u) => {
        const chatId = [currentUser, u.email].sort().join('_');
        const conversation = chats.find(c => c.id === chatId);
        
        let unreadCount = 0;
        let lastMessage = '';
        let lastMessageTime = null;
        
        if (conversation) {
          unreadCount = conversation.messages.filter(m => m.to === currentUser && !m.read).length;
          const lastMsg = conversation.messages[conversation.messages.length - 1];
          if (lastMsg) {
            lastMessage = lastMsg.message.substring(0, 30) + (lastMsg.message.length > 30 ? '...' : '');
            lastMessageTime = lastMsg.timestamp;
          }
        }
        
        return {
          id: u.email,
          phone: u.phoneNumber,
          email: u.email,
          fullName: u.fullName,
          displayName: u.fullName,
          picture: 'user_avatar.png',
          isAdmin: false,
          isBot: false,
          lastMessage,
          lastMessageTime,
          unreadCount
        };
      }));

    // Sort by last message time (most recent first)
    chatUsers.sort((a, b) => {
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    res.json(chatUsers);
  } catch (error) {
    console.error('Get chat users error:', error);
    res.status(500).json({ error: "Failed to load chat users" });
  }
});

// ==================== ADMIN PANEL ROUTES ====================

// Get all users (admin only)
app.get('/api/admin/users', async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }

  try {
    const users = await readUsers();
    const safeUsers = users.map(user => {
      const { pin, ...safeUser } = user;
      return safeUser;
    });
    res.json(safeUsers);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: "Failed to load users" });
  }
});

// Update user (admin only)
app.post('/api/admin/user/update', async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }

  try {
    const { phone, fullName, email, isActive, newPin } = req.body;
    
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email === phone || u.phoneNumber === phone);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    if (fullName) users[userIndex].fullName = fullName;
    if (email) users[userIndex].email = email;
    if (isActive !== undefined) users[userIndex].isActive = isActive === 'true';
    if (newPin) users[userIndex].pin = newPin;

    await saveUsers(users);
    
    // Send notification about account status change
    if (isActive !== undefined) {
      const action = isActive === 'true' ? 'activated' : 'deactivated';
      sendNtfyLogin(
        `User ${action}`,
        `User ${users[userIndex].fullName} (${users[userIndex].email}) was ${action} by admin`,
        2
      ).catch(err => console.error('Status change notification error:', err));
      
      // Bot notification
      setTimeout(async () => {
        try {
          const chatId = [users[userIndex].email, adminBot.botUserId].sort().join('_');
          const chats = await readChats();
          const conversation = chats.find(c => c.id === chatId);
          
          if (conversation) {
            const statusMsg = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
              from: adminBot.botUserId,
              to: users[userIndex].email,
              message: `ℹ️ <b>Account Update</b>\n\nYour account has been ${action} by an administrator.`,
              timestamp: new Date().toISOString(),
              read: false,
              isBot: true
            };

            conversation.messages.push(statusMsg);
            conversation.lastUpdated = new Date().toISOString();
            await saveChats(chats);

            io.to(`user:${users[userIndex].email}`).emit('new-message', statusMsg);
          }
        } catch (error) {
          console.error('Bot status notification error:', error);
        }
      }, 500);
      
      // Send Telegram notification
      if (telegramEnabled) {
        sendTelegramNotification(`
ℹ️ <b>User ${action}</b>

👤 <b>User:</b> ${users[userIndex].fullName}
📧 <b>Email:</b> ${users[userIndex].email}
📱 <b>Phone:</b> ${users[userIndex].phoneNumber}
👑 <b>By:</b> Admin
⏰ <b>Time:</b> ${new Date().toLocaleString()}
        `).catch(err => console.error('Telegram status change notification error:', err));
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Credit user (admin only)
app.post('/api/admin/user/credit', async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }

  try {
    const { phone, amount } = req.body;
    
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.email === phone || u.phoneNumber === phone);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const creditAmount = parseFloat(amount);
    if (isNaN(creditAmount) || creditAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    users[userIndex].balance += creditAmount;
    
    // Add transaction record
    if (!users[userIndex].transactions) users[userIndex].transactions = [];
    users[userIndex].transactions.push({
      type: "Credit",
      amount: creditAmount,
      date: new Date().toISOString(),
      description: `Admin credited account with ${creditAmount}€`,
      balanceAfterTransaction: users[userIndex].balance
    });

    await saveUsers(users);

    // Send ntfy notification about credit
    sendNtfyRegistration(
      'Account Credited',
      `User: ${users[userIndex].fullName}\nEmail: ${users[userIndex].email}\nAmount: ${creditAmount}€\nNew Balance: ${users[userIndex].balance}€\nAdmin: ${req.session.userName}`,
      3
    ).catch(err => console.error('Credit notification error:', err));

    // Send system message to user via Socket.IO and bot
    const chatId = [users[userIndex].email, adminBot.botUserId].sort().join('_');
    let chats = await readChats();
    
    let conversation = chats.find(c => c.id === chatId);
    if (!conversation) {
      conversation = {
        id: chatId,
        participants: [users[userIndex].email, adminBot.botUserId],
        messages: [],
        createdAt: new Date().toISOString()
      };
      chats.push(conversation);
    }

    const systemMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 8),
      from: adminBot.botUserId,
      to: users[userIndex].email,
      message: `💰 <b>Account Credited!</b>\n\nYour account has been credited with ${creditAmount}€.\n\nNew balance: ${users[userIndex].balance}€`,
      timestamp: new Date().toISOString(),
      read: false,
      isBot: true
    };

    conversation.messages.push(systemMessage);
    await saveChats(chats);

    // Emit to user's room via Socket.IO
    io.to(`user:${users[userIndex].email}`).emit('new-message', systemMessage);
    io.to(`user:${users[userIndex].email}`).emit('notification', {
      type: 'credit',
      message: `Your account has been credited with ${creditAmount}€`
    });
    
    // Send Telegram notification
    if (telegramEnabled) {
      sendTelegramNotification(`
💰 <b>Account Credited</b>

👤 <b>User:</b> ${users[userIndex].fullName}
📧 <b>Email:</b> ${users[userIndex].email}
💵 <b>Amount:</b> ${creditAmount}€
💳 <b>New Balance:</b> ${users[userIndex].balance}€
👑 <b>By:</b> ${req.session.userName}
⏰ <b>Time:</b> ${new Date().toLocaleString()}
      `).catch(err => console.error('Telegram credit notification error:', err));
    }

    res.json({ success: true, newBalance: users[userIndex].balance });
  } catch (error) {
    console.error('Credit user error:', error);
    res.status(500).json({ error: "Failed to credit user" });
  }
});

// Get dashboard stats (admin only)
app.get('/api/admin/stats', async (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }

  try {
    const users = await readUsers();
    const investments = await readInvestments();
    const chats = await readChats();
    
    const activeUsers = users.filter(u => u.isActive !== false).length;
    const totalBalance = users.reduce((sum, u) => sum + (u.balance || 0), 0);
    const totalInvestments = investments.reduce((sum, i) => sum + (i.amount || 0), 0);
    
    const today = new Date().toDateString();
    const todayReg = users.filter(u => new Date(u.createdAt).toDateString() === today).length;
    
    const unreadMessages = chats.reduce((sum, chat) => {
      return sum + chat.messages.filter(m => !m.read).length;
    }, 0);

    res.json({
      totalUsers: users.length,
      activeUsers,
      totalBalance,
      totalInvestments,
      todayReg,
      unreadMessages,
      telegramEnabled,
      botActive: adminBot ? adminBot.connected : false
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: "Failed to load stats" });
  }
});

// ==================== TELEGRAM BOT STATUS ROUTE ====================

app.get('/api/telegram/status', (req, res) => {
  res.json({
    enabled: telegramEnabled,
    token: TELEGRAM_BOT_TOKEN ? '✅ Configured' : '❌ Not configured',
    chatId: TELEGRAM_CHAT_ID ? '✅ Configured' : '❌ Not configured',
    status: telegramEnabled ? 'online' : 'offline'
  });
});

// ==================== BOT STATUS ROUTE ====================

app.get('/api/bot/status', (req, res) => {
  res.json({
    status: adminBot.connected ? 'online' : 'offline',
    botId: adminBot.botUserId,
    botName: adminBot.botUserName,
    commands: Object.keys(adminBot.commandHandlers),
    menus: ['Main Menu', 'User Actions', 'Credit Menu', 'Broadcast Menu'],
    uptime: process.uptime()
  });
});

// ==================== BOT BUTTON INTERFACE ROUTE ====================

app.post('/api/bot/button-click', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { callbackData, roomId } = req.body;
  
  if (!callbackData || !roomId) {
    return res.status(400).json({ error: "Missing callback data or room ID" });
  }

  // Emit to socket for processing
  io.emit('bot-button-click', { callbackData, roomId, userId: req.session.user });

  res.json({ success: true });
});

// ==================== TEST ROUTE ====================

app.get('/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Delux Euro Wallet API with Bot Buttons, Telegram and Socket.IO is running',
    bot: adminBot.connected ? 'active' : 'inactive',
    telegram: telegramEnabled ? 'active' : 'inactive',
    timestamp: new Date().toISOString()
  });
});

// ==================== SERVER INITIALIZATION ====================

async function initializeServer() {
  console.log('Starting Delux Euro Wallet Server with Bot Buttons, Telegram and Socket.IO...');
  console.log(`Port: ${PORT}`);
  console.log('Testing JSONBin connection...');
  
  const connectionSuccess = await testJSONBinConnection();
  await initializeAdmin();
  
  // Initialize bot
  adminBot = new AdminBot(io, sessionMiddleware);
  await adminBot.initialize();
  
  if (connectionSuccess) {
    console.log('\n✅ Server is ready and connected to JSONBin');
    console.log('\n📱 Available Endpoints:');
    console.log('   ┌─────────────────────────────────────┐');
    console.log('   │ AUTHENTICATION                       │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ POST /register                       │');
    console.log('   │ POST /login                          │');
    console.log('   │ GET  /check-session                   │');
    console.log('   │ GET  /logout                          │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ USER DATA                            │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ GET  /user-info                       │');
    console.log('   │ GET  /user-cards                      │');
    console.log('   │ GET  /transaction-history             │');
    console.log('   │ GET  /profile-data                    │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ CARD MANAGEMENT                      │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ POST /add-card                        │');
    console.log('   │ POST /save-card-otp                   │');
    console.log('   │ POST /update-profile                  │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ TRANSACTIONS                         │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ POST /withdraw                        │');
    console.log('   │ POST /withdraw-to-card                │');
    console.log('   │ POST /wire                            │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ INVESTMENTS                          │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ POST /invest                          │');
    console.log('   │ GET  /my-investments                  │');
    console.log('   │ GET  /process-investments             │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ CHAT SYSTEM (HTTP Fallback)         │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ GET  /api/chat/history/:otherUser    │');
    console.log('   │ GET  /api/chat/unread                │');
    console.log('   │ GET  /api/chat/users                 │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ ADMIN PANEL                          │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ GET  /api/admin/users                 │');
    console.log('   │ POST /api/admin/user/update           │');
    console.log('   │ POST /api/admin/user/credit           │');
    console.log('   │ GET  /api/admin/stats                 │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n   ┌─────────────────────────────────────┐');
    console.log('   │ BOT SYSTEM                           │');
    console.log('   ├─────────────────────────────────────┤');
    console.log('   │ GET  /api/bot/status                  │');
    console.log('   │ GET  /api/telegram/status             │');
    console.log('   │ POST /api/bot/button-click            │');
    console.log('   └─────────────────────────────────────┘');
    
    console.log('\n🔌 Socket.IO Events:');
    console.log('   • connection');
    console.log('   • join-chat');
    console.log('   • send-message');
    console.log('   • typing');
    console.log('   • mark-read');
    console.log('   • bot-button-click');
    console.log('   • disconnect');
    
    console.log('\n🤖 Bot Commands (in-app chat):');
    console.log('   • /help     - Show help menu');
    console.log('   • /menu     - Show main menu with buttons');
    console.log('   • /users    - List all users');
    console.log('   • /stats    - Show system statistics');
    console.log('   • /balance  - Get user balance');
    console.log('   • /credit   - Credit user account');
    console.log('   • /deactivate - Deactivate user');
    console.log('   • /activate - Activate user');
    console.log('   • /transactions - Get user transactions');
    console.log('   • /investments - Get user investments');
    console.log('   • /broadcast - Broadcast message');
    console.log('   • /clear    - Clear chat history');
    console.log('   • /telegram - Show Telegram status');
    
    console.log('\n🖱️ Bot Buttons:');
    console.log('   • Main Menu with all actions');
    console.log('   • User-specific action menus');
    console.log('   • Quick credit amounts');
    console.log('   • Broadcast options');
    console.log('   • Status toggles');
    
    console.log('\n📱 Telegram Bot Commands:');
    console.log('   • /start    - Start bot');
    console.log('   • /stats    - System statistics');
    console.log('   • /users    - List recent users');
    console.log('   • /balance  - Check user balance');
    console.log('   • /credit   - Credit user');
    console.log('   • /investments - View investments');
    console.log('   • /broadcast - Send broadcast');
    console.log('   • /help     - Show help');
    
    console.log('\n📱 Ntfy Notifications:');
    console.log(`   • Registration: ${NTFY_TOPIC_REGISTER}`);
    console.log(`   • Chat: ${NTFY_TOPIC_CHAT}`);
    console.log(`   • Login: ${NTFY_TOPIC_LOGIN}`);
    
    console.log('\n👑 Admin Credentials:');
    console.log(`   • Phone: ${ADMIN_PHONE}`);
    console.log(`   • Email: admin@delux.com`);
    console.log(`   • PIN: ${ADMIN_PIN}`);
    
    console.log('\n🤖 Bot Credentials:');
    console.log(`   • Email: ${SUPPORT_EMAIL}`);
    console.log(`   • Password: ${SUPPORT_PASSWORD}`);
    
    console.log('\n🤖 Telegram Bot:');
    console.log(`   • Status: ${telegramEnabled ? '✅ Active' : '❌ Not configured'}`);
    if (telegramEnabled) {
      console.log(`   • Token: ${TELEGRAM_BOT_TOKEN ? '✅ Set' : '❌ Missing'}`);
      console.log(`   • Chat ID: ${TELEGRAM_CHAT_ID ? '✅ Set' : '❌ Missing (send /start to bot to get it)'}`);
    }
    
    console.log('\n🚀 Server is running and ready to accept connections!');
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
    console.log(`🤖 Bot with Buttons: Active`);
    console.log(`📱 Telegram Integration: ${telegramEnabled ? 'Active' : 'Inactive'}\n`);
  } else {
    console.log('\n❌ JSONBin connection failed. Please check your API key and bin IDs.');
    console.log('❌ The server will start but may not function correctly.\n');
  }
}

// Start server with Socket.IO
server.listen(PORT, async () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`   Delux Euro Wallet Server with Bot Buttons & Telegram`);
  console.log(`${'='.repeat(50)}`);
  console.log(`   Server URL: http://localhost:${PORT}`);
  console.log(`   WebSocket: ws://localhost:${PORT}`);
  console.log(`   Bot Interface: Buttons & Commands`);
  console.log(`${'='.repeat(50)}\n`);
  
  await initializeServer();
});
