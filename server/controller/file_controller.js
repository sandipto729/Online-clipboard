
const redisClient = require('../config/redis');

// Generate unique 6-digit code
const generateCode = async () => {
  let code;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (await redisClient.exists(code));
  return code;
};

// Store file details
const fileUpload = async (req, res) => {
  const { fileType, fileUrl } = req.body;
  if (!fileType || !fileUrl) return res.status(400).json({ error: 'Missing fields' });

  try {
    const code = await generateCode();
    const data = JSON.stringify({ fileType, fileUrl });
    await redisClient.setEx(code, 600, data); 

    res.status(200).json({ code });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Retrieve file details
const retrieveFile = async (req, res) => {
  const { code } = req.body; 
  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const data = await redisClient.get(code);
    if (!data) return res.status(404).json({ error: 'Code not found or expired' });

    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { fileUpload, retrieveFile };
