# Leela-Ancient-Wisdom.-Modern-Game-Play

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-218oaw4p)
# LEELA — Ancient Wisdom. Modern Game Play.

An AI-driven, browser-native 3D gaming platform that transforms scriptural heritage and historical literature into interactive, personalized micro-games.

## 🚀 Setup & Installation Steps

Follow these instructions to run the LEELA ecosystem locally on your system:

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org) (v18.0.0 or higher)
*   [npm](https://npmjs.com) (v9.0.0 or higher)

### 2. Clone the Repository
```bash
git clone https://github.com
cd Leela-Ancient-Wisdom.-Modern-Game-Play
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory of your project:
```bash
touch .env
```
Paste the following environment variables into your `.env` file:
```env
# LEELA Core Configuration
VITE_APP_ENV=development
VITE_APP_TITLE=LEELA_Dharmic_Platform

# AI & Search API Endpoint Credentials
VITE_MITRA_AI_MODEL=gemini-1.5-flash
VITE_CONTEXTUAL_SEARCH_API_KEY=your_secure_search_api_key_here
VITE_VOICE_SYNTHESIS_DEFAULT_ACCENT=telugu-in

# Database/Telemetry Sync Configuration
VITE_SUPABASE_URL=https://supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anonymous_key_here
```

### 5. Launch Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to explore the live workspace.
