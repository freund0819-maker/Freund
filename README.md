# FREUND0815 - Portfolio

Welcome to your portfolio!

> **A message from the developer:**
> "I send my regards! Let me know if you want to add more renders or make any other changes to the gallery."

## Local Development

If you want to run this project locally on your machine to test changes:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal in this project's directory.
3. Install the dependencies by running:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

---

## Deploying to Vercel

To make your portfolio live on the internet using Vercel, follow these steps:

### 1. Push to GitHub
Ensure your code is pushed to your GitHub repository at `https://github.com/freund0819-maker/Freund`.

### 2. Connect to Vercel
1.  Go to [Vercel](https://vercel.com/) and log in (using your GitHub account).
2.  Click **"Add New"** and select **"Project"**.
3.  Import the `Freund` repository from your GitHub account.
4.  Vercel will automatically detect that this is a **Vite** project.
5.  Click **"Deploy"**.

### 3. Automatic Updates
Every time you push changes to your GitHub repository, Vercel will automatically rebuild and redeploy your site!

---

## Adding More Renders

To add or change the renders in the gallery:
1. Place your new high-quality images (Final, AO, and Solid passes) into the `src/assets/` folder.
2. Open `src/components/sections/Display.jsx`.
3. Import your new images at the top of the file (similar to the existing ones).
4. Scroll down to the `artworks` array and add or modify the entries with your new titles, categories, and image variables.
5. Deploy the site again using `npm run deploy`!
