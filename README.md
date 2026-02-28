# DJ Blaqmix Website

Official website and booking platform for DJ Blaqmix (The Dimple DJ), built to showcase brand identity, upcoming events, and a smooth enquiry/booking workflow.

## Features

- Cinematic hero reveal with GSAP-powered mask animation and loading overlay.
- Fully responsive layout and interactions across mobile, tablet, and desktop.
- Animated sections for intro, about, BlaqHouse highlights, and storytelling content.
- Upcoming events pulled from Sanity CMS and rendered in a horizontal carousel with status badges.
- Dedicated enquiry form and separate booking page with modern UI and validation.
- Anti-spam protection (honeypot, submit timing checks, and rate limiting).
- Email workflow for both forms:
  - sends submission details to owner inbox
  - sends confirmation email to the visitor
- SEO setup with metadata, Open Graph/Twitter cards, `robots.txt`, `sitemap.xml`, and JSON-LD structured data.
- Brand-aligned footer with direct social links for Blaqmix and BlaqHouse.

## Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP (`ScrollTrigger`, `SplitText`, `@gsap/react`)
- **Forms & UX:** `react-hook-form`, `react-hot-toast`
- **Icons:** Font Awesome
- **CMS:** Sanity (content + studio)
- **Email:** Nodemailer (SMTP)
- **Deployment target:** Vercel-friendly setup

## Getting Started

### 1) Prerequisites

- Node.js 20+ recommended
- npm

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the project root and set:

```env
# Public site + SEO
NEXT_PUBLIC_SITE_URL=

# Sanity (events)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# SMTP (Nodemailer)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_FROM=

# Form destination emails
BOOKING_REPLY_TO=
ENQUIRY_REPLY_TO=
```

### 4) Run the app locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5) Optional: Run Sanity Studio locally

```bash
npm run sanity:dev
```

Open `http://localhost:3333`.

## Project Structure

```text
.
├── app/                    # Next.js routes, layouts, metadata routes, API routes
│   ├── api/                # /api/contact and /api/booking handlers
│   ├── make-booking/       # Dedicated booking page + route metadata
│   ├── robots.ts           # robots.txt generator
│   ├── sitemap.ts          # sitemap.xml generator
│   ├── layout.tsx          # Global layout + global SEO metadata
│   └── page.tsx            # Homepage composition + JSON-LD
├── components/
│   ├── global/             # Header, Footer
│   ├── pageSection/        # Hero, About, Events, Contact, BlaqHouse sections
│   └── UI/                 # Shared UI atoms
├── lib/                    # Sanity client/queries, mailer, form security, event fetchers
├── sanity/                 # Sanity schema definitions
├── public/                 # Static assets (images, logos, fonts)
├── types/                  # Shared TypeScript types
├── sanity.config.ts        # Sanity Studio config
└── next.config.ts          # Next.js config (including remote image settings)
```

## Contact

- Booking page: `/make-booking`
- Enquiries: homepage contact section (`/#contact`)
- Socials:
  - Instagram (DJ Blaqmix): https://www.instagram.com/djblaqmix
  - YouTube: https://youtube.com/@djblaqmix
  - TikTok (DJ Blaqmix): https://www.tiktok.com/@djblaqmix
  - Instagram (BlaqHouse): https://www.instagram.com/blaqhousehq
  - TikTok (BlaqHouse): https://www.tiktok.com/@blaqhousehq
