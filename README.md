# Caleb Newton - Personal Portfolio Website

A personal portfolio website showcasing my journey as an aspiring machine learning and data engineer, Computer Science + Applied Mathematics student at USC.

## 🌱 Built With
- **React 18** - Frontend library with functional components and hooks
- **Styled Components** - CSS-in-JS styling with theme support
- **React Router v6** - Client-side routing and navigation
- **Spotify API** - Live music integration showing currently playing tracks
- **Glassmorphism Design** - Modern UI with frosted glass effects and green tinted accents
- **Mega Brain API** - Cloud-accessible AI assistant with full context (Vercel serverless functions + Claude)

## 🎨 Design Philosophy
- **Green Growth Theme** - Primary color (#228B22) representing growth, learning, and renewal
- **Glassmorphic UI** - Frosted glass cards with backdrop blur, subtle noise textures, and green glowing edges
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **3D Flip Cards** - Interactive photo galleries with flip animations and slight rotations
- **Smooth Transitions** - Page navigation animations with fade-in effects

## 📁 Structure
```
src/
├── components/
│   ├── Navbar2/         # Navigation with social links
│   └── Footer2/         # Footer component
├── pages/
│   ├── Home.js          # Timeline of experiences with profile section
│   ├── About.js         # Personal bio, photo grid, Spotify integration
│   ├── EducationPage.js # Academic journey from USC to preschool
│   ├── Work.js          # Projects showcase (ModelLab, Tech16, FoodVision, The Lines)
│   ├── EverythingNight.js # SGV Christian Club Collective events
│   └── ComingSoon.js    # Placeholder for project detail pages
├── utils/
│   └── Themes.js        # Dark and light theme configurations
├── assets/              # Images, logos, and media files
└── App.js               # Root component with theme provider and routing

public/
├── favicon.png          # USC photo favicon (192x192)
├── favicon-32x32.png    # 32px favicon
└── favicon-16x16.png    # 16px favicon
```

## 🚀 Running Locally
```bash
npm install      # Install dependencies
npm start        # Start development server (localhost:3000)
npm run build    # Build for production
```

## 🧠 Mega Brain API

The website includes a cloud-accessible AI assistant with complete context about Caleb's digital life.

**Live Endpoints**:
- `https://calebnewton.me/api/brain/ask` - Ask questions with full context
- `https://calebnewton.me/api/brain/do` - Execute commands
- `https://calebnewton.me/api/brain/poke` - SMS/webhook integration

**Deploy to Vercel**:
```bash
./deploy.sh
```

**Test endpoints**:
```bash
./test-endpoints.sh
```

See [MEGA_BRAIN_QUICK_START.md](MEGA_BRAIN_QUICK_START.md) for usage guide and [DEPLOYMENT.md](DEPLOYMENT.md) for full documentation.

## 🎯 Pages & Features

### Home (`/`)
- Profile section with location (San Marino, CA) and mission statement
- Timeline of experiences organized by year (2026, 2025, 2024, 2023, 2022)
- Interactive image cards with flip animations showing details
- Experiences include: AINA Tech, Fleurs et Sel Cookies, FRC Team 973, SGV Christian Club Collective, Impact360 Institute, Dominican Republic mission trip

### About (`/about`)
- Full bio describing ML/Data engineering aspirations
- Large beach header image
- 3x3 photo grid with flip cards showing personal moments
- Hobbies section (spikeball, pickleball, movies, music exploration)
- Live Spotify integration showing currently playing track
- Social links: Letterboxd, RateYourMusic

### Education (`/education`)
- USC - B.S. Mathematics and Computer Science (2025-2029)
  - Focus: Machine Learning Systems + Data/ML Engineering
  - Learning interests in PyTorch, transformers, computer vision, ranking systems
- San Marino High School (2021-2025)
- UC Berkeley Summer Program - Computer Science (2024)
- UCLA CNSI Summer Program - Nanotechnology (2023)
- St. John's Nursery School with humorous preschool description

### Projects (`/work`)
- **ModelLab** - ML experiment tracking platform with dataset versioning
- **Tech 16 Personalities** - Developer assessment framework
- **FoodVision** - 97.20% accurate food classifier using EfficientNetB2
- **The Lines** - STEM music videos for education

### Everything Night (`/everything-night`)
- SGV Christian Club Collective showcase
- Chosen event (April 2025) - 100+ students
- Everything Night (May 2025) - 200+ students, 20 breakout sessions
- Image galleries with flip cards

## 🔗 Social Links
- GitHub: [github.com/TheCalebNewton](https://github.com/TheCalebNewton)
- LinkedIn: [linkedin.com/in/calebjnewton](https://www.linkedin.com/in/calebjnewton/)
- Spotify: [open.spotify.com/user/calebnewton](https://open.spotify.com/user/calebnewton)
- Letterboxd: [letterboxd.com/cnewt](https://letterboxd.com/cnewt/)
- RateYourMusic: [rateyourmusic.com/~cnewt](https://rateyourmusic.com/~cnewt)

## 🎨 Key Components

### GlassCard
Glassmorphic card component with:
- Backdrop blur filter
- Semi-transparent gradient backgrounds
- Border with subtle opacity
- Inset shadows for depth
- SVG noise texture overlay
- Green tinted glow on hover

### FlipCard
3D flip animation component featuring:
- Perspective transform on hover
- Rotated card positioning for organic layout
- Front side: Image with green glow
- Back side: Caption and details
- Smooth 0.6s flip transition

### Theme System
Two complete themes (dark/light):
- Background colors
- Text hierarchy (primary/secondary)
- Border colors
- Card backgrounds
- Primary accent color (#228B22)

## 📝 Recent Updates (January 2026)
- Added Fleurs et Sel Cookies consulting experience
- Updated AINA Tech title and capitalization
- Changed tagline to "Building cool things and learning constantly"
- Reorganized education page with preschool humor entry
- Added new social links (Spotify, Letterboxd, RateYourMusic)
- Implemented page transition animations
- Added green glassmorphic tint to all image blocks
- Updated photo grid with new images (AGO, premed friends, etc.)
- Fixed profile image framing with proper crop
- Added chosen event images to Everything Night page
- Generated and added USC suit photo as favicon

## 📄 License
© 2026 Caleb Newton. All rights reserved.
