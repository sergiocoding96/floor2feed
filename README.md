# Floor2Feed - AI-Powered Real Estate Marketing

A high-converting landing page for Floor2Feed, an AI-powered social media management service for Spanish real estate developers.

## Target Audience

- **Primary Persona**: Miguel, 42-year-old Spanish real estate developer
- **Company Size**: Mid-sized development firm (15-50 employees)
- **Projects**: 20-50 unit developments, €300k-€700k per unit
- **Locations**: Costa del Sol, Madrid, Barcelona, Valencia

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3.4+
- **Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Brand Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Midnight Charcoal | `#1A1A1D` | Primary text, headings |
| Pearl White | `#F8F9FA` | Primary background |
| Silver Mist | `#E8E9EB` | Dividers, borders |
| Burnished Gold | `#D4A574` | CTAs, accents (PRIMARY) |
| Light Gold | `#E8D5B7` | Subtle backgrounds |
| Deep Bronze | `#A67C52` | Active states, shadows |

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd floor2feed-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
FORMSPREE_ID=your_formspree_id
NEXT_PUBLIC_SITE_URL=https://floor2feed.com
```

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed file organization.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## Deployment

The project is configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Key Features

- Responsive design (mobile-first)
- Scroll-triggered animations
- Interactive pricing calculator
- Contact form with validation
- YouTube video embeds
- SEO optimized with structured data
- WCAG 2.1 AA accessibility compliance

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+
- Page Load: < 3 seconds

## License

Proprietary - Floor2Feed © 2025
