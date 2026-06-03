# 🚀 Cloudflare Pages Deployment Guide

## ✅ Quick Setup (Recommended)

### Step 1: Connect Repository
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your **GitHub repository**
4. **Build settings**:
   - **Framework preset**: None (Static HTML)
   - **Build command**: Leave empty or `echo "Static site ready"`
   - **Build output directory**: `/` (root)
   - **Root directory**: Leave empty

### Step 2: Add Environment Variable
1. After deployment, go to **Settings** tab
2. Scroll to **"Environment variables"**
3. Click **"Add variable"**:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)
   - **Environment**: Select both **Production** and **Preview**
4. Click **"Save"**

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Retry deployment"** on latest deployment
3. ✅ Done! Your contact form will now work

## 🔧 Project Structure (Already Configured)

```
chittampalli/
├── index.html                 # Main website
├── functions/api/contact.js   # Cloudflare Pages function
├── _routes.json              # Routes configuration
├── images/                   # Static assets
└── package.json              # No dependencies needed
```

## 🎯 Important Notes

- **No build process required** - this is a static site
- **Functions are auto-detected** in `/functions` folder
- **Environment variables** are secure and encrypted
- **Contact form** will send emails to:
  - Company: info@chittampalliexports.com
  - Customer: Automatic acknowledgment

## 🔍 Troubleshooting

**If deployment fails:**
- Ensure no `wrangler.toml` or `wrangler.json` files exist
- Check that `node_modules/` is in .gitignore
- Use **Pages**, not **Workers** for deployment
- Set framework preset to "None" or "Static HTML"

**If contact form doesn't work:**
- Verify `RESEND_API_KEY` is set in environment variables
- Check that domain is verified in Resend dashboard
- Ensure you've redeployed after adding the environment variable

## 🌍 Custom Domain (Optional)
1. In **Pages** → **Custom domains**
2. Add `chittampalliexports.com`
3. Follow DNS setup instructions
4. Update Resend domain verification

---
**Need help?** Check the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)