# ZOE Wiki - Interactive Internal Knowledge Base

A beautiful, interactive wiki for your startup's internal documentation, featuring a dynamic timeline visualization of your product roadmap.

## Features

- 🚀 **Interactive Timeline**: Beautiful, clickable roadmap with expand/collapse functionality
- 📝 **Markdown Support**: Full markdown rendering for rich content
- 🎨 **Beautiful UI**: Modern design with smooth animations using Framer Motion
- 📱 **Responsive**: Works perfectly on all devices
- 🔐 **Auth Ready**: Pre-configured for Gmail authentication (currently disabled)
- ⚡ **Fast**: Built with Next.js 15 for optimal performance

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
zoe-wiki/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── roadmap/           # Roadmap timeline page
│   ├── values/            # Company values page
│   ├── strengths/         # Strengths & positioning page
│   └── one-sentence/      # Mission statement page
├── components/            # Reusable components
│   ├── Timeline.tsx       # Interactive timeline component
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── MarkdownContent.tsx # Markdown renderer
├── lib/                   # Utilities and data
│   ├── roadmap-data.ts    # Roadmap timeline data
│   ├── wiki-content.ts    # Wiki page content
│   └── auth-config.ts     # Authentication setup (disabled)
└── public/                # Static assets
```

## Customizing Content

### Update Roadmap Data
Edit `lib/roadmap-data.ts` to modify the timeline items, milestones, and dates.

### Modify Wiki Content
Edit `lib/wiki-content.ts` to update the content for Values, Strengths, and One Sentence pages.

### Add New Pages
1. Create a new folder in `app/` directory
2. Add a `page.tsx` file
3. Add navigation link in `components/Sidebar.tsx`

## Enabling Gmail Authentication

When you're ready to secure the wiki:

1. **Create Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials

2. **Set Environment Variables**:
   Create `.env.local` file:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Enable Authentication**:
   - Uncomment the code in `lib/auth-config.ts`
   - Create `app/api/auth/[...nextauth]/route.ts`
   - Wrap the app with SessionProvider

## Deployment

### Deploy to Vercel (Recommended)
```bash
npx vercel
```

### Deploy to Other Platforms
Build the production version:
```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Markdown**: Markdown rendering
- **Lucide Icons**: Beautiful icon set
- **NextAuth.js**: Authentication (ready to enable)

## License

This project is proprietary and confidential.

---

Built with ❤️ for ZOE's internal team
