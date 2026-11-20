# 💖 A Birthday Website for Your Girlfriend

A handcrafted, interactive, and romantic website dedicated to celebrating your girlfriend's birthday.

---

## 🚀 How to Run & View the Site

### Option 1: Instant Local Preview (Zero Setup)
Simply navigate to this folder (`c:\Users\athar\Downloads\gf`) and **double-click `index.html`** in your file manager to open it in Chrome, Edge, Safari, or your default browser.

### Option 2: Run a Local Dev Server
Open your terminal in this folder and run:
```bash
# Using Python
python -m http.server 3000
```
Then visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ✨ Key Features Built In

1. **Ambient Floating Particles & Sound:**
   - Soft background hearts/sparkles.
   - Built-in soothing ambient music box melody generated live via Web Audio API (no broken links or missing files!).
2. **Interactive Relationship Timeline (Milestones):**
   - Highlights your first date, adventures, cozy everyday life, and celebrating today.
   - Elegant Polaroid picture frames with handwritten captions.
3. **The Memory Vault (3D Flip Polaroid Gallery):**
   - Filter by *Adventures*, *Candid Smiles*, and *Golden Hours*.
   - **Flip Cards:** Hover or tap on any photo to flip it over and reveal a secret handwritten memory on the back.
4. **Interactive Wax-Sealed Love Letter:**
   - Tap the wax seal stamp 💌 to unfold a romantic letter written from the heart.
   - Includes a "Little Things I Cherish Most" card grid.
5. **Wishes from Family & Friends (Live Guestbook):**
   - Beautiful cards from parents, best friends, and siblings.
   - Includes an **"Add a Birthday Wish"** button and modal that saves new wishes directly to `localStorage` so they stay even on page refresh!
6. **The Grand Finale (Make a Wish & Blow Out the Candles):**
   - Interactive birthday cake with a flickering flame.
   - Clicking "Blow Out the Candle" triggers a smoke puff, audio chime, screen-wide confetti explosion, and reveals a heartwarming final message.
7. **Secret Easter Egg:**
   - Clicking the sparkle icon (`✨`) in the top right menu uncovers a secret hidden love note.

---

## 🎨 How to Personalize for Her

All customization is straightforward:

### 1. Change Her Name & Dating Start Date
In `script.js` (top lines):
```javascript
const SITE_CONFIG = {
  herName: "Her Name Here",
  startDate: "2023-05-14", // YYYY-MM-DD: automatically calculates days together!
};
```
In `index.html`:
- Search for `Sophia` and replace with her real name or nickname.

### 2. Replace the Photos with Your Real Pictures
Place your photos in an `assets/` or `images/` folder inside this directory, then in `index.html`, replace the `src="https://images.unsplash..."` with:
```html
<img src="images/first-date.jpg" alt="Our first date" ...>
```

### 3. Personalize the Love Letter & Memories
- Edit the text inside `#opened-letter` in `index.html` to write your own personal vows, inside jokes, and heartfelt feelings.
- Edit the text on the back of the flip cards in `#gallery-grid` with the real stories behind your photos.

---

## 🌐 How to Publish Online (Free & Easy)

To send her a live link on her phone:

1. **Vercel / Netlify (Fastest):**
   - Drag and drop this `gf` folder into [Netlify Drop](https://app.netlify.com/drop) or import to [Vercel](https://vercel.com).
   - You will get a free live URL (e.g., `happy-birthday-sophia.netlify.app`) in under 60 seconds!
2. **GitHub Pages:**
   - Push this repository to GitHub and enable **GitHub Pages** under Settings > Pages.

---
*Crafted with love. Happy Birthday to her! 🎉*
