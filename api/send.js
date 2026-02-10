export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { chat_id, message } = req.body;
  if (!chat_id || !message) return res.status(400).json({ error: 'Missing parameters' });
  
  const BOT_TOKEN = process.env.BOT_TOKEN || '8551668464:AAFH15aBtM72-uKoSfoiTGvuSzjgQtQl_68';
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: message, parse_mode: 'HTML' })
    });
    
    const data = await response.json();
    
    if (data.ok) {
      return res.status(200).json({ success: true, timestamp: new Date().toISOString() });
    } else {
      return res.status(500).json({ success: false, error: data.description });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
