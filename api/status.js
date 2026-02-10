export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'Discipline Pro Server is running!'
  });
}
