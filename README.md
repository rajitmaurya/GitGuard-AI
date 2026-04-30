# GitGuard AI

GitGuard AI is an automated, AI-powered code review tool designed to analyze GitHub Pull Requests. It automatically identifies bugs, security vulnerabilities, and performance issues, providing intelligent, actionable feedback directly to developers.

## 🚀 Features

- **Automated PR Reviews**: Automatically trigger reviews when a Pull Request is created or updated.
- **AI-Powered Insights**: Uses advanced AI (Gemini) to analyze code diffs and suggest fixes.
- **Categorized Issues**: Identifies and tags issues as **Bugs**, **Security**, or **Performance** vulnerabilities.
- **Severity Ratings**: Prioritizes issues by severity (High, Medium, Low).
- **Interactive Dashboard**: A beautiful, clean React dashboard to browse and manage all AI-generated PR reviews.

---

## 📁 Project Structure

This repository is split into two main components:

- `/backend`: The Node.js application that handles GitHub Webhooks, interacts with the GitHub Octokit API, calls the Gemini AI service for analysis, and stores review data.
- `/frontend`: The React.js (Vite) dashboard UI that consumes the backend API to display PR reviews in a clean and organized interface.

---

## ⚙️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB (via Mongoose)
- **APIs**: GitHub Octokit API, Gemini AI SDK
- **Framework**: Express.js

### Frontend
- **Framework**: React.js (Vite)
- **Routing**: React Router
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS with modern layout and responsive design

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas instance)
- GitHub Personal Access Token (for webhook & Octokit integration)
- Gemini AI API Key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables (MongoDB URI, GitHub Token, Webhook Secret, Gemini API Key).
4. Start the backend server:
   ```bash
   npm start
   # or for development: npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` (or the port specified by Vite) in your browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
