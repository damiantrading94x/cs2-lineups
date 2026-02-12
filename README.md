# CS2 Lineups

Save and share CS2 grenade lineups with your squad. Never forget a smoke again.

## Features

- All 7 competitive maps (Mirage, Inferno, Nuke, Ancient, Anubis, Dust II, Train)
- Upload lineups via YouTube link or file upload (images/videos)
- Filter by grenade type (Smoke, Flash, Molotov, HE) and side (T/CT)
- Dark / Light mode toggle
- Shared database — all your mates see the same lineups
- Deployable to Vercel for free

## Quick Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **SQL Editor** and paste the contents of `supabase/schema.sql` — run it
3. Go to **Settings → API** and copy your **Project URL** and **anon public key**

### 3. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3100](http://localhost:3100)

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add the two environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings
4. Deploy — share the URL with your mates

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** (styling)
- **next-themes** (dark/light mode)
- **Supabase** (database + file storage)
- **Vercel** (hosting)
