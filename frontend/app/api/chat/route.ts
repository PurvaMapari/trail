/**
 * This route has been moved to the standalone backend.
 * See: /backend/src/routes/chat.ts
 *
 * The TRAIL Scout AI chat endpoint is now served by the Express backend at:
 *   POST http://localhost:4000/api/chat
 *
 * Start the backend:
 *   cd backend && npm install && npm run dev
 *
 * The frontend chatbot reads NEXT_PUBLIC_BACKEND_URL from .env.local
 * to know where the backend is running.
 */

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'This endpoint has moved. Please start the backend server.',
      message: 'Run: cd backend && npm run dev',
      backendUrl: 'http://localhost:4000/api/chat',
    },
    { status: 410 }
  );
}
