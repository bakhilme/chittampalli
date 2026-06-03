# Chittampalli Exports Private Limited - Website

A modern, single-page website for Chittampalli Exports Private Limited, an Indian agricultural export company based in Karimnagar, Telangana.

## Features

- **Single Page Design**: All content consolidated into one seamless experience
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Contact Form Integration**: Powered by Resend API for reliable email delivery
- **Certification Showcase**: Animated scrolling display of export certifications
- **Modern Animations**: Smooth scroll-triggered reveal animations
- **Export Categories**: Comprehensive display of product offerings

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Email Service**: Resend API
- **Deployment**: Vercel or Cloudflare Pages (serverless functions)
- **Assets**: Optimized images and SVG icons

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub** and connect to Vercel
2. **Build Settings**:
   - Build Command: `(leave empty)`
   - Output Directory: `./`
   - Install Command: `npm install`
3. **Environment Variables**: Add `RESEND_API_KEY` in Vercel dashboard
4. **Deploy**: Automatic via Git integration

### Option 2: Cloudflare Pages

1. **Push to GitHub** and connect to Cloudflare Pages
2. **Build Settings**:
   - Build Command: `(leave empty)`
   - Build Output Directory: `/`
   - Root Directory: `./`
3. **Environment Variables**: Add `RESEND_API_KEY` in Pages settings
4. **Deploy**: Automatic via Git integration

## Local Development

### Prerequisites
- Node.js (for dependencies)
- Resend API account and API key

### Setup
1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```bash
   # For Vercel CLI
   vercel env add RESEND_API_KEY

   # For Cloudflare Pages (Wrangler)
   wrangler pages secret put RESEND_API_KEY
   ```
4. Run locally:
   ```bash
   # Vercel
   vercel dev

   # Cloudflare Pages
   wrangler pages dev .
   ```

## Email Configuration

The contact form sends two emails:
1. **To Company** (`info@chittampalliexports.com`): Full enquiry details
2. **To Customer**: Acknowledgment with 1-2 business day response promise

### Resend Setup
1. Sign up at [resend.com](https://resend.com)
2. Add and verify the domain `chittampalliexports.com`
3. Create an API key
4. Add the API key to your deployment platform's environment variables

## File Structure
```
├── index.html                    # Main single-page website
├── api/contact.js               # Vercel serverless function
├── functions/api/contact.js     # Cloudflare Pages function
├── images/                      # All image assets
│   ├── certs/                  # Certification logos
│   │   ├── apeda.png
│   │   ├── fieo.png
│   │   ├── fssai.png
│   │   ├── iec.svg            # Custom IEC logo
│   │   └── spiceboard.png
│   └── logo.svg               # Company logo
├── package.json               # Dependencies
├── vercel.json               # Vercel configuration
├── _routes.json              # Cloudflare Pages routes
└── README.md                 # This file
```

## Platform Comparison

| Feature | Vercel | Cloudflare Pages |
|---------|---------|------------------|
| **Setup Complexity** | ⭐⭐⭐⭐⭐ Very Easy | ⭐⭐⭐⭐ Easy |
| **Performance** | ⭐⭐⭐⭐ Fast | ⭐⭐⭐⭐⭐ Very Fast |
| **Global CDN** | ✅ Yes | ✅ Yes (Best-in-class) |
| **Free Tier** | ✅ Generous | ✅ Very Generous |
| **Function Cold Starts** | ~100ms | ~10ms |
| **Email Function** | `api/contact.js` | `functions/api/contact.js` |

**Recommendation**: **Vercel** for simplicity, **Cloudflare Pages** for performance and cost.

## Key Sections

1. **Hero**: Company introduction and key statistics
2. **Trust Bar**: Certification badges with icons
3. **About**: Company story and key features
4. **Products**: Export categories with hover effects
5. **Certifications**: Animated scrolling certification display
6. **Why Us**: Company differentiators
7. **Contact**: Contact information and enquiry form
8. **Footer**: Company details and navigation

## Customization

### Colors
The CSS uses custom properties for easy color customization:
- `--forest`: Primary green (#1e4535)
- `--amber`: Accent orange (#b8600e)
- `--ivory`: Background cream (#f8f6f1)

### Certifications
To add/remove certifications:
1. Add image to `images/certs/`
2. Update the scrolling track in the certifications section
3. Update the trust bar icons if needed

### Contact Information
Update contact details in:
- Contact section HTML
- Email templates in serverless functions
- Footer section

## Browser Support
- Chrome/Edge 70+
- Firefox 65+
- Safari 12+
- Mobile browsers

## Performance
- Optimized images with lazy loading
- Minimal external dependencies
- CSS animations with hardware acceleration
- Fast serverless functions

## Support
For technical support or questions about this website, contact the development team or refer to the documentation above.