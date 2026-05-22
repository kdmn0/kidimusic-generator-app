# KıdıMusic ♪ Generator
**Ankara Build Club - Sprint 2 (11.04.2025)**

[🇹🇷 Türkçe Sürüm Aşağıdadır](#kıdımusic--generator-tr)

A Next.js web application that creates complete music tracks using the MiniMax Music 2.6 AI model from fal.ai. Generate professional-quality music with vocals, backing music, and detailed arrangements—all from simple style descriptions and optional lyrics.

## ✨ Features

- 🎵 **One-Click Music Generation** - Create complete songs instantly from style descriptions
- 🎤 **Vocal & Lyrics Support** - Add custom lyrics with structure tags (Verse, Chorus, Bridge, etc.)
- 🎸 **Instrumental Tracks** - Toggle between vocal and instrumental music
- 🎼 **Full Arrangements** - Includes singing, backing music, and detailed orchestration
- 📥 **Easy Download** - Export generated audio as high-quality MP3
- ⚡ **Real-time Progress** - Watch generation logs as your track is created
- 🌙 **Dark Theme UI** - Modern, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Works seamlessly on desktop and mobile
- 💾 **Two-Column Layout** - Form on left, helpful tips on right

## 🎛️ Technology Stack

| Package | Purpose |
|---------|---------|
| **Next.js 15+** | React framework with App Router |
| **React 19** | UI components & hooks |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling & responsive design |
| **Framer Motion** | Fluid animations and scroll effects |
| **@fal-ai/client** | MiniMax Music API integration |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- fal.ai API key (free account at [fal.ai](https://fal.ai))

### Setup 

1. **Clone and install**:
```bash
git clone <your-repo>
cd minimax-music-app
npm install
```

2. **Add API key**:
   - Get your key from [fal.ai dashboard](https://fal.ai/dashboard)
   - Create `.env.local` file in the root directory:
     ```env
     NEXT_PUBLIC_FAL_KEY=your_key_here
     ```

3. **Run locally**:
```bash
npm run dev
```
   - Open http://localhost:3000

## 💡 How to Use

1. **Describe Your Music**: Enter the style, mood, genre, and tempo.
2. **Choose Format**: Toggle Instrumental if you do not want vocals.
3. **Add Lyrics**: Optional for vocal tracks. Use structure tags like `[Verse]`, `[Chorus]`.
4. **Generate**: Click the generate button and wait for the AI to compose your track.
5. **Download**: Play the preview or download the high-quality MP3 directly.

## 📋 Project Structure

```
minimax-music-app/
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page & landing
│   │   ├── layout.tsx         # Root layout (dark theme)
│   │   └── globals.css        # Global styles
│   └── components/
│       ├── CustomAudioPlayer.tsx # Custom UI for audio playback
│       ├── Icons.tsx             # SVG icons
│       └── MusicGenerator.tsx    # Main AI generator component
├── .env.local                 # Environment variables
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

---

<br/>
<br/>

<a id="kıdımusic--generator-tr"></a>

# KıdıMusic ♪ Generator (TR)
**Ankara Build Club - Sprint 2 (11.04.2025)**

fal.ai'nin MiniMax Music 2.6 yapay zeka modelini kullanarak sıfırdan ve tam bir müzik parçası oluşturan Next.js web uygulamasıdır. Yalnızca basit bir stil açıklaması (ve isteğe bağlı sözler) girerek profesyonel kalitede vokaller, arka plan müzikleri ve detaylı aranjmanlara sahip parçalar üretebilirsiniz.

## ✨ Özellikler

- 🎵 **Tek Tıkla Müzik Üretimi** - Sadece stil açıklaması yazarak saniyeler içinde şarkı oluşturun.
- 🎤 **Vokal ve Şarkı Sözü Desteği** - (Verse, Chorus, Bridge vb.) yapı etiketleri kullanarak kendi sözlerinizi ekleyin.
- 🎸 **Enstrümantal Parçalar** - Vokalli veya sadece enstrümantal müzik arasında geçiş yapın.
- 🎼 **Tam Aranjman** - Şarkı söyleme, arka plan müziği ve detaylı orkestrasyon içerir.
- 📥 **Kolay İndirme** - Üretilen müziği yüksek kaliteli MP3 formatında indirin.
- ⚡ **Gerçek Zamanlı İlerleme** - Şarkınız oluşturulurken işlem loglarını anlık olarak izleyin.
- 🌙 **Koyu Tema (Dark Mode)** - Tailwind CSS ile modern ve duyarlı tasarım.
- 📱 **Mobil Uyumluluk** - Masaüstü ve mobil cihazlarda sorunsuz çalışır.

## 🎛️ Kullanılan Teknolojiler

| Paket | Kullanım Amacı |
|---------|---------|
| **Next.js 15+** | App Router özellikli React framework'ü |
| **React 19** | Kullanıcı arayüzü bileşenleri |
| **TypeScript** | Tip güvenli geliştirme |
| **Tailwind CSS** | Stil ve duyarlı tasarım |
| **Framer Motion** | Akıcı animasyonlar ve kaydırma efektleri |
| **@fal-ai/client** | MiniMax Music API entegrasyonu |

## 🚀 Başlangıç

### Gereksinimler

- Node.js 18+ ve npm
- fal.ai API anahtarı ([fal.ai](https://fal.ai) üzerinden ücretsiz hesap açabilirsiniz)

### Kurulum

1. **Projeyi indirin ve bağımlılıkları kurun**:
```bash
git clone <your-repo>
cd minimax-music-app
npm install
```

2. **API anahtarını ekleyin**:
   - Anahtarınızı [fal.ai panosu](https://fal.ai/dashboard) üzerinden alın.
   - Proje ana dizininde `.env.local` dosyası oluşturun:
     ```env
     NEXT_PUBLIC_FAL_KEY=sizin_api_anahtariniz
     ```

3. **Uygulamayı çalıştırın**:
```bash
npm run dev
```
   - Tarayıcınızda http://localhost:3000 adresine gidin.

## 💡 Nasıl Kullanılır?

1. **Müziğinizi Tarif Edin**: Stil, ruh hali, tür ve tempo bilgilerini girin.
2. **Format Seçin**: Vokal istemiyorsanız "Instrumental" seçeneğini aktif hale getirin.
3. **Sözleri Ekleyin**: Vokalli parçalar için isteğe bağlıdır. `[Verse]`, `[Chorus]` gibi etiketler kullanarak şarkı yapısını belirtebilirsiniz.
4. **Üretin**: Üret butonuna tıklayın ve yapay zekanın parçanızı bestelemesini bekleyin.
5. **İndirin**: Üretilen müziği dinleyin veya yüksek kaliteli MP3 olarak cihazınıza indirin.

## 📋 Proje Yapısı

```
minimax-music-app/
├── public/                    # Statik dosyalar
├── src/
│   ├── app/
│   │   ├── page.tsx           # Ana sayfa
│   │   ├── layout.tsx         # Kök düzen dosyası (koyu tema ayarları)
│   │   └── globals.css        # Global CSS stilleri
│   └── components/
│       ├── CustomAudioPlayer.tsx # Özel ses oynatıcı bileşeni
│       ├── Icons.tsx             # SVG ikonlar
│       └── MusicGenerator.tsx    # Ana yapay zeka üretici bileşeni
├── .env.local                 # Çevresel değişkenler
├── package.json               # Proje bağımlılıkları
├── tailwind.config.ts         # Tailwind ayarları
├── tsconfig.json              # TypeScript ayarları
└── README.md                  # Bu dosya
```

## 📝 Lisans

Bu proje tescillidir. Tüm hakları saklıdır.
