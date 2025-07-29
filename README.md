# 📋 Online Clipboard

A modern, secure, and user-friendly web application that allows you to share text messages and files across devices using unique 6-digit codes. Built with React and Node.js, featuring Azure Blob Storage for file uploads and Redis for temporary data storage.

## ✨ Features

- 📝 **Text Sharing**: Share text messages up to 5,000 characters
- 📁 **File Sharing**: Upload and share files up to 20MB
- 🔐 **Secure**: Unique 6-digit codes for each share
- ⏰ **Temporary Storage**: All data expires after 10 minutes
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Fast & Reliable**: Built with modern web technologies
- ☁️ **Cloud Storage**: Files stored securely in Azure Blob Storage

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **SCSS Modules** - Styled components
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Redis** - In-memory data storage
- **Azure Blob Storage** - File storage
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Redis server
- Azure Storage Account (for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arnab-pachal/Online-clipboard.git
   cd Online-clipboard
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=8000
FRONTEND_URL=http://localhost:5173

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Azure Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
AZURE_CONTAINER_NAME=your_container_name
```

### Running the Application

1. **Start Redis server** (if not already running)
   ```bash
   redis-server
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm start
   # or for development with nodemon
   nodemon index.js
   ```

3. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📖 API Documentation

### Endpoints

#### Send Data
- **POST** `/api/sendfile`
  - **Description**: Upload text or file and get a unique code
  - **Content-Type**: 
    - `application/json` (for text)
    - `multipart/form-data` (for files)
  - **Body**:
    ```json
    // For text
    {
      "text": "Your message here",
      "fileType": "text"
    }
    
    // For files
    FormData with:
    - file: File object
    - fileType: "file"
    ```
  - **Response**:
    ```json
    {
      "code": "123456"
    }
    ```

#### Retrieve Data
- **POST** `/api/retrieve`
  - **Description**: Retrieve data using the unique code
  - **Content-Type**: `application/json`
  - **Body**:
    ```json
    {
      "code": "123456"
    }
    ```
  - **Response**:
    ```json
    // For text
    {
      "fileType": "text",
      "text": "Your message here"
    }
    
    // For files
    {
      "fileType": "file",
      "fileUrl": "https://your-storage-url.com/file"
    }
    ```

## 🏗️ Project Structure

```
online-clipboard/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── Pages/         # Page components
│   │   ├── section/       # Feature sections
│   │   │   ├── Send/      # Send functionality
│   │   │   └── Retrieve/  # Retrieve functionality
│   │   ├── Common/        # Shared utilities
│   │   └── assets/        # Images and icons
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controller/       # Route controllers
│   ├── Routes/           # API routes
│   ├── uploads/          # Temporary file storage
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **Unique Codes**: Each share gets a unique 6-digit code
- **Expiration**: All data expires after 10 minutes
- **File Size Limits**: Maximum 20MB per file
- **Text Length Limits**: Maximum 5,000 characters
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs

## 🌟 Usage

### Sending Text
1. Navigate to the Send section
2. Enter your text message (up to 5,000 characters)
3. Click "Send Message" or use Ctrl+Enter
4. Share the generated 6-digit code
5. Code expires in 10 minutes

### Sending Files
1. Navigate to the Send section and select "File"
2. Drag & drop or browse to select a file (max 20MB)
3. Click "Send File"
4. Share the generated 6-digit code
5. Code and file expire in 10 minutes

### Retrieving Content
1. Navigate to the Retrieve section
2. Enter the 6-digit code
3. Click "Retrieve" to access the content
4. Download files or copy text as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Files are temporarily stored locally before Azure upload
- Redis connection needs to be established before starting the server
- CORS configuration may need adjustment for production deployment

## 🚧 Future Enhancements

- [ ] User authentication and personal clipboards
- [ ] Extended expiration times for registered users
- [ ] File preview functionality
- [ ] Mobile app development
- [ ] Encryption for sensitive data
- [ ] Usage analytics and statistics

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ by [Arnab Pachal](https://github.com/Arnab-pachal)