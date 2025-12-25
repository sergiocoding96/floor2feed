# CLAUDE.md - Floor2Feed Project Guide

## Project Overview

Floor2Feed is a high-converting landing page for an AI-powered social media management service targeting Spanish real estate developers.

#Rules

- Use Subagents, skills, and MCP installed whenever possible
- Always, after every action, update claude.md and Todo.md file to

## Target Customer Persona

- **Name**: Miguel, 42-year-old Spanish real estate developer
- **Company**: Mid-sized development firm (15-50 employees)
- **Projects**: 20-50 unit developments, €300k-€700k per unit
- **Locations**: Costa del Sol, Madrid, Barcelona, Valencia
- **Pain Point**: Time-poor (60-70hr weeks), needs professional marketing, competes with bigger developers

## Brand Positioning

- **NOT**: A cheap social media tool or generic marketing agency
- **IS**: The "operating system" for serious developers
- **Aesthetic**: High-tech luxury (think Tesla, Airbnb Luxe, Stripe)
- **Visual Style**: European architectural sophistication meets tech elegance

## Tech Stack

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config in globals.css)
- **Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **CMS**: Payload CMS 3.0
- **Database**: Supabase PostgreSQL
- **Rich Text**: Lexical Editor (@payloadcms/richtext-lexical)
- **Deployment**: Vercel

## Design System

### Colors

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Midnight Charcoal | `--midnight` | `#1A1A1D` | Primary text, headings |
| Pearl White | `--pearl` | `#F8F9FA` | Primary background |
| Silver Mist | `--silver` | `#E8E9EB` | Dividers, borders |
| Burnished Gold | `--gold` | `#D4A574` | CTAs, key accents (PRIMARY) |
| Light Gold | `--gold-light` | `#E8D5B7` | Subtle backgrounds |
| Deep Bronze | `--bronze` | `#A67C52` | Active states |

Use Tailwind classes: `bg-midnight`, `text-gold`, `border-silver`, etc.

### Typography

- **Font**: Inter (loaded via next/font/google)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Animation Principles

- **Fast interactions**: 200ms (hover, clicks)
- **Content reveals**: 400ms (scroll animations)
- **Easing**: `ease-out` or `[0.4, 0, 0.2, 1]`
- **Movement**: Subtle (max 20px translate, 1.02 scale)

## Project Structure

```
├── payload.config.ts           # Payload CMS configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles + Tailwind theme
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing page
│   │   │   └── [slug]/page.tsx # Individual blog post
│   │   └── (payload)/
│   │       ├── admin/[[...segments]]/page.tsx  # Admin panel
│   │       ├── layout.tsx      # Payload layout
│   │       └── admin.css       # Admin theme (gold/midnight)
│   ├── collections/            # Payload CMS collections
│   │   ├── Users.ts            # Admin users
│   │   ├── Media.ts            # Image uploads
│   │   ├── Categories.ts       # Blog categories
│   │   ├── Authors.ts          # Author profiles
│   │   └── Posts.ts            # Blog posts with SEO fields
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── layout/             # Navbar, Footer, Section, Container
│   │   ├── sections/           # Hero, Problem, Solution, etc.
│   │   ├── features/           # YouTubeEmbed, Timeline, etc.
│   │   ├── forms/              # ContactForm, Newsletter
│   │   └── blog/               # Blog components
│   │       ├── BlogCard.tsx    # Post card with hover effects
│   │       ├── BlogList.tsx    # Grid with stagger animations
│   │       ├── BlogHero.tsx    # Hero for /blog page
│   │       ├── CategoryFilter.tsx  # Category tabs
│   │       ├── RichText.tsx    # Lexical content renderer
│   │       ├── BlogAuthor.tsx  # Author bio card
│   │       ├── ShareButtons.tsx    # Social sharing
│   │       └── RelatedPosts.tsx    # Related articles
│   ├── lib/
│   │   ├── utils.ts            # cn() function, utilities
│   │   └── animations.ts       # Framer Motion variants
│   ├── hooks/                  # Custom hooks
│   └── payload-types.ts        # Auto-generated Payload types
```

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

## Key Implementation Notes

### Buttons

```tsx
// Primary (Gold CTA)
<button className="bg-gold hover:bg-bronze text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
  Watch Demo
</button>

// Secondary (Outlined)
<button className="border-2 border-midnight text-midnight hover:bg-midnight hover:text-white font-medium px-8 py-4 rounded-lg transition-all duration-300">
  Learn More
</button>
```

### Framer Motion Animations

```tsx
import { motion } from "framer-motion";

// Fade in up variant
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Stagger children
const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};
```

### Form Validation (Zod)

```tsx
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectName: z.string().min(2, "Project name required"),
  units: z.enum(["<20", "20-50", "50-100", "100+"]),
});
```

## Quality Checklist

- [ ] Lighthouse Performance: 90+
- [ ] Mobile responsive (375px - 1536px)
- [ ] Touch targets: min 44px height
- [ ] Color contrast: 4.5:1 minimum
- [ ] Semantic HTML structure
- [ ] No console errors
- [ ] TypeScript: No type errors
- [ ] Forms validated and submitting

## Completed Sections

1. **Hero**: ✅ 60/40 split, headline, CTAs, video thumbnail, floating stats
2. **Problem**: ✅ 3-phase timeline showing developer pain points with emojis
3. **Solution**: ✅ 3-column feature grid with hover effects
4. **Deliverables**: ✅ 4-column card grid with mockups and "Included" badges
5. **Pricing Calculator**: ✅ Interactive comparison with animated counters
6. **Process**: ✅ 4-step timeline (Days 1-7, then ongoing)
7. **Case Studies**: ✅ 3 project cards with testimonials and mobile carousel
8. **FAQ**: ✅ Accordion with 10 questions
9. **Final CTA**: ✅ Contact form with React Hook Form + Zod validation
10. **Blog (Payload CMS)**: ✅ Full blog with admin panel, categories, authors, SEO

## Blog Setup (Payload CMS)

### Environment Variables Required

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SITE_URL=https://floor2feed.com
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Admin Panel Access

- URL: `/admin`
- First user created becomes admin
- Gold/midnight themed to match brand

### Blog Routes

- `/blog` - Blog listing with category filter
- `/blog/[slug]` - Individual post with SEO metadata

## Important Reminders

- Use gold accent SPARINGLY - only on CTAs and key elements
- Maintain generous white space (py-16 mobile, py-24 desktop)
- Animations should be elegant, not bouncy
- Always use `next/image` for images with proper alt text
- Mobile-first responsive design
- Spanish + English content support in forms
