import redisClient from '../config/redis.js';
import uploadToAzureBlob from '../config/azure.js';
// Generate unique 6-digit code
const generateCode = async () => {
  let code;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (await redisClient.exists(code));
  return code;
};

// Store file details
export const fileUpload = async (req, res) => {
  const file = req.file;
  const { fileType } = req.body;
  console.log("The file and file type is ", file, fileType);
  // Validate presence
  

  if (fileType == 'file') {
    if (!file || !fileType) {
    return res.status(400).json({ error: 'Missing file or fileType' });
  }
    try {
      console.log("File is ", file);
      const fileUrl = await uploadToAzureBlob(file.path, file.originalname);
      console.log("fileurl", fileUrl);
      const code = await generateCode();
      const data = JSON.stringify({ fileType, fileUrl });
         
      await redisClient.setEx(code, 600, data); // 10 minutes TTL

      return res.status(200).json({ code });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Server error during file upload' });
    }
  } else {
   
    try
    {
 
    
    const text = req.body.text || '';
    console.log("The text is ", text);
    const code = await generateCode();
    console.log("Code is ", code);
    const data = JSON.stringify({ fileType, text });
    console.log("Data is ", data);
    await redisClient.setEx(code, 600, data); 
    console.log("The text is saved  in redis")// 10 minutes TTL
    return res.status(200).json({ code });
    }
    catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Server error during file upload' });
  } 

}
};
// Retrieve file details
const retrieveFile = async (req, res) => {
  const { code } = req.body; 
  console.log("Code is ", code);
  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const data = await redisClient.get(code);
    console.log("Data is ", data);
    if (!data) return res.status(404).json({ error: 'Code not found or expired' });
  
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


export default {
  fileUpload,
  retrieveFile,
};
