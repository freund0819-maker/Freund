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

## Deploying to GitHub Pages

To make your portfolio live on the internet for free using GitHub Pages, follow these exact steps:

### 1. Update the Base URL
Before building for GitHub Pages, you need to tell Vite the name of your repository. 
Open `vite.config.js` in the root of the project and ensure the `base` property is set to your repository name. 

If your repository URL is `https://github.com/Yancovert/Freund`, it should look like this:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Freund/', // Add this line!
})
```

### 2. Install gh-pages package
We will use a tool called `gh-pages` to automate the deployment.
Run this command in your terminal:
```bash
npm install gh-pages --save-dev
```

### 3. Add deploy scripts to package.json
Open your `package.json` file. Inside the `"scripts"` section, add these two lines:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 4. Deploy!
Whenever you are ready to publish your site or after making changes, simply run:
```bash
npm run deploy
```
This command will automatically build your project and push it to a special `gh-pages` branch on your GitHub repository.

### 5. Check GitHub Settings
1. Go to your repository on GitHub (`https://github.com/Yancovert/Freund`).
2. Click on the **Settings** tab.
3. On the left sidebar, click on **Pages**.
4. Under "Build and deployment", ensure the **Source** is set to "Deploy from a branch".
5. Ensure the branch is set to `gh-pages` and the folder is `/ (root)`.
6. Click **Save** if you made changes.

In a few minutes, your site will be live at `https://Yancovert.github.io/Freund/`!

---

## Adding More Renders

To add or change the renders in the gallery:
1. Place your new high-quality images (Final, AO, and Solid passes) into the `src/assets/` folder.
2. Open `src/components/sections/Display.jsx`.
3. Import your new images at the top of the file (similar to the existing ones).
4. Scroll down to the `artworks` array and add or modify the entries with your new titles, categories, and image variables.
5. Deploy the site again using `npm run deploy`!
