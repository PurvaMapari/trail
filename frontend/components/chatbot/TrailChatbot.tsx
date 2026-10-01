'use client';

/**
 * TRAIL Scout — AI Chatbot Widget
 *
 * A floating, dockable chat widget that lets users discover nearby spots
 * using natural language. Powered by Gemini 1.5 Pro (with multi-model fallback)
 * and an offline local knowledge engine.
 *
 * Features:
 *   - Gemini 1.5 Pro reasoning agent (with Gemini 2.0 Flash / 1.5 Flash selector)
 *   - Client API Key management (Git-safe BYOK stored in browser localStorage)
 *   - Auto-connection to backend server or client-side offline fallback
 *   - Direct "Add to route" integration into active trail itinerary
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Send,
  MapPin,
  Clock,
  Coffee,
  BookOpen,
  Palette,
  Leaf,
  Eye,
  EyeOff,
  Landmark,
  Utensils,
  Gem,
  Hammer,
  Music,
  ChevronRight,
  Minimize2,
  Loader2,
  Sparkles,
  Volume2,
  Users,
  Settings2,
  KeyRound,
  Check,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ChatMessage, ChatResponse, SpotCard, QUICK_PROMPTS } from '@/types/chat';
import { SpotCategory, curated_spots } from '@/data/spots';
import { useTrailContext } from '@/context/TrailContext';

// ─── Category Icon Map ──────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<SpotCategory, React.ReactNode> = {
  coffee: <Coffee className="w-3.5 h-3.5" />,
  bookstore: <BookOpen className="w-3.5 h-3.5" />,
  art: <Palette className="w-3.5 h-3.5" />,
  'street-art': <Palette className="w-3.5 h-3.5" />,
  nature: <Leaf className="w-3.5 h-3.5" />,
  viewpoint: <Eye className="w-3.5 h-3.5" />,
  heritage: <Landmark className="w-3.5 h-3.5" />,
  food: <Utensils className="w-3.5 h-3.5" />,
  culture: <Landmark className="w-3.5 h-3.5" />,
  'hidden-gem': <Gem className="w-3.5 h-3.5" />,
  artisan: <Hammer className="w-3.5 h-3.5" />,
  music: <Music className="w-3.5 h-3.5" />,
};

const QUICK_PROMPT_ICONS: Record<string, React.ReactNode> = {
  coffee: <Coffee className="w-3.5 h-3.5" />,
  art: <Palette className="w-3.5 h-3.5" />,
  sunset: <Eye className="w-3.5 h-3.5" />,
  food: <Utensils className="w-3.5 h-3.5" />,
  book: <BookOpen className="w-3.5 h-3.5" />,
  heritage: <Landmark className="w-3.5 h-3.5" />,
};

const FOOT_TRAFFIC_LABEL: Record<string, string> = {
  quiet: 'Quiet',
  moderate: 'Moderate',
  busy: 'Busy',
};

const NOISE_LABEL: Record<string, string> = {
  silent: 'Silent',
  quiet: 'Peaceful',
  moderate: 'Ambient',
  lively: 'Lively',
};

// ─── Spot Card Component ─────────────────────────────────────────────────────

function SpotCardUI({ card }: { card: SpotCard }) {
  const { spot } = card;
  const [expanded, setExpanded] = useState(false);
  const { addSpotToTrail, recentlyAdded } = useTrailContext();
  const isAdded = recentlyAdded.includes(spot.id);

  return (
    <div className="mt-2 rounded-xl border border-[#183D2B]/12 bg-white/70 backdrop-blur-sm overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-2.5 p-3">
        <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#183D2B]/8 flex items-center justify-center flex-shrink-0 text-[#183D2B]/70">
          {CATEGORY_ICONS[spot.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-semibold text-[#183D2B] leading-snug">{spot.shortName || spot.name}</h4>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#4E6B48] bg-[#4E6B48]/10 rounded px-1.5 py-0.5 flex-shrink-0">
              {spot.categoryTags[0]}
            </span>
          </div>
          <div className="flex items-center gap-2.5 mt-1">
            <span className="flex items-center gap-1 text-[10px] text-[#183D2B]/55 font-mono">
              <MapPin className="w-2.5 h-2.5" />
              {spot.location.quarter}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#183D2B]/55 font-mono">
              <Clock className="w-2.5 h-2.5" />
              {spot.walkTimeFromCenterMin} min walk
            </span>
          </div>
        </div>
      </div>

      {/* Description (always shown) */}
      <div className="px-3 pb-2">
        <p className="text-[11px] text-[#183D2B]/70 leading-relaxed">
          {expanded ? spot.description : spot.description.split('.')[0] + '.'}
        </p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {/* Curator note */}
          <div className="rounded-lg bg-[#E36A2E]/6 border border-[#E36A2E]/15 p-2.5">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] mb-1">
              Curator Note
            </p>
            <p className="text-[11px] text-[#183D2B]/75 leading-relaxed italic">
              {spot.curatorNote}
            </p>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#183D2B]/6 text-[#183D2B]/65">
              <Users className="w-2.5 h-2.5" />
              {FOOT_TRAFFIC_LABEL[spot.footTraffic]}
            </span>
            <span className="flex items-center gap-1 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#183D2B]/6 text-[#183D2B]/65">
              <Volume2 className="w-2.5 h-2.5" />
              {NOISE_LABEL[spot.noiseLevel]}
            </span>
            <span className="flex items-center gap-1 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#183D2B]/6 text-[#183D2B]/65">
              <Clock className="w-2.5 h-2.5" />
              {spot.estimatedMinutes} min
            </span>
          </div>

          {/* Opening hours */}
          {spot.openingHours && (
            <p className="text-[10px] font-mono text-[#183D2B]/50">
              {spot.openingHours}
            </p>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex border-t border-[#183D2B]/8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 py-2 text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/55 hover:text-[#183D2B] hover:bg-[#183D2B]/4 transition-colors"
        >
          {expanded ? 'Less' : 'More details'}
        </button>
        <div className="w-px bg-[#183D2B]/8" />
        <button
          onClick={() => addSpotToTrail(spot)}
          disabled={isAdded}
          className="flex-1 py-2 text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] hover:text-[#183D2B] hover:bg-[#4E6B48]/6 transition-colors flex items-center justify-center gap-1 disabled:text-[#183D2B]/40"
        >
          {isAdded ? (
            <>
              <Check className="w-2.5 h-2.5 text-emerald-600" />
              Added
            </>
          ) : (
            <>
              Add to route
              <ChevronRight className="w-2.5 h-2.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Message Bubble ──────────────────────────────────────────────────────────

interface MessageBubbleProps {
  msg: ChatMessage & { source?: 'gemini' | 'fallback'; modelUsed?: string };
  spotCards?: SpotCard[];
  followUps?: string[];
  onFollowUp?: (prompt: string) => void;
  source?: 'gemini' | 'fallback';
  modelUsed?: string;
}

function MessageBubble({ msg, spotCards, followUps, onFollowUp, source, modelUsed }: MessageBubbleProps) {
  const isUser = msg.role === 'user';
  const effectiveSource = source || msg.source;
  const effectiveModel = modelUsed || msg.modelUsed;

  // Format bold markdown **text** in AI responses
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[#183D2B]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Strip ">> SpotName" lines from display (they're shown as cards)
      if (part.startsWith('>> ')) return null;
      return part;
    });
  };

  const formatModelLabel = (model?: string) => {
    if (!model) return 'Gemini 1.5 Pro';
    if (model === 'gemini-1.5-pro') return 'Gemini 1.5 Pro';
    if (model === 'gemini-2.0-flash') return 'Gemini 2.0 Flash';
    if (model === 'gemini-1.5-flash') return 'Gemini 1.5 Flash';
    return model;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#183D2B] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
          <Sparkles className="w-3 h-3 text-[#F4F2EB]" />
        </div>
      )}
      <div className={`max-w-[88%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
            isUser
              ? 'bg-[#183D2B] text-[#F4F2EB] rounded-br-sm'
              : 'bg-white/80 text-[#183D2B] border border-[#183D2B]/10 rounded-bl-sm shadow-sm'
          }`}
        >
          {isUser ? (
            msg.content
          ) : (
            <span className="whitespace-pre-wrap">{formatText(msg.content)}</span>
          )}
        </div>

        {/* Spot Cards */}
        {!isUser && spotCards && spotCards.length > 0 && (
          <div className="w-full space-y-1.5 mt-1">
            {spotCards.map((card) => (
              <SpotCardUI key={card.spot.id} card={card} />
            ))}
          </div>
        )}

        {/* Follow-up suggestions */}
        {!isUser && followUps && followUps.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {followUps.map((fu) => (
              <button
                key={fu}
                onClick={() => onFollowUp?.(fu)}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#183D2B]/20 text-[#183D2B]/65 hover:border-[#E36A2E]/50 hover:text-[#E36A2E] hover:bg-[#E36A2E]/5 transition-all"
              >
                {fu}
              </button>
            ))}
          </div>
        )}

        {/* Source badge */}
        {!isUser && effectiveSource && (
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#183D2B]/45 mt-0.5">
            {effectiveSource === 'gemini' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>✦ {formatModelLabel(effectiveModel)}</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>✦ TRAIL Scout Local Guide</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Chat Widget ────────────────────────────────────────────────────────

export function TrailChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Settings & API Key state
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-pro');
  const [showKeyText, setShowKeyText] = useState(false);
  const [keySavedBanner, setKeySavedBanner] = useState(false);
  const [serverHasKey, setServerHasKey] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  const [messages, setMessages] = useState<
    (ChatMessage & {
      spotCards?: SpotCard[];
      followUps?: string[];
      source?: 'gemini' | 'fallback';
      modelUsed?: string;
    })[]
  >([
    {
      role: 'assistant',
      content:
        "I'm TRAIL Scout — I know the hidden cafes, forgotten alleys, and quiet viewpoints that most people walk right past. What are you looking for today?",
      source: 'fallback',
      modelUsed: 'local-curated-engine',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load saved API key & preferences from localStorage
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('trail_gemini_api_key');
      const storedModel = localStorage.getItem('trail_gemini_model');
      if (storedKey) setUserApiKey(storedKey);
      if (storedModel) setSelectedModel(storedModel);
    } catch {
      // localStorage may fail in private browsing
    }
  }, []);

  // Check backend server config & health
  const checkBackendConfig = useCallback(async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${backendUrl}/api/config`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        setServerHasKey(!!data.hasServerApiKey);
        setBackendOnline(true);
      } else {
        setBackendOnline(false);
      }
    } catch {
      setBackendOnline(false);
    }
  }, []);

  useEffect(() => {
    checkBackendConfig();
  }, [checkBackendConfig, isOpen]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized && !showSettings) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, showSettings]);

  const saveSettings = () => {
    try {
      if (userApiKey.trim()) {
        localStorage.setItem('trail_gemini_api_key', userApiKey.trim());
      } else {
        localStorage.removeItem('trail_gemini_api_key');
      }
      localStorage.setItem('trail_gemini_model', selectedModel);
      setKeySavedBanner(true);
      setTimeout(() => setKeySavedBanner(false), 2500);
    } catch {
      // Ignore storage errors
    }
  };

  const clearSavedKey = () => {
    setUserApiKey('');
    try {
      localStorage.removeItem('trail_gemini_api_key');
    } catch {
      // Ignore
    }
    setKeySavedBanner(true);
    setTimeout(() => setKeySavedBanner(false), 2000);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: (typeof messages)[0] = {
        role: 'user',
        content: trimmed,
      };

      const historyForAPI: ChatMessage[] = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'x-gemini-model': selectedModel,
        };
        if (userApiKey.trim()) {
          headers['x-gemini-api-key'] = userApiKey.trim();
        }

        const res = await fetch(`${backendUrl}/api/chat`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: trimmed,
            history: historyForAPI,
            apiKey: userApiKey.trim() || undefined,
            model: selectedModel,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: ChatResponse = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            spotCards: data.spotCards,
            followUps: data.suggestedFollowUps,
            source: data.source,
            modelUsed: data.modelUsed,
          },
        ]);
      } catch (err) {
        console.warn('[TRAIL Scout Frontend] Backend call failed, using client fallback:', err);

        // Client-side emergency fallback: find a matching spot from curated dataset
        const lower = trimmed.toLowerCase();
        const matched = curated_spots.find(
          (s) =>
            lower.includes(s.name.toLowerCase()) ||
            lower.includes(s.category) ||
            s.vibes.some((v) => lower.includes(v.toLowerCase()))
        ) || curated_spots[0];

        const secondMatched = curated_spots.find((s) => s.id !== matched.id && s.category === matched.category) || curated_spots[1];

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I know just the place: **${matched.name}** in ${matched.location.quarter}.\n\n>> ${matched.name}\n${matched.description.split('.')[0]}. ${matched.curatorNote}\n\n*(Note: Running offline. Start backend with 'cd backend && npm run dev' or configure your API key in Settings ⚙️ for live Gemini responses).*`,
            spotCards: [
              {
                spot: matched,
                matchReason: matched.curatorNote || 'Recommended based on your query.',
                relevanceScore: 0.9,
                action: 'add-to-trail',
              },
              {
                spot: secondMatched,
                matchReason: secondMatched.curatorNote || 'Alternative local spot.',
                relevanceScore: 0.75,
                action: 'add-to-trail',
              },
            ],
            source: 'fallback',
            modelUsed: 'local-curated-engine',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, userApiKey, selectedModel]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const isGeminiActive = Boolean(userApiKey.trim() || serverHasKey);

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      {!isOpen && (
        <button
          id="trail-scout-open-btn"
          onClick={handleOpen}
          aria-label="Open TRAIL Scout AI"
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-[#183D2B] text-[#F4F2EB] shadow-xl hover:shadow-2xl hover:bg-[#4E6B48] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Sparkles className="w-4.5 h-4.5 text-[#E36A2E]" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E36A2E] border-2 border-[#183D2B]" />
            )}
          </div>
          <span className="text-xs font-mono uppercase tracking-wider">
            TRAIL Scout
          </span>
          {isGeminiActive && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Gemini AI active" />
          )}
        </button>
      )}

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[380px] transition-all duration-300 ${
            isMinimized ? 'h-[54px]' : 'h-[620px]'
          } flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#183D2B]/15 bg-[#F4F2EB]`}
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#183D2B] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#F4F2EB]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#E36A2E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-[#F4F2EB] tracking-wide">
                    TRAIL Scout
                  </h3>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[9px] font-mono text-[#F4F2EB]/80 transition-colors"
                    title="Click to configure AI Engine & API Key"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isGeminiActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span>
                      {isGeminiActive
                        ? selectedModel === 'gemini-1.5-pro'
                          ? '1.5 Pro'
                          : selectedModel === 'gemini-2.0-flash'
                          ? '2.0 Flash'
                          : '1.5 Flash'
                        : 'Local'}
                    </span>
                  </button>
                </div>
                <p className="text-[9px] font-mono text-[#F4F2EB]/50 uppercase tracking-wider">
                  Panaji Guide · {backendOnline ? 'Backend Online' : 'Offline Mode'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSettings
                    ? 'bg-[#E36A2E] text-white'
                    : 'text-[#F4F2EB]/70 hover:text-[#F4F2EB] hover:bg-white/10'
                }`}
                aria-label="Settings"
                title="Configure Gemini API Key & Model"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[#F4F2EB]/60 hover:text-[#F4F2EB] hover:bg-white/10 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#F4F2EB]/60 hover:text-[#F4F2EB] hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body (hidden when minimized) */}
          {!isMinimized && (
            <>
              {/* ── Settings Drawer / Overlay ── */}
              {showSettings ? (
                <div className="flex-1 overflow-y-auto p-4 bg-[#F4F2EB] text-[#183D2B] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#183D2B]/10">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#E36A2E]" />
                        <h4 className="text-xs font-semibold tracking-wide uppercase font-mono">
                          AI Engine Settings
                        </h4>
                      </div>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="text-[10px] font-mono text-[#183D2B]/60 hover:text-[#183D2B]"
                      >
                        Done ✕
                      </button>
                    </div>

                    {/* Status overview */}
                    <div className="rounded-xl p-3 bg-white/70 border border-[#183D2B]/10 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#183D2B]/60">Backend Server:</span>
                        <span className={backendOnline ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                          {backendOnline ? '● Connected (:4000)' : '○ Offline (Fallback Active)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#183D2B]/60">Server Key in .env:</span>
                        <span className={serverHasKey ? 'text-emerald-700 font-semibold' : 'text-[#183D2B]/50'}>
                          {serverHasKey ? 'Loaded' : 'None detected'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#183D2B]/60">Active Model:</span>
                        <span className="font-semibold text-[#183D2B]">
                          {selectedModel === 'gemini-1.5-pro' ? 'Gemini 1.5 Pro' : selectedModel}
                        </span>
                      </div>
                    </div>

                    {/* Model Selector */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/70 mb-1.5">
                        Gemini Reasoning Agent
                      </label>
                      <div className="space-y-1.5">
                        {[
                          {
                            id: 'gemini-1.5-pro',
                            name: 'Gemini 1.5 Pro',
                            badge: 'Strongest Reasoning',
                            desc: 'Deep local nuance, multi-turn context & superior trail planning.',
                          },
                          {
                            id: 'gemini-2.0-flash',
                            name: 'Gemini 2.0 Flash',
                            badge: 'Next-Gen Speed',
                            desc: 'Ultra-fast inference with next-generation multimodal architecture.',
                          },
                          {
                            id: 'gemini-1.5-flash',
                            name: 'Gemini 1.5 Flash',
                            badge: 'Lightweight',
                            desc: 'Fast, token-efficient responses.',
                          },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setSelectedModel(m.id)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                              selectedModel === m.id
                                ? 'bg-white border-[#E36A2E] shadow-sm ring-1 ring-[#E36A2E]/30'
                                : 'bg-white/40 border-[#183D2B]/10 hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#183D2B]">{m.name}</span>
                              <span
                                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                  selectedModel === m.id
                                    ? 'bg-[#E36A2E]/10 text-[#E36A2E]'
                                    : 'bg-[#183D2B]/5 text-[#183D2B]/50'
                                }`}
                              >
                                {m.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#183D2B]/60 mt-0.5">{m.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Client API Key Input (Git-safe BYOK) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/70">
                          Google Gemini API Key
                        </label>
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[9px] font-mono text-[#E36A2E] hover:underline flex items-center gap-0.5"
                        >
                          Get Free Key <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      <div className="relative">
                        <input
                          type={showKeyText ? 'text' : 'password'}
                          value={userApiKey}
                          onChange={(e) => setUserApiKey(e.target.value)}
                          placeholder={serverHasKey ? 'Using server key (or enter custom key)' : 'Paste AIzaSy... here'}
                          className="w-full text-xs font-mono px-3 py-2 pr-9 rounded-xl border border-[#183D2B]/20 bg-white focus:outline-none focus:border-[#E36A2E]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKeyText(!showKeyText)}
                          className="absolute right-2.5 top-2.5 text-[#183D2B]/40 hover:text-[#183D2B]"
                        >
                          {showKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-[#4E6B48]/10 border border-[#4E6B48]/20">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4E6B48] flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-[#183D2B]/75 leading-tight">
                          <strong>Git-safe:</strong> This key stays in your browser&apos;s local storage. When you push code to Git, your key is never shared or leaked.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#183D2B]/10 mt-3 space-y-2">
                    {keySavedBanner && (
                      <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
                        ✓ Settings updated and applied!
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {userApiKey && (
                        <button
                          type="button"
                          onClick={clearSavedKey}
                          className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-rose-700 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={saveSettings}
                        className="flex-1 py-2 text-[10px] font-mono uppercase tracking-wider bg-[#183D2B] text-[#F4F2EB] hover:bg-[#4E6B48] rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3 h-3" />
                        Save & Apply
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Quick Prompts */}
                  <div className="flex gap-2 px-3 pt-2.5 pb-1.5 overflow-x-auto scrollbar-none bg-[#F4F2EB]/95 flex-shrink-0 border-b border-[#183D2B]/8">
                    {QUICK_PROMPTS.map((qp) => (
                      <button
                        key={qp.id}
                        onClick={() => sendMessage(qp.prompt)}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 flex-shrink-0 text-[9px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-full bg-white border border-[#183D2B]/12 text-[#183D2B]/65 hover:border-[#E36A2E]/40 hover:text-[#E36A2E] hover:bg-[#E36A2E]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {QUICK_PROMPT_ICONS[qp.emoji]}
                        {qp.label}
                      </button>
                    ))}
                  </div>

                  {/* Messages */}
                  <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-3 py-3 bg-[#F4F2EB]/95 space-y-0.5"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {messages.map((msg, i) => (
                      <MessageBubble
                        key={i}
                        msg={msg}
                        spotCards={msg.spotCards}
                        followUps={msg.followUps}
                        onFollowUp={(prompt) => sendMessage(prompt)}
                        source={msg.source}
                        modelUsed={msg.modelUsed}
                      />
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex justify-start mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#183D2B] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                          <Sparkles className="w-3 h-3 text-[#F4F2EB]" />
                        </div>
                        <div className="bg-white/80 border border-[#183D2B]/10 rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm flex items-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 text-[#4E6B48] animate-spin" />
                          <span className="text-xs text-[#183D2B]/60 font-mono">
                            {selectedModel === 'gemini-1.5-pro' ? 'Gemini 1.5 Pro exploring trails...' : 'Scouting spots...'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input area */}
                  <div className="flex-shrink-0 border-t border-[#183D2B]/10 bg-white/90 backdrop-blur-sm p-3">
                    <div className="flex items-end gap-2">
                      <textarea
                        ref={inputRef}
                        id="trail-scout-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me about spots, vibes, hidden places..."
                        rows={1}
                        disabled={isLoading}
                        className="flex-1 resize-none text-xs text-[#183D2B] placeholder-[#183D2B]/35 bg-transparent outline-none leading-relaxed max-h-24 font-sans disabled:opacity-50"
                        style={{ minHeight: '20px' }}
                      />
                      <button
                        id="trail-scout-send-btn"
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isLoading}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-[#183D2B] text-[#F4F2EB] flex items-center justify-center hover:bg-[#4E6B48] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Send message"
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#183D2B]/40 mt-1.5">
                      <span>Enter to send · Shift+Enter for newline</span>
                      <button
                        type="button"
                        onClick={() => setShowSettings(true)}
                        className="hover:text-[#E36A2E] underline"
                      >
                        AI Settings
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
