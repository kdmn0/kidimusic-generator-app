'use client';

import { useState } from 'react';
import { fal } from '@fal-ai/client';

interface GenerationResult {
  audio: {
    url: string;
  };
}

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [balance, setBalance] = useState(21.10);
  const [generatedCount, setGeneratedCount] = useState(0);
  
  const COST_PER_GENERATION = 0.15;
  const remainingSongs = Math.floor(balance / COST_PER_GENERATION);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a music style description');
      return;
    }

    setLoading(true);
    setError(null);
    setLogs([]);
    setAudioUrl(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_FAL_KEY;
      if (!apiKey) {
        throw new Error('FAL_KEY environment variable is not set');
      }

      fal.config({
        credentials: apiKey,
      });

      const result = await fal.subscribe(
        'fal-ai/minimax-music/v2.6',
        {
          input: {
            prompt,
            lyrics: isInstrumental ? '' : lyrics,
            is_instrumental: isInstrumental,
          },
          logs: true,
          onQueueUpdate: (update) => {
            if ('logs' in update && update.logs) {
              const newLogs = update.logs.map((log: { message: string }) => log.message);
              setLogs((prev) => [...prev, ...newLogs]);
            }
          },
        }
      ) as any;

      if (result.data?.audio?.url) {
        setAudioUrl(result.data.audio.url);
        setBalance((prev) => Math.max(0, prev - COST_PER_GENERATION));
        setGeneratedCount((prev) => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="glass glass-primary rounded-2xl shadow-2xl p-8 backdrop-blur-xl h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎵</span>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Create Music
                  </h1>
                </div>
                <p className="text-gray-300">Generate any music, song or instrumental with AI</p>
              </div>

              <div className="space-y-6">
                {/* Music Style Description */}
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-white mb-3">
                    🎼 Music Style Description <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="E.g., Indie folk, melancholy, introspective, longing, solitary walk, coffee shop..."
                      className="w-full px-4 py-3 border border-purple-500/30 bg-slate-800/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 focus:bg-slate-800/80 resize-none text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300"
                      rows={3}
                      maxLength={300}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {prompt.length}/300
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">💡 Describe the style, mood, tempo and scene details</p>
                </div>

                {/* Instrumental Toggle */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-purple-500/20">
                  <input
                    type="checkbox"
                    id="instrumental"
                    checked={isInstrumental}
                    onChange={(e) => setIsInstrumental(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded cursor-pointer accent-purple-500"
                  />
                  <label htmlFor="instrumental" className="text-sm font-medium text-gray-200 cursor-pointer flex-1">
                    🎹 Generate Instrumental Music (No Vocals)
                  </label>
                </div>

                {/* Lyrics */}
                {!isInstrumental && (
                  <div className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="block text-sm font-semibold text-white mb-3">
                      📝 Lyrics <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        className="w-full bg-slate-800/50 border border-pink-500/30 text-white px-4 py-3 rounded-xl focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500 focus:bg-slate-800/80 placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300"
                        rows={6}
                        maxLength={1000}
                        placeholder="Enter lyrics. [Verse], [Chorus], [Bridge] etc. tags are supported..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {lyrics.length}/1000
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      📌 Supported tags: [Intro], [Verse], [Chorus], [Bridge], [Outro], [Solo], etc.
                    </p>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || remainingSongs === 0}
                  className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 btn-glow text-white text-lg ${
                    loading || remainingSongs === 0
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 shadow-lg hover:shadow-purple-500/50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="animate-spin">⚙️</span>
                        Generating Music...
                      </>
                    ) : remainingSongs === 0 ? (
                      <>
                        <span>💰</span>
                        Insufficient Balance
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        Create Music
                      </>
                    )}
                  </span>
                </button>

                {/* Error Message */}
                {error && (
                  <div className="glass glass-error rounded-xl p-4 animate-slide-down">
                    <p className="text-red-300 font-medium flex items-center gap-2">
                      <span>❌</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Logs */}
                {logs.length > 0 && (
                  <div className="glass rounded-xl p-4 border border-blue-500/30">
                    <h3 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <span>📊</span>
                      Generation Progress
                    </h3>
                    <div className="text-xs text-gray-300 space-y-1 max-h-40 overflow-y-auto">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-blue-400 flex-shrink-0">▸</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio Player */}
                {audioUrl && (
                  <div className="glass glass-success rounded-xl p-6 border border-green-400/30 animate-slide-up">
                    <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                      <span>🎉</span>
                      Music Ready!
                    </h3>
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-4 backdrop-blur">
                      <audio
                        controls
                        src={audioUrl}
                        className="w-full accent-green-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={audioUrl}
                        download
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center gap-2"
                      >
                        <span>⬇️</span>
                        Download
                      </a>
                      <button
                        onClick={() => setAudioUrl(null)}
                        className="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-gray-200 font-semibold transition-all duration-300"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="sticky top-6 space-y-4">
              {/* Info Card */}
              <div className="glass glass-primary rounded-2xl p-6 backdrop-blur-xl">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span></span>
                  How to Use
                </h2>
                <ul className="text-sm text-gray-300 space-y-3">
                  {[
                    { icon: '🎨', text: 'Describe your music style, mood and scene' },
                    { icon: '✍️', text: 'Optionally add lyrics' },
                    { icon: '🎙️', text: 'Choose vocal or instrumental' },
                    { icon: '⚡', text: 'Click Create and wait' },
                    { icon: '🎵', text: 'Download when complete' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips Card */}
              <div className="glass rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="font-semibold text-pink-300 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  Tips
                </h3>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• Make detailed and specific descriptions</li>
                  <li>• Lyrics provide music control</li>
                  <li>• Specify genre and tempo details</li>
                  <li>• Define emotion and atmosphere</li>
                  <li>• Specify instruments if you want</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
