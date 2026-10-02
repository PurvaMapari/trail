/**
 * TRAIL Scout — Express Backend Server
 * Entry Point: src/index.ts
 *
 * Runs on PORT (default 4000).
 * Frontend should point NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
 *
 * Routes:
 *   GET  /health        → Server health check
 *   POST /api/chat      → TRAIL Scout AI chat endpoint
 *   GET  /api/spots     → Return full curated spot dataset
 *   GET  /api/spots/:id → Return a single spot by ID
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat';
import generateTrailRouter from './routes/generateTrail';
import { curated_spots, getHighlightedSpots } from './data/spots';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-gemini-api-key', 'x-gemini-model'],
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ──────────────────────────────────────────────────────────

app.use((req, _res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (_req, res) => {
  const model = process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';
  res.json({
    status: 'ok',
    service: 'TRAIL Scout Backend',
    version: '1.1.0',
    geminiEnabled: !!process.env.GEMINI_API_KEY,
    defaultModel: model,
    timestamp: new Date().toISOString(),
    totalSpots: curated_spots.length,
  });
});

// Config check for client discovery
app.get('/api/config', (_req, res) => {
  const hasServerApiKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  const defaultModel = process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';

  res.json({
    status: 'ok',
    hasServerApiKey,
    defaultModel,
    availableModels: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Strongest reasoning & deep local insights (Recommended)' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Next-generation speed & high accuracy' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Lightweight & fast' },
    ],
  });
});

// AI Chat endpoint
app.use('/api/chat', chatRouter);

// AI Trail Generation endpoint
app.use('/api/generate-trail', generateTrailRouter);

// Full spots dataset
app.get('/api/spots', (_req, res) => {
  res.json({
    spots: curated_spots,
    total: curated_spots.length,
    highlighted: getHighlightedSpots().length,
  });
});

// Single spot by ID
app.get('/api/spots/:id', (req, res) => {
  const spot = curated_spots.find((s) => s.id === req.params.id);
  if (!spot) {
    res.status(404).json({ error: `Spot "${req.params.id}" not found` });
    return;
  }
  res.json(spot);
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  const activeModel = process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';
  console.log('');
  console.log('  ████████╗██████╗  █████╗ ██╗██╗     ');
  console.log('     ██╔══╝██╔══██╗██╔══██╗██║██║     ');
  console.log('     ██║   ██████╔╝███████║██║██║     ');
  console.log('     ██║   ██╔══██╗██╔══██║██║██║     ');
  console.log('     ██║   ██║  ██║██║  ██║██║███████╗');
  console.log('     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝');
  console.log('');
  console.log(`  🗺  TRAIL Scout Backend running on http://localhost:${PORT}`);
  if (process.env.GEMINI_API_KEY) {
    console.log(`  ✦  AI Engine: ✅ Gemini Active (${activeModel})`);
  } else {
    console.log(`  ✦  AI Engine: ⚠️  Local Curated Knowledge Engine (Zero-setup offline mode)`);
    console.log(`     ↳ Set GEMINI_API_KEY in backend/.env or enter your key in the web UI`);
  }
  console.log(`  📍  ${curated_spots.length} curated spots loaded`);
  console.log(`  🌐  CORS allowed for: ${FRONTEND_URL}`);
  console.log('');
  console.log('  Endpoints:');
  console.log(`    GET  http://localhost:${PORT}/health`);
  console.log(`    GET  http://localhost:${PORT}/api/config`);
  console.log(`    POST http://localhost:${PORT}/api/chat`);
  console.log(`    POST http://localhost:${PORT}/api/generate-trail`);
  console.log(`    GET  http://localhost:${PORT}/api/spots`);
  console.log(`    GET  http://localhost:${PORT}/api/spots/:id`);
  console.log('');
});

export default app;
