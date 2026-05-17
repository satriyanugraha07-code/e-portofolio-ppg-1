<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-Portofolio PPG

This contains everything you need to run the app locally and deploy it with GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/b7ac5959-e8d2-44b3-af74-7bfc152c248c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy with GitHub Pages

Every push to `main` runs `.github/workflows/deploy.yml`, builds the Vite app, and publishes `dist` to GitHub Pages.

Repository settings needed on GitHub:

1. Open `Settings > Pages`.
2. Set `Build and deployment > Source` to `GitHub Actions`.
3. Save the setting, then push to `main`.
