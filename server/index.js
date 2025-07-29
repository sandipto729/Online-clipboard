import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Router from './Routes/index.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', Router);

app.get('/', (req, res) => {
  res.send('Server is running');
})
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});