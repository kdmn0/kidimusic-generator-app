'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import MusicGenerator from '@/components/MusicGenerator';
import CustomAudioPlayer from '@/components/CustomAudioPlayer';
import {
  MusicIcon,
  SparklesIcon,
  ArrowRightIcon,
  HeadphonesIcon,
  RadioIcon,
  GuitarIcon,
  StarIcon,
} from '@/components/Icons';

export default function Home() {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'all' | 'metal' | 'synth' | 'pop' | 'epic'>('all');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      const startPosition = window.scrollY;
      const distance = offsetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const startPosition = window.scrollY;
    const distance = -startPosition;
    const duration = 800;
    let start: number | null = null;

    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const showcaseTracks = [
    {
      id: 'metal',
      title: 'Thunderstruck Overdrive',
      genre: 'Heavy Metal',
      prompt: 'Heavy metal, distorted electric guitars, aggressive drums, dark atmosphere, fast tempo, 160 BPM, double bass pedal',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      color: 'border-red-500/30 text-red-400 bg-red-500/5',
      accent: 'red'
    },
    {
      id: 'synth',
      title: 'Retro Grid Rider',
      genre: 'Synthwave / Outrun',
      prompt: 'Retro 80s synthwave, driving synth bass, analog synthesizers, neon streets, nocturnal drive, 110 BPM, compression',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      color: 'border-pink-500/30 text-pink-400 bg-pink-500/5',
      accent: 'pink'
    },
    {
      id: 'pop',
      title: 'California Sunshine',
      genre: 'Upbeat Pop',
      prompt: 'Catchy upbeat pop, acoustic guitar, bright piano chords, energetic drums, happy summer mood, 120 BPM, female vocal',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
      accent: 'amber'
    },
    {
      id: 'epic',
      title: 'The Hero\'s Awakening',
      genre: 'Epic Orchestral',
      prompt: 'Cinematic orchestral theme, dramatic strings, powerful brass, heroic melody, adventure film score, sweeping percussion',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
      accent: 'purple'
    }
  ];

  const filteredShowcase = activeShowcaseTab === 'all'
    ? showcaseTracks
    : showcaseTracks.filter(t => t.id === activeShowcaseTab);

  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: custom * 0.1 }
    })
  };

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-silver-100 relative overflow-hidden select-none font-sans">
      {/* Background Animated Blobs - Silver/Rainbow Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-slate-100/5 rounded-full filter blur-[120px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-white/5 rounded-full filter blur-[110px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-slate-300/5 rounded-full filter blur-[130px] animate-blob animation-delay-4000" />
      </div>

      {/* Floating Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-40"
      >
        <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between border border-white/5 shadow-2xl">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer outline-none"
          >
            <div className="p-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white">
              <MusicIcon size={18} />
            </div>
            <span className="font-heading text-lg tracking-wider text-white">KıdıMusic</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-white transition-colors duration-200 cursor-pointer">Features</a>
            <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} className="hover:text-white transition-colors duration-200 cursor-pointer">Showcase</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-white transition-colors duration-200 cursor-pointer">How It Works</a>
            <a href="#generator-section" onClick={(e) => scrollToSection(e, 'generator-section')} className="hover:text-white transition-colors duration-200 cursor-pointer">Studio</a>
          </div>

          <button
            onClick={(e) => scrollToSection(e, 'generator-section')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105 text-xs font-bold text-white rounded-xl shadow-lg shadow-white/5 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Studio</span>
            <ArrowRightIcon size={12} />
          </button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-32 pb-16 px-6 md:pt-40 md:pb-32 flex flex-col items-center text-center">

        {/* Hero Background Video */}
        <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden flex items-center justify-center pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-60 mix-blend-screen"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlays to smoothly blend the video edges into the main background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#000000]/20 to-[#000000]"></div>
        </div>

        {/* Main Content */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6 flex flex-col items-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-semibold text-silver-300 tracking-wide backdrop-blur-md">
            <SparklesIcon size={12} className="text-white" />
            Powered by MiniMax Music 2.6 Engine
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-normal tracking-wide text-white leading-tight">
            Compose Premium <br />
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-semibold">
              AI Soundtracks
            </span>{' '}
            Instantly
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
            Create completely arranged music tracks featuring crisp instrumentation, harmonic vocals, and custom song structures—all generated from simple descriptive text.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={(e) => scrollToSection(e, 'generator-section')}
              className="px-6 py-3.5 bg-white text-black hover:bg-silver-100 hover:scale-105 text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <SparklesIcon size={16} />
              <span>Start Generating</span>
            </button>
            <a
              href="#showcase"
              onClick={(e) => scrollToSection(e, 'showcase')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-sm font-semibold text-slate-300 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <HeadphonesIcon size={16} />
              <span>Hear Examples</span>
            </a>
          </div>

          {/* Social / Trust Badge */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-3 w-full max-w-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#000000] bg-slate-800 flex items-center justify-center overflow-hidden">
                  <span className="text-[10px]">👤</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={12} className="text-white" />
                ))}
              </div>
              <p className="text-[11px] text-silver-500 mt-1 font-medium">Over 2,400 tracks composed by creators</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="relative z-10 mt-[50px] py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-silver-300 tracking-wider uppercase animate-shimmer">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">Next-Gen Audio Synthesis</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
            Harness the power of AI to synthesize music that sounds like it was produced in a professional studio booth.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Description-based */}
          <motion.div
            custom={0}
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]"
          >
            <div className="p-3 bg-white/5 text-white border border-white/10 rounded-2xl w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <SparklesIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-heading text-white tracking-wide mt-6">Prompt to Song</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Describe the tempo, mood, genre, and style. The model creates fully arranged audio outputs matching your exact request.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Vocal Synthesizer */}
          <motion.div
            custom={1}
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]"
          >
            <div className="p-3 bg-white/5 text-white border border-white/10 rounded-2xl w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <HeadphonesIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-heading text-white tracking-wide mt-6">Vocal Synthesis</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Provide custom lyrics. The system will synthesize a vocal line that sings your words, matching the tempo and style of the song.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Instrumental Switch */}
          <motion.div
            custom={2}
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]"
          >
            <div className="p-3 bg-white/5 text-white border border-white/10 rounded-2xl w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <RadioIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-heading text-white tracking-wide mt-6">Instrumentals</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Instantly toggle off vocals to compose backing tracks, gaming soundscapes, or acoustic study sessions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative z-10 py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold text-silver-300 tracking-wider uppercase">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">Explore Compositions</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3">
            Real samples generated by KıdıMusic showing the rich genres it can produce.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['all', 'metal', 'synth', 'pop', 'epic'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveShowcaseTab(tab as any)}
                className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer font-semibold uppercase tracking-wider ${activeShowcaseTab === tab
                  ? 'bg-white/10 border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                  : 'bg-transparent border-white/5 text-silver-500 hover:text-white hover:border-white/20'
                  }`}
              >
                {tab === 'all' ? 'Show All' : tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShowcase.map((track, idx) => (
            <motion.div
              key={track.id}
              custom={idx % 2}
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between gap-6 hover:scale-[1.01]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${track.color}`}>
                    {track.genre}
                  </span>
                  <span className="text-[10px] text-slate-500">2:15 length</span>
                </div>
                <h3 className="text-md font-heading text-white tracking-wide mt-1">{track.title}</h3>
                <p className="text-xs text-slate-400 font-mono italic leading-relaxed border-l-2 border-slate-800 pl-3 py-1">
                  "{track.prompt.substring(0, 100)}..."
                </p>
              </div>

              {/* Embedded custom player */}
              <CustomAudioPlayer src={track.url} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-16 px-6 max-w-7xl mx-auto scroll-mt-24">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-silver-300 tracking-wider uppercase">Timeline</span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">How It Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Provide a Prompt',
              desc: 'Enter a music style prompt. Describe the tempo, emotional mood, genre elements, and backing instruments.'
            },
            {
              step: '02',
              title: 'Add Lyrics (Optional)',
              desc: 'Input your song lyrics. Use tags like [Intro], [Verse], and [Chorus] to structure the vocal sections.'
            },
            {
              step: '03',
              title: 'Generate & Play',
              desc: 'Wait for our AI engines to construct the chords, melodies, and vocals. Play the audio and download as MP3.'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <span className="text-5xl font-heading font-normal text-white/10 absolute top-4 right-6">{item.step}</span>
              <div>
                <h3 className="text-base font-semibold text-white tracking-wide">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Studio Area */}
      <section id="generator-section" className="relative z-10 py-16 px-4 bg-gradient-to-b from-transparent to-[#050505] border-t border-white/5 scroll-mt-24">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-white font-semibold tracking-wider uppercase mb-3">
            <GuitarIcon size={14} />
            Live Creation Studio
          </div>
          <h2 className="text-3xl md:text-5xl font-heading text-white">Create Your Next Track</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            Input your descriptive parameters below and let our AI compose custom tracks. Ensure your browser environment has configured environment keys.
          </p>
        </motion.div>

        {/* Integrated Generator Component */}
        <motion.div
          custom={1}
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <MusicGenerator />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-12 px-6 border-t border-white/5 bg-[#050505] text-silver-500 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer outline-none"
          >
            <div className="p-1 bg-white/10 rounded text-white">
              <MusicIcon size={14} />
            </div>
            <span className="font-heading text-sm text-silver-300 tracking-wider">KıdıMusic</span>
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] text-slate-500">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#showcase" onClick={(e) => scrollToSection(e, 'showcase')} className="hover:text-slate-300 transition-colors">Showcases</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-slate-300 transition-colors">Workflow</a>
            <span className="text-slate-800">|</span>
            <span>Powered by fal.ai</span>
            <span>© {new Date().getFullYear()} KıdıMusic. All rights reserved.</span>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
