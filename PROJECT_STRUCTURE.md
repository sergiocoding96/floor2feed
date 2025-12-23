# Floor2Feed Project Structure

```
floor2feed-website/
├── .next/                      # Next.js build output (auto-generated)
├── node_modules/               # Dependencies (auto-generated)
├── public/                     # Static assets
│   ├── images/
│   │   ├── hero/               # Hero section images
│   │   ├── projects/           # Case study project images
│   │   ├── deliverables/       # Deliverable mockups
│   │   └── logos/              # Brand logos
│   ├── favicon.ico
│   ├── og-image.jpg            # Open Graph image (1200x630)
│   └── twitter-image.jpg       # Twitter card image
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Homepage (landing page)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   └── not-found.tsx       # 404 page
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI components (Shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── checkbox.tsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── navbar.tsx      # Main navigation
│   │   │   ├── footer.tsx      # Site footer
│   │   │   ├── section.tsx     # Section wrapper
│   │   │   └── container.tsx   # Max-width container
│   │   │
│   │   ├── sections/           # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── problem.tsx
│   │   │   ├── solution.tsx
│   │   │   ├── transformation.tsx
│   │   │   ├── deliverables.tsx
│   │   │   ├── pricing-calculator.tsx
│   │   │   ├── process.tsx
│   │   │   ├── case-studies.tsx
│   │   │   ├── faq.tsx
│   │   │   └── final-cta.tsx
│   │   │
│   │   ├── features/           # Feature components
│   │   │   ├── youtube-embed.tsx
│   │   │   ├── before-after.tsx
│   │   │   ├── timeline.tsx
│   │   │   ├── animated-counter.tsx
│   │   │   └── three-d-viewer.tsx (optional)
│   │   │
│   │   └── forms/              # Form components
│   │       ├── contact-form.tsx
│   │       └── newsletter-signup.tsx
│   │
│   ├── lib/                    # Utility functions
│   │   ├── utils.ts            # General utilities (cn function)
│   │   ├── gtag.ts             # Google Analytics helpers
│   │   └── animations.ts       # Framer Motion variants
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-scroll-animation.ts
│   │   └── use-media-query.ts
│   │
│   └── types/                  # TypeScript types
│       └── index.ts
│
├── .env.local.example          # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── components.json             # Shadcn/ui configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment config
├── README.md                   # Project documentation
├── PROJECT_STRUCTURE.md        # This file
└── TODO.md                     # Development checklist
```

## Component Architecture

### UI Components (src/components/ui/)

Base components styled with Tailwind CSS and Shadcn/ui patterns:

- **Button**: Primary (gold), secondary (outlined), ghost variants
- **Card**: Hover effects, optional gold accent border
- **Input/Textarea**: Form inputs with error states
- **Select**: Custom dropdown styling
- **Accordion**: FAQ component with smooth animations
- **Dialog**: Modal for video embeds

### Layout Components (src/components/layout/)

- **Navbar**: Sticky header, mobile hamburger menu, gold CTA button
- **Footer**: 4-column layout, newsletter signup, social links
- **Section**: Consistent padding wrapper (py-16 mobile, py-24 desktop)
- **Container**: Max-width 1280px (max-w-7xl)

### Section Components (src/components/sections/)

Each section is a self-contained component with:
- Framer Motion scroll animations
- Responsive layouts
- Semantic HTML structure
- Accessibility attributes

### Feature Components (src/components/features/)

Interactive and reusable:
- **YouTubeEmbed**: Modal with embedded player
- **BeforeAfter**: Slider comparison component
- **Timeline**: Animated vertical/horizontal timeline
- **AnimatedCounter**: Number animation for pricing

## Styling Conventions

### Tailwind Class Order

1. Layout (flex, grid, position)
2. Sizing (w-, h-, max-w-)
3. Spacing (p-, m-, gap-)
4. Typography (text-, font-, leading-)
5. Colors (bg-, text-, border-)
6. Effects (shadow-, opacity-)
7. Transitions (transition-, duration-)
8. Responsive modifiers last (md:, lg:)

### Animation Patterns

All animations use Framer Motion with consistent timing:
- Fast interactions: 200ms
- Content reveals: 400ms
- Page transitions: 300ms
- Easing: `ease-out` or `[0.4, 0, 0.2, 1]`

## Import Aliases

```typescript
// tsconfig.json paths
"@/*": ["./src/*"]

// Usage
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/sections/hero"
```
