# VEFILM AI Pipeline Page

## Setup Instructions

### 1. Add Your Images
Copy these files to the `images/` folder with these exact names:

**Knock Knock:**
- `storyboard_dulce.png` - A storyboard frame (from your Screenshots)
- `generated_dulce.png` - The AI-generated version of that frame
- `hallway_approach.png` - Use `both_legs_crossed_202603310955.png`
- `duran_car.png` - Use `Latino_male_holding_202603301503.jpeg`
- `lens_cineovision.png` - Left half of `Interior.png` (Cineovision side)
- `lens_xtal.png` - Right half of `Interior.png` (Xtal Express side)
- `duran_closeup.png` - Use `Latino_male_looking_202603300019.jpeg`
- `dulce_couch.png` - Use `Gemini_Generated_Image_uxvh85uxvh85uxvh.png`

**Grey House Incident:**
- `ghi_callum.png` - Callum character portrait
- `ghi_hallway.png` - Inn hallway shot
- `ghi_exterior.png` - Inn exterior at night
- `ghi_officers.png` - Scottish constables shot

### 2. Add Videos (Optional)
Copy to `videos/` folder:
- `hallway_dolly.mp4`
- `detective_walk.mp4`
- `aerial_approach.mp4`

### 3. API Configuration
Edit `index.html` and find the CONFIG section near line 310.
Your Gemini API key is already set.

For image generation, add your Replicate API key:
```javascript
const REPLICATE_API_KEY = 'your_key_here';
```

### 4. Deploy
Options:
- **Netlify**: Drag the entire folder to netlify.com/drop
- **GitHub Pages**: Push to repo, enable Pages
- **Wix**: Use HTML embed for sections, or link as external page

### File Structure
```
VEFILM_AI_Page/
├── index.html
├── images/
│   ├── (your images here)
└── videos/
    └── (your videos here)
```

## Features
- Cinematic Engine: Upload storyboard → Get Veo 3 camera spec
- VECTOR-DP: Upload location → Get spatial analysis
- Character Sheet: Describe character → Get consistency bible
- Image Generator: Scene description → Cinematic image (needs Replicate)

## Live Tools
The Gemini-powered tools (Cinematic Engine, VECTOR-DP, Character Sheet) 
work immediately with your API key. The Image Generator requires 
Replicate API setup for full functionality.
