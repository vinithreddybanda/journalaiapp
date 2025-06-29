# Journal AI App

A modern journaling web application built with Next.js, Supabase, and AI-powered analysis.

## Features
- Secure authentication
- Mood and summary analysis using AI
- Timeline

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm or npm

### Setup
1. Clone the repository.
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Supabase and API keys.
4. Run the development server:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `NEXT_GROQ_API_KEY`: API key for AI analysis
