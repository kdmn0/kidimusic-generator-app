import MusicGenerator from '@/components/MusicGenerator';

export const metadata = {
  title: 'KıdıMusic - AI Music Generator',
  description: 'Create professional music tracks with MiniMax Music 2.6 AI',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl animate-pulse">🎵</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">KıdıMusic AI Generator</span>
            <span className="text-3xl animate-pulse" style={{animationDelay: '0.5s'}}>🎵</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Music
          </h1>
          <p className="text-xl text-gray-300 mb-4">Bring your dreamed music to life with AI</p>
          <p className="text-gray-400 text-sm">Create complete music tracks with melodies, lyrics and harmonic tones</p>
        </div>
      </div>

      {/* Main Content */}
      <MusicGenerator />

      {/* Footer Waves */}
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.87,168.19-17.8,250.6-.3C823.78,31,906.4,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave)" fillOpacity="0.1"></path>
          <defs>
            <linearGradient id="wave" x1="0" x2="1200" y1="0" y2="0">
              <stop offset="0%" stopColor="#a78bfa"></stop>
              <stop offset="50%" stopColor="#ec4899"></stop>
              <stop offset="100%" stopColor="#60a5fa"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </main>
  );
}
