# Floor2Feed Development Checklist

## Phase 1: Foundation

- [ ] Initialize Next.js 14+ project with TypeScript
- [ ] Configure Tailwind CSS with custom theme
- [ ] Install Shadcn/ui and configure components.json
- [ ] Install Framer Motion
- [ ] Install React Hook Form + Zod
- [ ] Set up project structure (folders, files)
- [ ] Configure path aliases (@/)
- [ ] Set up ESLint and Prettier

## Phase 2: Design System

- [ ] Add custom colors to Tailwind config
- [ ] Configure Inter font from next/font/google
- [ ] Create typography scale classes
- [ ] Add custom box shadows
- [ ] Test color palette in browser

## Phase 3: Base Components

- [ ] Button (primary, secondary, ghost variants)
- [ ] Card (with hover effects)
- [ ] Input (with error states)
- [ ] Label
- [ ] Textarea
- [ ] Select dropdown
- [ ] Accordion
- [ ] Dialog/Modal
- [ ] Checkbox

## Phase 4: Layout Components

- [ ] Container (max-width wrapper)
- [ ] Section (padding wrapper)
- [ ] Navbar (desktop)
- [ ] Navbar (mobile hamburger menu)
- [ ] Footer (4-column layout)
- [ ] Footer (newsletter signup)

## Phase 5: Hero Section (PRIORITY)

- [ ] Layout structure (60/40 split)
- [ ] Headline and subheadline
- [ ] CTA buttons with hover animations
- [ ] Video thumbnail/mockup
- [ ] Trust signal text
- [ ] Responsive mobile view
- [ ] Background gradient

## Phase 6: Content Sections

- [ ] Problem section
  - [ ] Visual timeline (3 phases)
  - [ ] Icons and cards
  - [ ] Mobile vertical layout
- [ ] Solution section
  - [ ] 3-column feature grid
  - [ ] Card hover effects
  - [ ] Icons with gold accent
- [ ] Transformation showcase
  - [ ] Before/after comparison
  - [ ] YouTube embed modal
  - [ ] Carousel for examples
- [ ] Deliverables section
  - [ ] 4-column card grid
  - [ ] Image mockups
  - [ ] "Included" badges
- [ ] Process section
  - [ ] 4-step timeline
  - [ ] Gold circular indicators
  - [ ] Scroll reveal animations

## Phase 7: Pricing Calculator (COMPLEX)

- [ ] State management for selections
- [ ] Bundle discount logic
- [ ] Floor2Feed vs Traditional comparison
- [ ] Animated number counters
- [ ] Savings highlight
- [ ] Interactive checkboxes
- [ ] Cost over time chart (optional)
- [ ] Responsive layout

## Phase 8: Social Proof

- [ ] Case Studies section
  - [ ] 3 case study cards
  - [ ] Project details layout
  - [ ] Testimonial quotes
  - [ ] Carousel on mobile
- [ ] FAQ section
  - [ ] Accordion component
  - [ ] 8-10 questions
  - [ ] Smooth animations
  - [ ] Gold chevron icons

## Phase 9: Forms & CTA

- [ ] Contact form
  - [ ] React Hook Form setup
  - [ ] Zod validation schema
  - [ ] All required fields
  - [ ] Error messages
  - [ ] Submit loading state
  - [ ] Success/error feedback
  - [ ] Formspree integration
- [ ] Newsletter signup
  - [ ] Email input
  - [ ] GDPR checkbox
- [ ] Final CTA section
  - [ ] Two-column layout
  - [ ] Form + trust signals

## Phase 10: Animations

- [ ] Scroll-triggered reveals (useInView)
- [ ] Stagger animations for lists
- [ ] Hover effects on buttons
- [ ] Card lift animations
- [ ] Number counter animations
- [ ] Page load animations
- [ ] Smooth scroll behavior

## Phase 11: Interactive Features

- [ ] YouTube modal embed
- [ ] Before/after slider
- [ ] Mobile hamburger menu animation
- [ ] Smooth scroll to sections
- [ ] 3D viewer (optional - if time permits)

## Phase 12: SEO & Meta

- [ ] Page metadata (title, description)
- [ ] Open Graph tags
- [ ] Twitter card tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] Favicon and app icons
- [ ] OG image (1200x630)

## Phase 13: Performance

- [ ] Image optimization (next/image)
- [ ] Lazy loading for images
- [ ] Code splitting for heavy components
- [ ] Font optimization
- [ ] Lighthouse audit (target 90+)
- [ ] Core Web Vitals check

## Phase 14: Accessibility

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] ARIA labels
- [ ] Focus states visible
- [ ] Keyboard navigation
- [ ] Color contrast check (4.5:1)
- [ ] Screen reader testing

## Phase 15: Final Polish

- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Form submission testing
- [ ] Analytics setup (GA4)
- [ ] Console errors check
- [ ] TypeScript errors check
- [ ] ESLint warnings check

## Phase 16: Deployment

- [ ] Environment variables configured
- [ ] Vercel project setup
- [ ] Preview deployment test
- [ ] Production deployment
- [ ] Custom domain (when ready)
- [ ] SSL verification

## Phase 17: Payload CMS Blog (DEPRECATED - Replaced with Keystatic)

> ⚠️ **ABANDONED**: Payload CMS was too complex for our use case. Required PostgreSQL database, migrations, and had persistent 500 errors on Vercel. Replaced with Keystatic (file-based CMS) for simplicity and AI-agent compatibility.

## Phase 18: Keystatic CMS Blog (CURRENT)

### Why Keystatic?
- ✅ File-based (no database required)
- ✅ Visual admin UI at `/keystatic`
- ✅ AI-agent friendly (Claude Code can edit content files directly)
- ✅ Content stored in Git (version history)
- ✅ Free, open source
- ✅ Perfect for SEO (static generation)
- ✅ Works with Vercel out of the box

### Phase 18.1: Remove Payload CMS
- [ ] Uninstall Payload dependencies (payload, @payloadcms/*, drizzle-orm, etc.)
- [ ] Delete payload.config.ts
- [ ] Delete src/collections/ folder
- [ ] Delete src/app/(payload)/ folder
- [ ] Delete src/payload-types.ts
- [ ] Remove withPayload from next.config.ts
- [ ] Remove Payload-related env vars from .env.local
- [ ] Clean up package.json scripts

### Phase 18.2: Install Keystatic
- [x] Install @keystatic/core and @keystatic/next
- [x] Create keystatic.config.tsx with schema
- [x] Set up /keystatic API route
- [x] Set up /keystatic admin route

### Phase 18.3: Content Schema
- [x] Posts collection:
  - title, slug, excerpt, publishedAt, status (draft/published)
  - featuredImage (local file path)
  - content (MDX/Markdoc)
  - author (reference)
  - category (reference)
  - tags (array)
  - seo (metaTitle, metaDescription, ogImage)
  - readTime
- [x] Categories collection:
  - name, slug, description
- [x] Authors collection:
  - name, slug, role, bio, avatar, social (twitter, linkedin)

### Phase 18.4: Content Structure
- [x] Create content/ directory
- [x] Create content/posts/ for blog posts
- [x] Create content/categories/ for categories
- [x] Create content/authors/ for authors
- [x] Create public/images/blog/ for blog images

### Phase 18.5: Update Blog Components
- [x] Update BlogCard to use Keystatic data
- [x] Update BlogList to fetch from content files
- [x] Update /blog page to read from Keystatic
- [x] Update /blog/[slug] page for individual posts
- [x] Update MDXContent component for MDX rendering
- [x] Update RelatedPosts component
- [x] Keep existing styling and animations

### Phase 18.6: SEO & Testing
- [x] Build succeeds without errors
- [ ] Test /keystatic admin UI locally
- [ ] Create sample blog post via admin
- [ ] Test responsive design
- [ ] Deploy to Vercel
- [ ] Verify admin UI works in production

---

## Progress Tracking

| Phase | Status | Completion |
|-------|--------|------------|
| 1. Foundation | ✅ Complete | 100% |
| 2. Design System | ✅ Complete | 100% |
| 3. Base Components | ✅ Complete | 100% |
| 4. Layout Components | ✅ Complete | 100% |
| 5. Hero Section | ✅ Complete | 100% |
| 6. Content Sections | ✅ Complete | 100% |
| 7. Pricing Calculator | ✅ Complete | 100% |
| 8. Social Proof | ✅ Complete | 100% |
| 9. Forms & CTA | ✅ Complete | 100% |
| 10. Animations | ✅ Complete | 100% |
| 11. Interactive | ✅ Complete | 100% |
| 12. SEO & Meta | ✅ Complete | 100% |
| 13. Performance | 🔄 In Progress | 50% |
| 14. Accessibility | 🔄 In Progress | 70% |
| 15. Final Polish | 🔄 In Progress | 30% |
| 16. Deployment | ✅ Complete | 100% |
| 17. Payload CMS | ❌ Abandoned | - |
| 18. Keystatic CMS | ✅ Complete | 90% |

**Overall Progress**: 92%

## Latest Updates
- ✅ Added logo image to Navbar
- ✅ Set up images from Files folder in public/
- ✅ Local dev server running (localhost:3000)
- ❌ Payload CMS abandoned (December 28, 2025) - Too complex, database issues
- ✅ New 3-tier pricing section (Essential, Professional, Premium Luxury)
- ✅ 360° panorama viewer with pinch/scroll zoom
- ✅ Keystatic CMS fully integrated (December 28, 2025)
  - Blog pages connected to file-based content
  - MDX content rendering with custom components
  - Admin UI available at /keystatic
  - Removed all Payload CMS remnants

## Completed Sections
- ✅ Hero section (with video thumbnail, CTAs, floating stats)
- ✅ Problem section (3-phase timeline with emojis)
- ✅ Solution section (3-column feature grid)
- ✅ Deliverables section (4-column cards with badges)
- ✅ Process section (4-step timeline)
- ✅ Pricing Tiers (3-tier with cost comparison bars)
- ✅ Case Studies section (3 projects with carousel)
- ✅ FAQ section (10-item accordion)
- ✅ Contact CTA section (form with validation)
- ✅ SEO structured data (JSON-LD)
- ✅ Transformation section (360° viewer with tabs)

---

*Last Updated: December 28, 2025*
