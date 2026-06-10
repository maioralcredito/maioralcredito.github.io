const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Proxy para Anthropic API — chave fica no servidor, nunca exposta
app.post('/api/ai', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy para Daily.co — criar salas
app.post('/api/room', async (req, res) => {
  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.DAILY_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Retorna config pública (sem chaves secretas)
app.get('/api/config', (req, res) => {
  res.json({
    daily_domain: process.env.DAILY_DOMAIN || 'maioralcredito',
    deepgram_key: process.env.DEEPGRAM_KEY // Deepgram é usado direto no browser via WebSocket
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Maioral Copiloto rodando na porta ' + PORT));
