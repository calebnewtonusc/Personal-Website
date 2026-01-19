# Deployment Guide

## Before Deploying - Complete These Steps

### 1. Add Photos ✋ **DO THIS FIRST**

See `PHOTOS_NEEDED.md` for the full list. Key photos to add:

```bash
src/assets/
├── Newton_Caleb_Photo.png ✅ (Already added)
├── vinyl_collection.jpg ❌ (Need to add)
├── baseball_pitching.jpg ❌ (Need to add)
├── baseball_team.jpg ❌ (Need to add)
├── dominican_republic.jpg ❌ (Need to add)
├── impact360_leadership.jpg ✅ (Already added)
├── EverythingNightImages/ ✅ (Already added - 8 images)
└── AinatechImages/ ✅ (Already added - 2 images)
```

**To add photos:**
```bash
# Copy your photos to src/assets/ with the exact filenames above
cp ~/path/to/your/vinyl_photo.jpg src/assets/vinyl_collection.jpg
cp ~/path/to/your/baseball_photo.jpg src/assets/baseball_pitching.jpg
# etc...
```

### 2. Update BeyondCode Component

After adding photos, update `src/components/BeyondCode/index.js`:

Replace the `ImagePlaceholder` sections with actual images:
```javascript
// Change from:
<ImagePlaceholder>{interest.imagePlaceholder}</ImagePlaceholder>

// To:
<img src={require('../assets/vinyl_collection.jpg')} alt="Vinyl Collection" style={{width: '100%', borderRadius: '12px'}} />
```

### 3. Test Locally

```bash
npm start
# Visit http://localhost:3000
# Check all sections, click all links, test mobile menu
```

Build for production:
```bash
npm run build
# Make sure build succeeds with no errors
```

## Deploying to Vercel

### Option 1: Deploy via Vercel Website (Easiest)

1. **Push to GitHub first:**
```bash
cd "/Users/joelnewton/Desktop/2026 Code/Big-Projects/Personal-Website"
git add .
git commit -m "Initial portfolio website - ready for deployment"
git push origin main
```

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository `calebnewtonusc/Personal-Website`
   - Vercel will auto-detect it's a Create React App
   - Click "Deploy"

3. **Configuration** (Vercel auto-detects these, but verify):
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Get your live URL:**
   - Vercel will give you a URL like: `personal-website-calebnewtonusc.vercel.app`
   - You can add a custom domain later

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd "/Users/joelnewton/Desktop/2026 Code/Big-Projects/Personal-Website"
vercel
# Follow the prompts
# For production deployment:
vercel --prod
```

## After Deployment

### 1. Test Your Live Site

Visit your Vercel URL and check:
- [ ] All sections load
- [ ] Navigation works
- [ ] Project pages load (`/projects/modellab`, etc.)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Images display

### 2. Update Links

Add your live Vercel URL to:
- GitHub repository description
- LinkedIn profile
- Resume

### 3. Optional: Add Custom Domain

In Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., `calebnewton.com`)
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Make sure images are in `src/assets/` (not `public/assets/`)
- Use `require()` or `import` for images in src/
- Check file names match exactly (case-sensitive)

### Routing Issues (404 on refresh)
- The `vercel.json` file handles this - it redirects all routes to index.html
- Make sure `vercel.json` is committed to git

### Environment Variables (for future Spotify API)
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add your Spotify credentials:
   - `REACT_APP_SPOTIFY_CLIENT_ID`
   - `REACT_APP_SPOTIFY_CLIENT_SECRET`
   - `REACT_APP_SPOTIFY_REFRESH_TOKEN`
3. Redeploy

## Quick Deployment Checklist

- [ ] All photos added to `src/assets/`
- [ ] BeyondCode component updated with real images
- [ ] `npm start` works locally
- [ ] `npm run build` succeeds
- [ ] All links tested
- [ ] Mobile responsive tested
- [ ] Git repo clean and pushed
- [ ] Deployed to Vercel
- [ ] Live site tested
- [ ] Vercel URL added to resume/LinkedIn

## Your Project URLs

- **GitHub Repo**: https://github.com/calebnewtonusc/Personal-Website
- **Vercel URL**: (will be generated after deployment)
- **Local Dev**: http://localhost:3000

---

**Ready to deploy?** Just add your photos, test locally, push to GitHub, and deploy to Vercel!
