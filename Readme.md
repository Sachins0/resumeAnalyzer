# Resume Analyzer Backend 🚀

A Node.js backend service for analyzing resumes using AI-powered data extraction and secure storage.

## 📖 About

This project provides RESTful APIs for:
- JWT-based authentication
- Resume text extraction from PDF URLs
- AI-powered data enrichment using Google Gemini
- Encrypted data storage in MongoDB
- Resume search functionality

## ✨ Features

- 🔐 Secure JWT authentication
- 📄 PDF text extraction
- 🤖 AI-driven data parsing (names, education, skills, etc.)
- 🔒 Field-level encryption for sensitive data
- 🔍 Fuzzy name search
- ☁️ Cloud-ready deployment

## 🛠 Tech Stack

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)  
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?logo=express)  
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)

**AI & Utilities**  
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google)  
![PDF Parse](https://img.shields.io/badge/PDF%20Parse-1.1-FF6C37?logo=adobeacrobatreader)  
![Crypto](https://img.shields.io/badge/Node.js%20Crypto-Builtin-339933)

**Security**  
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens)  
![AES-256](https://img.shields.io/badge/AES-256_CBC-5C3EE6)

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/Sachins0/resumeAnalyzer.git
cd resumeAnalyzer
```

### 2. Install dependencies:
```
npm install
```

### 3. Configure environment variables:

- Create a .env file in the root directory with the following:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=32_byte_hex_string
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```
### 4. Start the server:
```
npm run dev
```

- Backend will run at http://localhost:3000.

## 📚 Postman API collection and API Documentation
- download this file and import it in Postman

- [API collection](./assets/resumeAnalyzer.postman_collection.json)

- or use this Postman link
- [Postman Link](https://www.postman.com/payload-geoscientist-97921483/workspace/myprojects/request/32759854-15cb4bf1-2871-4d65-a591-c379a8027b0d?action=share&creator=32759854&ctx=documentation&active-environment=32759854-f9a21786-8b8f-41c5-b880-570279bcc48c)

-- or use these endpoints

### Endpoints
### 1. Info (for verifcation whether server is live or not)
```bash
curl --location 'https://localhost:3000/api/v1/info'
```
### 2. Authentication
> POST /api/auth/login

```bash
curl --location 'https://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=naval.ravikant' \
--data-urlencode 'password=05111974'
```

### 3. Resume Enrichment
> POST /api/resume/process

```bash
curl --location 'https://localhost:3000/api/v1/resume/process' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer YOUR_JWT' \
--data-urlencode 'url=https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf'
```

### 4. Resume Search
>POST /api/search/name

```bash
curl --location 'https://localhost:3000/api/v1/search/name' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer YOUR_JWT' \
--data-urlencode 'name=prabhat'
```
