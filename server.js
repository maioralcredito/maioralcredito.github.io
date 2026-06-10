const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/ai', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01'},
      body: JSON.stringify(req.body)
    });
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.post('/api/room', async (req, res) => {
  try {
    const r = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+process.env.DAILY_KEY},
      body: JSON.stringify(req.body)
    });
    res.json(await r.json());
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.get('/api/config', (req, res) => {
  res.json({daily_domain: process.env.DAILY_DOMAIN||'maioralcredito', deepgram_key: process.env.DEEPGRAM_KEY});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Maioral rodando na porta ' + PORT));
