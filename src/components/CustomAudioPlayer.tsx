'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, Volume2Icon, DownloadIcon } from './Icons';

interface CustomAudioPlayerProps {
  src: string;
}

export default function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Reset player states when source changes
    setIsPlaying(false);
    setCurrentTime(0);
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log('Playback error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-[#050505] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-white/30">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      <div className="flex flex-col gap-4">
        {/* Visualizer and Song info */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] overflow-hidden group">
              {/* Subtle spinning vinyl effect inside */}
              <div className={`absolute inset-0 rounded-full border border-black/10 ${isPlaying ? 'animate-spin-slow' : ''}`} style={{
                background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.05) 40%, transparent 50%, rgba(0,0,0,0.05) 60%, transparent 70%)'
              }} />
              <div className="w-3 h-3 bg-[#0a0a0a] rounded-full z-10 border border-white/40 shadow-inner" />
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'} z-20`}>
                <span className="w-1 bg-white rounded-full h-4 animate-music-bar-1 shadow-[0_0_5px_#fff]" />
                <span className="w-1 bg-white rounded-full h-6 animate-music-bar-2 shadow-[0_0_5px_#fff]" />
                <span className="w-1 bg-white rounded-full h-3 animate-music-bar-3 shadow-[0_0_5px_#fff]" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Generated Track</h4>
              <p className="text-xs text-silver-400">MiniMax Music v2.6 AI</p>
            </div>
          </div>

          {/* Sound Wave Animation (CSS-only) */}
          <div className="flex items-end gap-1 h-6 px-3">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300 ${
                  isPlaying ? 'animate-music-equalizer' : 'h-1'
                }`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  height: isPlaying ? undefined : '4px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls Layout */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon size={20} className="text-black ml-0" /> : <PlayIcon size={20} className="text-black ml-1" />}
          </button>

          {/* Progress Seek Bar */}
          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 group">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 rounded-full appearance-none bg-[#1a1a1a] cursor-pointer outline-none transition-all duration-150 group-hover:h-2"
                style={{
                  background: `linear-gradient(to right, #ffffff ${progressPercentage}%, #1a1a1a ${progressPercentage}%, #1a1a1a 100%)`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400 w-10">{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-full md:w-32 flex-shrink-0">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Volume2Icon size={18} className={isMuted ? 'text-red-400 opacity-60' : 'text-gray-300'} />
            </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(to right, #ffffff ${(isMuted ? 0 : volume) * 100}%, #1a1a1a ${(isMuted ? 0 : volume) * 100}%, #1a1a1a 100%)`,
                }}
              />
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full md:w-auto">
            <a
              href={src}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] border border-white/10 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 shadow-md cursor-pointer"
            >
              <DownloadIcon size={16} />
              <span>Download MP3</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
