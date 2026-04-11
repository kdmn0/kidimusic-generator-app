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
    <div className="w-full min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800 h-full">
              <h1 className="text-3xl font-bold text-white mb-2">KıdıMusic ♪ Generator</h1>
              <p className="text-gray-400 mb-6">
                Generate music from lyrics using AI - powered by MiniMax (Hailuo AI)
              </p>

              <div className="space-y-6">
                {/* Music Style Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Music Style Description *
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Indie folk, melancholic, introspective, longing, solitary walk, coffee shop"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder:text-gray-500"
                    rows={3}
                    maxLength={300}
                  />
                  <p className="text-xs text-gray-500 mt-1">{prompt.length}/300 characters</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Describe the music style, mood, and scenario for the composition
                  </p>
                </div>

                {/* Instrumental Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="instrumental"
                    checked={isInstrumental}
                    onChange={(e) => setIsInstrumental(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                  <label htmlFor="instrumental" className="text-sm font-medium text-gray-200 cursor-pointer">
                    Generate instrumental music (no vocals)
                  </label>
                </div>

                {/* Lyrics */}
                {!isInstrumental && (
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Lyrics (Optional)
                    </label>
                    <textarea
                      value={lyrics}
                      onChange={(e) => setLyrics(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:border-blue-500 placeholder:text-gray-600"
                      rows={6}
                      maxLength={1000}
                      placeholder="Enter lyrics (optional, with structure tags)"
                    />
                    <p className="text-xs text-gray-500 mt-1">{lyrics.length}/1000 characters</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported tags: [Intro], [Verse], [Pre Chorus], [Chorus], [Post Chorus], [Hook], [Bridge], [Interlude], [Transition], [Build Up], [Break], [Inst], [Solo], [Outro]
                    </p>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || remainingSongs === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? 'Generating Music...' : remainingSongs === 0 ? 'Insufficient Balance' : 'Generate Music'}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Logs */}
                {logs.length > 0 && (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-white mb-2">Generation Progress</h3>
                    <div className="text-xs text-gray-400 space-y-1 max-h-40 overflow-y-auto">
                      {logs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio Player */}
                {audioUrl && (
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-300 mb-4">Your Generated Music</h3>
                    <audio
                      controls
                      src={audioUrl}
                      className="w-full"
                    />
                    <a
                      href={audioUrl}
                      download
                      className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Download Audio
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div>
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-blue-300 mb-4">How to use:</h2>
              <ul className="text-sm text-gray-300 space-y-3">
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Describe your music style, mood, genre, and scenario</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Optionally add lyrics with structure tags</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Choose between vocal or instrumental music</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Click Generate and wait for your track</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Download the generated MP3 when ready</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">🎵</span>
                  <span>Includes singing, backing music, and arrangements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">💰</span>
                  <span>Cost: $0.15 per generation</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-blue-700">
                <h3 className="font-semibold text-blue-300 mb-3">Tips:</h3>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• Be specific in your style description</li>
                  <li>• Use lyrics for vocal control</li>
                  <li>• Check Generation Progress for logs</li>
                  <li>• Each generation costs $0.15</li>
                  <li>• You have {remainingSongs} songs remaining</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
