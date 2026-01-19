# Photos Needed for Personal Website

## Priority Images to Add

### 1. **Vinyl Wall/Collection Photo**
- **Filename:** `vinyl_collection.jpg` or `vinyl_wall.jpg`
- **Location to place:** `/src/assets/vinyl_collection.jpg`
- **Where it will show:** Beyond Code section - showcasing music passion
- **Source:** Your personal photo library

### 2. **Baseball Pitching Action Shot**
- **Filename:** `baseball_pitching.jpg`
- **Location to place:** `/src/assets/baseball_pitching.jpg`
- **Where it will show:** Beyond Code section or as part of personal story
- **Description needed:** You on the mound mid-pitch, showing the curveball you perfected

### 3. **Baseball Team Celebration**
- **Filename:** `baseball_team.jpg`
- **Location to place:** `/src/assets/baseball_team.jpg`
- **Where it will show:** Beyond Code section
- **Description needed:** Team moment showing community/brotherhood aspect

### 4. **Dominican Republic Baseball Mission**
- **Filename:** `dominican_republic_baseball.jpg`
- **Location to place:** `/src/assets/dominican_republic.jpg`
- **Where it will show:** Interests section - the junkyard field story
- **Description:** The mission trip field or kids you played with

## Images Already Available in Downloads

### 5. **Impact 360 Leadership**
- **Current location:** `/Users/joelnewton/Downloads/Impact 360 Leadership.jpg`
- **Filename:** `impact360_leadership.jpg`
- **Location to place:** `/src/assets/impact360_leadership.jpg`
- **Where it will show:** Experience section for Impact 360 Institute

### 6. **Everything Night Photos**
- **Current location:** `/Users/joelnewton/Downloads/EverythingNightImages/`
- Available photos:
  - `EverythingNightCrowd.JPG` - 200+ students gathering
  - `EverythingNightPoster.JPG` - Event branding
  - `EverythingNightDodgeball.JPG` - Breakout session variety
  - `EverythingNightBand.JPG` - Worship/music element
  - `EverythingNightDinner.JPG` - Community building
  - `ChosenDab.JPG` - Chosen worship night
- **Where they will show:** Experience section for SGV Christian Club Collective

### 7. **Ainatech Photos**
- **Current location:** `/Users/joelnewton/Downloads/AinatechImages/`
- Available photos:
  - `Ainatechsetup.jpg` - Camera rig/workspace
  - `Ainatechgoats.jpg` - Team photo?
- **Where they will show:** Experience section for Aina Tech role

## Images from Memory Book Photos PDF
*Need to scan Memory Book Photos.pdf (too large to load) and identify which specific images to use*

### Potential Memory Book Images to Extract:
- ACTS leadership moments
- Faith journey photos
- High school milestone photos
- Concert/music moments
- Hiking/outdoor adventures
- Board game nights with friends

---

## How to Add Photos

1. Save the photo files with the exact filenames listed above
2. Place them in `/src/assets/` folder
3. Reference them in React components like:
   ```javascript
   import vinylPhoto from '../assets/vinyl_collection.jpg';
   <img src={vinylPhoto} alt="Vinyl Collection" />
   ```
   Or use require:
   ```javascript
   <img src={require('../assets/vinyl_collection.jpg')} alt="Vinyl Collection" />
   ```

## Photo Specs
- **Format:** JPG or PNG preferred
- **Size:** Compress to under 500KB each for web performance
- **Resolution:** At least 1200px on longest side for high-quality display
- **Aspect Ratio:** 16:9 or 4:3 preferred for most sections

---

Last Updated: January 18, 2026
