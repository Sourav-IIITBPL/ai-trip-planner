# AI Trip Planner

An AI-powered interactive trip planner built with React, TypeScript, Express, Gemini, and Zod.

## Features

✅ **Free-form trip description**
✅ **AI-generated structured itinerary**
✅ **Day-by-day UI**
✅ **Expand/collapse**
✅ **Remove stops**
✅ **Reorder stops**
✅ **Loading, Error, & Empty states**
✅ **Malformed-response handling** (Zod Schema Validation)
✅ **Stale-request protection** (AbortController)
✅ **Mobile responsive UI**
✅ **Dark mode**
✅ **Animations & Transitions**

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **AI:** Google Gemini API
- **Validation:** Zod

## Setup

### Requirements
- Node.js (v18+)
- Gemini API key

### Installation

1. Clone the repository and install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

2. Create a `.env` file in the `server` directory and add your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### Running the App

You will need two terminal windows to run the client and server simultaneously.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.