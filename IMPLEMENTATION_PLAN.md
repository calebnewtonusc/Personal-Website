# Implementation Plan - Chih Bo Design Replication

## Key Design Elements from Chih Bo's Site

### 1. Typography & Sizing
- Main heading: `text-3xl sm:text-5xl md:text-6xl` → "hi, i'm brian chen"
- Currently using: `text-24px` for name
- **ACTION**: Increase heading sizes dramatically

### 2. Glass Morphism Company Tags
Chih Bo uses inline glassmorphism containers with company logos:
```html
<div class="glass-shell !w-auto !inline-flex">
  <div class="glass-surface group font-medium" style="border-radius: 999px; padding: 0.375rem 0.75rem; backdrop-filter: blur(58px) saturate(180%); box-shadow: [complex]">
    <span class="flex items-center gap-2">
      <img width="18" height="18" src="logo.png" class="rounded-sm">
      <span class="font-medium text-sm">Company Name</span>
    </span>
  </div>
</div>
```

**ACTION**: Create `GlassTag` component with company logo support

### 3. Timeline Design
- Vertical line on left: `absolute left-[10px] top-0 bottom-0 w-[2px] bg-foreground/10`
- Timeline dots: `absolute left-[6px] top-[10px] h-3 w-3 rounded-full bg-[rgb(var(--accent))]`
- Shadow on dots: `shadow-[0_0_0_3px_rgba(59,130,246,0.15)]`
- Connecting line: `absolute left-[2px] top-[14px] h-[2px] w-4`

**ACTION**: Update timeline styling to match exactly

### 4. Nested Bullets with Borders
- Parent bullet: `h-1.5 w-1.5 rounded-full bg-foreground/40`
- Child bullets: `h-1 w-1 rounded-full bg-[rgb(var(--accent))]/60`
- Border line: `border-l pl-4 space-y-1 border-[rgb(var(--accent))]/20`

**ACTION**: Add nested bullet support in timeline

### 5. Hyperlinks
- Blue hyperlinks: `text-blue-500 hover:underline`
- Company links with glassmorphism containers
- Regular text links for projects

**ACTION**: Add comprehensive hyperlinks

### 6. Company Logos Needed

#### USC
- URL: https://seeklogo.com/vector-logo/362104/university-of-southern-california-usc
- Size: 18x18px
- Format: PNG

#### Aina Tech
- Need to find logo from https://ainatech.com
- Size: 18x18px
- Format: PNG

#### Caltech
- URL: Search for Caltech logo
- Size: 18x18px
- Format: PNG

#### Impact 360 Institute
- URL: Search for Impact 360 logo
- Size: 18x18px
- Format: PNG

#### San Marino High School
- Custom or use generic school icon
- Size: 18x18px
- Format: PNG

### 7. Footer
Chih Bo's footer: `© 2026 Brian Chen. Built with Next.js + Tailwind.`
Current: Too long and verbose

**ACTION**: Simplify footer to match

### 8. Navbar
Chih Bo uses glassmorphism pill for active nav item with complex shadow effects

**ACTION**: Update navbar active state styling

## Priority Order
1. ✅ Photo rotation/overlap on About page (DONE)
2. 📦 Download company logos (18x18px each)
3. 🎨 Create GlassTag component
4. 📏 Update typography sizes to match
5. 🔗 Add all hyperlinks
6. 🎯 Update timeline design with nested bullets
7. 🧹 Clean up footer
8. ✨ Add glassmorphism to navbar active state

## Logo Resources
- **SeekLogo**: https://seeklogo.com/free-vector-logos/usc
- **USC Official**: https://identity.usc.edu/identity/logos-marks/ (requires USC email)
- **Generic Icons**: Can use placeholders if official logos unavailable
