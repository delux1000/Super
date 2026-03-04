const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

// Dynamic import for node-fetch v3+
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// JSONBin Configuration
const JSONBIN_API_KEY = '$2a$10$nCBLclxfTfVHOJVQH1rRSOq.M/Ds19fpLw1sEX7k9IREVmxidVeBS';
const USERS_BIN_ID = '69371f88d0ea881f401b56d2';
const TRANSACTIONS_BIN_ID = '6937206e43b1c97be9e049e6';
const INVESTMENTS_BIN_ID = '69372124ae596e708f8c086d';
const CARDS_BIN_ID = '6937224e043b5e708f8c086e';

// JSONBin API URLs
const USERS_URL = `https://api.jsonbin.io/v3/b/${USERS_BIN_ID}`;
const TRANSACTIONS_URL = `https://api.jsonbin.io/v3/b/${TRANSACTIONS_BIN_ID}`;
const INVESTMENTS_URL = `https://api.jsonbin.io/v3/b/${INVESTMENTS_BIN_ID}`;
const CARDS_URL = `https://api.jsonbin.io/v3/b/${CARDS_BIN_ID}`;

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': JSONBIN_API_KEY,
  'X-Bin-Version': 'latest'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'delux-secret', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Helper functions for JSONBin
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
    
    return true;
  } catch (error) {
    console.error('✗ JSONBin connection test failed:', error.message);
    return false;
  }
}

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
      ]
    };

    users.push(newUser);
    await saveUsers(users);

    req.session.user = email;

    res.send(`<h2>Registration Successful!</h2> 
              <p>Welcome ${fullName}!</p>
              <p>Your account has been created with a welcome bonus of 1800€.</p>
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
    
    const users = await readUsers();
    const user = users.find(u => (u.email === email || u.phoneNumber === email) && u.pin === pin);

    if (!user) {
      return res.send("Invalid credentials. Please check your email/phone and PIN.");
    }

    req.session.user = user.email;
    req.session.userName = user.fullName;
    req.session.userId = user.email;

    res.send(`<h2>Login Successful!</h2> 
              <p>Welcome back, ${user.fullName}!</p>
              <p>Your current balance: ${user.balance}€</p>
              <p>Redirecting to dashboard...</p> 
              <script>
                setTimeout(() => window.location.href = '/dashboard.html', 2000);
              </script>`);
  } catch (error) {
    console.error('Login error:', error);
    res.send("Login failed. Please try again.");
  }
});

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
      cards: user.cards || []
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

    // Show OTP entry form with flexible input
    res.send(`<h2>Card Details Saved Successfully!</h2>
              <p>Your ${cardType} card ending in ${cleanCardNumber.slice(-4)} has been saved.</p>
              <p>Please enter the OTP sent to your registered phone/email to activate the card.</p>
              
              <form action="/save-card-otp" method="POST" style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <input type="hidden" name="cardId" value="${newCard.id}">
                <div style="margin-bottom: 15px;">
                  <label style="display: block; margin-bottom: 5px; font-weight: bold;">Enter OTP (any length, numbers or letters):</label>
                  <input type="text" name="otp" required 
                         style="padding: 10px; width: 300px; font-size: 16px;"
                         placeholder="Enter OTP here">
                  <p style="font-size: 12px; color: #666; margin-top: 5px;">
                    OTP can be any combination of numbers and letters of any length
                  </p>
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
              <p>Error details: ${error.message}</p>
              <p><a href="/cards.html" style="color: #007bff;">← Back to Cards</a></p>`);
  }
});

// Save OTP to Card (updated to accept any OTP format)
app.post('/save-card-otp', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { cardId, otp } = req.body;
    
    if (!cardId || !otp) {
      return res.send("Card ID and OTP are required.");
    }

    // Validate OTP - accept any non-empty string
    if (typeof otp !== 'string' || otp.trim() === '') {
      return res.send("Invalid OTP. Please enter a valid OTP.");
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
              <p>withdraw available fund will be available in your balance after completion of your referral.</p>
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

// Check session status
app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ 
      loggedIn: true, 
      user: req.session.user,
      userName: req.session.userName 
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Get user profile data (for profile page)
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

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

// Test endpoint to verify server is working
app.get('/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Delux Euro Wallet API is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize and test JSONBin
async function initializeServer() {
  console.log('Starting Delux Euro Wallet Server...');
  console.log(`Port: ${PORT}`);
  console.log('Testing JSONBin connection...');
  
  const connectionSuccess = await testJSONBinConnection();
  
  if (connectionSuccess) {
    console.log('✅ Server is ready and connected to JSONBin');
    console.log('✅ Endpoints available:');
    console.log('  - POST /register');
    console.log('  - POST /login');
    console.log('  - GET  /user-info');
    console.log('  - POST /withdraw');
    console.log('  - POST /wire');
    console.log('  - GET  /transaction-history');
    console.log('  - GET  /user-cards');
    console.log('  - POST /add-card');
    console.log('  - POST /save-card-otp');
    console.log('  - POST /update-profile');
    console.log('  - POST /withdraw-to-card');
    console.log('  - GET  /my-investments');
    console.log('  - POST /invest');
    console.log('  - GET  /logout');
    console.log('  - GET  /check-session');
    console.log('  - GET  /profile-data');
    console.log('  - GET  /test');
    console.log('\nServer is running and ready to accept connections.');
  } else {
    console.log('❌ JSONBin connection failed. Please check your API key and bin IDs.');
    console.log('❌ The server will start but may not function correctly.');
  }
}

app.listen(PORT, async () => {
  console.log(`\n========================================`);
  console.log(`Delux Euro Wallet Server`);
  console.log(`========================================`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`========================================\n`);
  
  // Initialize and test server
  await initializeServer();
});
