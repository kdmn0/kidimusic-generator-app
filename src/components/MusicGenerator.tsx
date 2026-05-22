'use client';

import { useState } from 'react';
import { fal } from '@fal-ai/client';
import {
  MusicIcon,
  SparklesIcon,
  LoaderIcon,
  CheckIcon,
  AlertCircleIcon,
  InfoIcon,
  CoinsIcon,
  TrashIcon,
  GuitarIcon,
  HelpCircleIcon
} from './Icons';
import CustomAudioPlayer from './CustomAudioPlayer';

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

  const stylePresets = [
    { label: '🎵 Chill Lofi', prompt: 'Lo-fi hip-hop, chill vibes, jazz chords, 85 BPM, midnight study session, dusty vinyl crackle' },
    { label: '🎹 Synthwave', prompt: 'Retro 80s synthwave, driving bassline, analog synthesizers, neon streets, nocturnal drive, 110 BPM' },
    { label: '🎸 Summer Pop', prompt: 'Catchy upbeat pop, acoustic guitar, bright piano chords, energetic drums, happy summer mood, 120 BPM' },
    { label: '🎻 Epic Orchestral', prompt: 'Cinematic orchestral theme, dramatic strings, powerful brass, heroic melody, adventure film score' }
  ];

  const lyricTags = ['[Intro]', '[Verse 1]', '[Chorus]', '[Verse 2]', '[Bridge]', '[Outro]', '[Guitar Solo]'];

  const handlePresetSelect = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleAddTag = (tag: string) => {
    setLyrics((prev) => {
      const spacing = prev.length > 0 && !prev.endsWith('\n') ? '\n' : '';
      return prev + spacing + tag + '\n';
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a music style description');
      return;
    }

    if (prompt.trim().length < 10) {
      setError('Please enter at least 10 characters for the music description');
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
    <div id="generator-section" className="relative w-full px-4 py-8 md:py-16 scroll-mt-24">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-primary rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center border border-purple-500/30">
            {/* Animated Equalizer Visualizer */}
            <div className="flex justify-center items-end gap-1.5 h-16 mb-8">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-music-equalizer"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    animationDuration: `${0.6 + i * 0.1}s`
                  }}
                />
              ))}
            </div>

            <h2 className="text-2xl font-heading text-white mb-2 tracking-wide flex items-center justify-center gap-2">
              <LoaderIcon className="animate-spin text-white" size={24} />
              AI Studio is Composing
            </h2>
            <p className="text-gray-300 text-sm mb-6">Arranging, synthesising vocals and mastering...</p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 mb-6 overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"
                style={{ width: '100%' }}
              />
            </div>

            {/* Logs Console */}
            {logs.length > 0 && (
              <div className="text-left mb-6">
                <div className="bg-black/90 rounded-xl p-4 max-h-40 overflow-y-auto border border-white/20 font-mono text-[11px] shadow-inner">
                  <div className="text-silver-300 space-y-1.5">
                    {logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 items-start leading-relaxed">
                        <span className="text-white flex-shrink-0 select-none">&gt;_</span>
                        <span className="text-silver-300">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400">Estimated duration: 30-60 seconds</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Generator Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="glass-primary rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Card background glowing elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full filter blur-[100px] opacity-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full filter blur-[100px] opacity-10 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/20 text-white">
                    <MusicIcon size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading text-white tracking-wide">AI Studio</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Describe your genre, toggle options, and write lyrics</p>
                  </div>
                </div>


              </div>

              <div className="space-y-6">
                {/* Style Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-silver-100 flex items-center gap-2">
                      <GuitarIcon size={16} className="text-white" />
                      Music Style Description <span className="text-white/50">*</span>
                    </label>
                    <span className="text-xs text-silver-500 font-mono">{prompt.length}/300</span>
                  </div>

                  <div className="relative group">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. Synthwave with driving basslines, acoustic indie folk with warm guitar chords, etc..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-silver-500 focus:ring-1 focus:ring-white/30 focus:border-white/30 outline-none backdrop-blur-sm transition-all duration-300 resize-none font-sans text-sm leading-relaxed"
                      rows={3}
                      maxLength={300}
                    />
                  </div>

                  {prompt.length > 0 && prompt.length < 10 && (
                    <div className="text-xs text-pink-400 mt-2 flex items-center gap-1.5 animate-slide-down">
                      <AlertCircleIcon size={14} />
                      Must be at least 10 characters ({prompt.length}/10 required)
                    </div>
                  )}

                  {/* Style Presets */}
                  <div className="mt-3">
                    <span className="text-[11px] text-slate-400 block mb-2 font-semibold tracking-wider uppercase">Quick Presets</span>
                    <div className="flex flex-wrap gap-2">
                      {stylePresets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handlePresetSelect(preset.prompt)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                            prompt === preset.prompt
                              ? 'bg-white/10 border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                              : 'bg-transparent border-white/10 text-silver-400 hover:text-white hover:border-white/30'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vocal/Instrumental Custom Switch */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-colors duration-200 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/40 rounded-lg text-white border border-white/10">
                      <MusicIcon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-silver-100">Instrumental Only</h4>
                      <p className="text-xs text-silver-400 mt-0.5">Toggle off to generate lyrics with vocals</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsInstrumental(!isInstrumental)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      isInstrumental ? 'bg-white' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isInstrumental ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Lyrics Section */}
                {!isInstrumental && (
                  <div className="animate-slide-up">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-silver-100 flex items-center gap-2">
                        <InfoIcon size={16} className="text-white" />
                        Song Lyrics <span className="text-silver-500">(Optional)</span>
                      </label>
                      <span className="text-xs text-silver-500 font-mono">{lyrics.length}/1000</span>
                    </div>

                    <div className="relative">
                      <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        placeholder="Add lyrics here. Standard song tag syntax is supported, for example: [Verse 1] or [Chorus]..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-silver-500 focus:ring-1 focus:ring-white/30 focus:border-white/30 outline-none backdrop-blur-sm transition-all duration-300 resize-none font-sans text-sm leading-relaxed"
                        rows={5}
                        maxLength={1000}
                      />
                    </div>

                    {/* Lyric Tag Helper buttons */}
                    <div className="mt-3">
                      <span className="text-[11px] text-slate-400 block mb-2 font-semibold tracking-wider uppercase">Structure Helpers</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lyricTags.map((tag, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleAddTag(tag)}
                            className="text-xs px-2.5 py-1 bg-black/40 hover:bg-white/10 border border-white/10 hover:border-white/30 text-silver-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || remainingSongs === 0 || prompt.trim().length < 10}
                  className={`w-full font-heading font-semibold tracking-wider py-4 px-6 rounded-xl transition-all duration-350 cursor-pointer flex items-center justify-center gap-2.5 text-md shadow-xl ${
                    loading || remainingSongs === 0 || prompt.trim().length < 10
                      ? 'bg-black border border-white/10 text-silver-500 cursor-not-allowed shadow-none'
                      : 'bg-white text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]'
                  }`}
                >
                  <SparklesIcon size={18} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'AI Studio Generating...' : remainingSongs === 0 ? 'Balance Exhausted' : 'Generate AI Track'}
                </button>

                {/* Errors */}
                {error && (
                  <div className="glass-error rounded-xl p-4 flex gap-3 items-start border border-red-500/20 text-red-300 text-sm animate-slide-up">
                    <AlertCircleIcon size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-200">Operation Error</h4>
                      <p className="mt-0.5 leading-relaxed">{error}</p>
                    </div>
                  </div>
                )}

                {/* Success Audio Results */}
                {audioUrl && (
                  <div className="glass-success rounded-xl p-6 border border-emerald-500/20 text-emerald-300 text-sm animate-slide-up">
                    <div className="flex gap-2 items-center mb-4">
                      <CheckIcon size={18} className="text-emerald-400" />
                      <h4 className="font-heading font-semibold text-emerald-200 text-md tracking-wider">AI Track Composed Successfully!</h4>
                    </div>
                    <CustomAudioPlayer src={audioUrl} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar instruction & tips card */}
          <div className="space-y-6">
            {/* Guide Card */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <h3 className="text-lg font-heading text-white tracking-wider mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <HelpCircleIcon size={18} className="text-white" />
                Arrangement Tips
              </h3>
              <ul className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold font-mono">1.</span>
                  <span><strong>Specify Instruments:</strong> Mention key instruments in the prompt like "piano, warm synth pad, crisp drums" for better orchestration.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold font-mono">2.</span>
                  <span><strong>Indicate BPM & Key:</strong> Adding indicators like "90 BPM, minor key" anchors the rhythm and emotional atmosphere.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold font-mono">3.</span>
                  <span><strong>Structure is Key:</strong> Tagging structure points in the lyrics helps the AI trigger chorus dynamics and intro builds correctly.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white font-bold font-mono">4.</span>
                  <span><strong>Cost Efficiency:</strong> Each track comissioning costs <strong>$0.15</strong>, which is deducted from your studio account balance.</span>
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
