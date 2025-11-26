# Deployment Guide

## Option 1: Static Deployment (Fastest)
This will deploy the application as it is now.
**Note**: The CMS data will be stored in the visitor's browser (LocalStorage). Changes you make will not be seen by others.

### Deploy to Netlify
1.  **Drag & Drop**:
    - Run `npm run build` in your terminal.
    - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    - Drag the `dist` folder from your project into the browser window.
    - Your site is live!

### Deploy to Vercel
1.  **Install CLI**: `npm i -g vercel`
2.  **Deploy**: Run `vercel` in your project folder.
3.  Follow the prompts (accept defaults).

---

## Option 2: Full Production (Recommended)
To have a shared CMS where you can edit vaults and users see the changes, you need a Backend and Database.

### 1. Database & Auth (Supabase)
- Create a project at [supabase.com](https://supabase.com).
- Create a `vaults` table.
- Enable Authentication (Email/Password).

### 2. Connect Frontend
- Install Supabase client: `npm install @supabase/supabase-js`
- Replace `VaultContext` to fetch from Supabase instead of LocalStorage.
- Create a Login page for `/admin`.

### 3. Deploy
- Connect your GitHub repository to Vercel or Netlify for automatic deployments.
