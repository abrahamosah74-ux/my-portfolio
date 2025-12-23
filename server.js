const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET) console.warn('PAYSTACK_SECRET_KEY not set in .env');

// Initialize a Paystack transaction. Expects { email, amount, metadata }
app.post('/api/payments/initialize', async (req, res) => {
  const { email, amount, metadata } = req.body;
  if (!email || !amount) return res.status(400).json({ error: 'Missing email or amount' });
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount, metadata },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, 'Content-Type': 'application/json' } }
    );
    return res.json(response.data);
  } catch (err) {
    console.error('Paystack initialize error', err.response?.data || err.message);
    return res.status(500).json({ error: 'Initialization failed', details: err.response?.data || err.message });
  }
});

app.get('/', (req, res) => res.send('Paystack helper server running'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
