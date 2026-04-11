# KıdıMusic ♪ Generator
**Ankara Build Club - Sprint 2 (11.04.2025)**

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

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- fal.ai API key (free account at [fal.ai](https://fal.ai))

### Setup (2 minutes)

1. **Clone and install**:
```bash
git clone <your-repo>
cd minimax-music-app
npm install
```

2. **Add API key**:
   - Get your key from [fal.ai dashboard](https://fal.ai/dashboard)
   - Create `.env.local` file:
     ```env
     NEXT_PUBLIC_FAL_KEY=your_key_here
     ```

3. **Run locally**:
```bash
npm run dev
```
   - Open http://localhost:3000

## 💡 How to Use

### Basic Steps

1. **Describe Your Music**
   - Style, mood, genre, tempo
   - Example: "Lo-fi hip-hop, chill vibes, jazz chords, 85 BPM, midnight study session"

2. **Choose Format**
   - ☑️ Instrumental (no vocals)
   - ☐ Vocal (with singing)

3. **Add Lyrics** (optional, for vocal tracks)
   - Use structure tags: [Intro], [Verse], [Chorus], [Bridge], [Outro], etc.
   - 0-1000 characters max

4. **Generate**
   - Click "Generate Music"
   - Wait for real-time progress updates
   - Cost: $0.15 per generation (It changes which tool will you use!)

5. **Download & Share**
   - Play preview
   - Download as MP3
   - Share on social media

### Example Prompts

- **Pop**: "Catchy pop song, upbeat, summer vibes, dance rhythm, female vocal, 120 BPM"
- **Ambient**: "Peaceful ambient music, soft piano, ethereal pads, relaxation, spa music"
- **Hip-Hop**: "Modern trap beat, 808s, hi-hats, urban streets, confident vocals, 95 BPM"
- **Cinematic**: "Epic orchestral theme, dramatic strings, powerful brass, heroic, adventure"

## 📋 Project Structure

```
minimax-music-app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout (dark theme)
│   │   └── globals.css        # Global styles
│   └── components/
│       └── MusicGenerator.tsx  # Main component (form + tips)
├── .env.local                 # Environment variables
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## 🎛️ Technology Stack

| Package | Purpose |
|---------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI components & hooks |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Styling & responsive design |
| **@fal-ai/client** | MiniMax Music API integration |

## 🔧 API Details

### MiniMax Music 2.6 Endpoint

**URL**: `fal-ai/minimax-music/v2.6`

**Input Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | ✅ | Music style description (10-300 chars) |
| `lyrics` | string | ❌ | Song lyrics with structure tags |
| `is_instrumental` | boolean | ❌ | Generate without vocals (default: false) |

**Output**:
- MP3 audio file (2-3 minutes typical length)
- Hosted on fal.ai CDN

## 💻 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

##  UI Customization

### Color Scheme
- **Background**: Gray-950 (nearly black)
- **Cards**: Gray-900 with gray-800 borders
- **Accent**: Blue-600 (buttons)
- **Info Panel**: Blue-900 with semi-transparent styling

### Modify in `MusicGenerator.tsx`:
```tsx
// Change button color
className="bg-blue-600 hover:bg-blue-700"

// Change background
className="bg-gray-950"

// Change text
className="text-white"
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not set" | Check `.env.local` has `NEXT_PUBLIC_FAL_KEY` |
| Generation fails | Verify fal.ai account balance and API status |
| Build errors | Run `npm install` and check Node.js version (18+) |
| Buttons not working | Clear browser cache and refresh |
| Audio won't download | Check browser popup blocker |

## 📊 Current Features & Status

- ✅ Music generation from prompts
- ✅ Custom lyrics with structure tags  
- ✅ Instrumental music toggle
- ✅ Real-time progress logging
- ✅ Audio player & download
- ✅ Dark theme UI
- ✅ Responsive two-column layout
- ✅ Error handling & validation

## 📝 License

This project is proprietary. Rights reserved.

## 🤝 Support

- **Documentation**: Check README.md
- **Issues**: Create GitHub issue
- **API Help**: Visit [fal.ai docs](https://fal.ai/docs)

## 👨‍💻 Author

Created with ❤️ for AI-powered music generation

---

**Questions or suggestions?** Feel free to contribute or reach out!

## 📝 License

This project is proprietary. Rights reserved.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
