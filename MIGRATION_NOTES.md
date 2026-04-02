# Readly Bookstore - Vite to Next.js Migration

## Changes Made

### Deleted Vite Files
- ✅ Removed `vite.config.js` - No longer needed with Next.js
- ✅ Removed `index.html` - Next.js uses `app/layout.tsx` instead

### Fixed CSS/Tailwind Configuration
- ✅ Updated `globals.css` to use proper Tailwind v3/v4 syntax:
  - Changed from `@import 'tailwindcss'` to `@tailwind base; @tailwind components; @tailwind utilities;`
  - Removed v4-specific `@theme` directive (not yet fully supported in Next.js)
  - Added CSS variables for fonts and colors

- ✅ Verified `tailwind.config.ts` is properly configured:
  - Maps CSS variables to Tailwind color utilities
  - Extends theme with custom colors and fonts
  - Content paths point to `app/**` and `components/**`

- ✅ Verified `postcss.config.js` is correct:
  - Includes tailwindcss and autoprefixer plugins
  - Properly processes CSS through PostCSS pipeline

- ✅ Updated `.gitignore` for Next.js:
  - Changed from Vite patterns to Next.js patterns
  - Added `.next/`, `.env.local`, and other Next.js-specific entries

### Updated Layout
- ✅ Modified `app/layout.tsx`:
  - Changed from hardcoded `bg-white text-slate-900` to `bg-background text-foreground`
  - Now uses CSS variables for consistent theming

## How CSS Works Now

1. **CSS Variables** (`globals.css`):
   - Defines base colors and layout tokens
   - Used by components via `var(--primary)`, `var(--accent)`, etc.

2. **Tailwind Config** (`tailwind.config.ts`):
   - Maps CSS variables to Tailwind utility classes
   - Example: `bg-primary` → `var(--primary)`

3. **PostCSS** (`postcss.config.js`):
   - Processes Tailwind directives
   - Adds vendor prefixes for browser compatibility

## Technology Stack (Next.js Only)
- ✅ Next.js 15 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS v3
- ✅ Supabase for backend
- ✅ No Vite - Clean Next.js project

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 to see the fully styled Readly Bookstore!

## Color Scheme
- **Primary**: Dark Green (#1f4620)
- **Accent**: Warm Gold (#c9a861)
- **Secondary**: Cream/Beige (#f5e6d3)
- **Background**: White (#ffffff)
- **Foreground**: Dark (#1a1a1a)

All colors are defined as CSS variables in `:root` and can be customized in `app/globals.css`.
