import MusicGenerator from '@/components/MusicGenerator';

export const metadata = {
  title: 'KıdıMusic',
  description: 'Create complete music tracks with MiniMax Music 2.6 AI',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MusicGenerator />
    </main>
  );
}
