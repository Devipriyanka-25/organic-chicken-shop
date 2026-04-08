# Cloudflare Setup Guide for organicfreshmeat.com

## Overview
This guide explains how to configure your `organicfreshmeat.com` domain in Cloudflare for optimal performance, security, and reliability.

## Step 1: Add Domain to Cloudflare

1. **Login to Cloudflare Dashboard**: https://dash.cloudflare.com/
2. **Click "Add a Site"** in the top-left
3. **Enter your domain**: `organicfreshmeat.com`
4. **Select a Plan**: Free plan is sufficient for most use cases (upgrade later if needed)
5. **Review your DNS records**: Cloudflare will scan your current DNS setup

## Step 2: Update Nameservers

After adding your domain, Cloudflare will provide you with 2 nameservers like:
- `ns1.cloudflare.com`
- `ns2.cloudflare.com`

**Important**: Go to your domain registrar (GoDaddy, Namecheap, etc.) and update the nameservers to these Cloudflare nameservers.

⏱️ DNS propagation typically takes 24-48 hours.

## Step 3: Configure DNS Records for Next.js

Once your nameservers are updated, configure these DNS records in Cloudflare:

### A Record (Main Domain)
- **Type**: A
- **Name**: `@` (root domain / organicfreshmeat.com)
- **IPv4 address**: Your server's IP address (obtained from your hosting provider)
- **TTL**: Auto
- **Proxy**: Proxied (orange cloud)

**Example**:
```
@ A 203.0.113.1 Auto Proxied
```

### CNAME Record (www Subdomain)
- **Type**: CNAME
- **Name**: `www`
- **Target**: `organicfreshmeat.com`
- **TTL**: Auto
- **Proxy**: Proxied (orange cloud)

**Example**:
```
www CNAME organicfreshmeat.com. Auto Proxied
```

### CNAME Records for Services (Optional)
If you need subdomains:

```
api     CNAME organicfreshmeat.com. Auto Proxied
shop    CNAME organicfreshmeat.com. Auto Proxied
admin   CNAME organicfreshmeat.com. Auto Proxied
```

## Step 4: SSL/TLS Configuration (IMPORTANT)

1. **Go to SSL/TLS section** in Cloudflare dashboard
2. **Select "Flexible" or "Full"** encryption mode:
   - **Flexible** (Recommended for beginners): Encrypts traffic between users and Cloudflare
   - **Full**: Encrypts traffic to your origin server (recommended for production)
   - **Full (Strict)**: Requires valid SSL certificate on your server

3. **Enable "Always Use HTTPS"**:
   - Go to SSL/TLS → Page Rules
   - Create rule: Priority 1, URL: `organicfreshmeat.com/*` → Always Use HTTPS

4. **Auto Redirect HTTP to HTTPS**:
   - Go to SSL/TLS → Edge Certificates
   - Toggle "Always Use HTTPS" to ON

## Step 5: Enable Security Features

### 1. DDoS Protection
- **Off** (default) → **I'm Under Attack** or **On** (recommended)
- Go to Security → Settings

### 2. WAF (Web Application Firewall) - Free Plan Included
- Go to Security → WAF
- Take a quick look at the default rules

### 3. Bot Protection (Optional - Paid Feature)
- Go to Security → Bots

### 4. Rate Limiting (Optional - Paid Feature)
- Useful for API endpoints

## Step 6: Performance Optimization

### 1. Enable Caching
- Go to **Caching** → **Cache Rules**
- Create rule to cache static assets (images, CSS, JS)

### 2. Minify CSS, JavaScript, and HTML (Free)
- Go to **Speed** → **Optimization**
- Enable:
  - ✓ Auto Minify (CSS, JavaScript, HTML)
  - ✓ Rocket Loader (JavaScript)
  - ✓ Polish (Image Optimization) - Optional

### 3. Enable Gzip Compression (Free)
- Go to **Speed** → **Optimization**
- Enable Brotli if available

## Step 7: Configure Page Rules (Optional)

Create specific rules for different URL patterns:

```
Rule 1:
URL: organicfreshmeat.com/api/*
- Cache Level: Bypass (don't cache API responses)

Rule 2:
URL: organicfreshmeat.com/static/*
- Cache Level: Cache Everything
- Browser Cache TTL: 1 week
```

## Step 8: Email Configuration (Optional)

### Cloudflare Email Routing (Free)
If you want to use `admin@organicfreshmeat.com`:

1. Go to **Email Routing**
2. Click **Create address**
3. Set up rules to forward emails to your actual inbox

### MX Records Setup
Add MX records if you're using external email service like Google Workspace:

```
Type: MX
Name: @
Value: aspmx.l.google.com
Priority: 10
```

## Step 9: Testing & Verification

1. **Check DNS Status**: https://mxtoolbox.com/
2. **SSL Certificate**: https://www.ssllabs.com/
3. **Performance Test**: https://pagespeed.web.dev/
4. **Monitor Dashboard**: Cloudflare dashboard shows real-time analytics

## Environment Variables for Production

Update `.env.local` with production URLs:

```env
# Production Domain
NEXT_PUBLIC_APP_URL=https://organicfreshmeat.com
NEXT_PUBLIC_APP_DOMAIN=organicfreshmeat.com
NEXT_PUBLIC_API_URL=https://organicfreshmeat.com/api

# Google OAuth Redirect URL (update in Google Console)
GOOGLE_OAUTH_REDIRECT_URI=https://organicfreshmeat.com/api/auth/google/callback

# Stripe Webhook Endpoint
STRIPE_WEBHOOK_ENDPOINT=organicfreshmeat.com

# Email Configuration
EMAIL_FROM=noreply@organicfreshmeat.com
```

## Step 10: Deploy Your Application

Once DNS is configured, deploy your Next.js app to your hosting provider:

### Recommended Hosting Providers
- **Vercel** (Official Next.js hosting) - https://vercel.com
- **Render** - https://render.com
- **Railway** - https://railway.app
- **Netlify** - https://netlify.com
- **AWS** (EC2/Lightsail) - https://aws.amazon.com
- **DigitalOcean** - https://digitalocean.com
- **Hostinger/Bluehost** - If using Node.js support

### Via Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Common Issues & Troubleshooting

### Issue: DNS not resolving
- **Solution**: Wait 24-48 hours for propagation
- **Verify**: Run `nslookup organicfreshmeat.com` in terminal

### Issue: SSL certificate errors
- **Solution**: Set SSL/TLS mode to "Flexible"
- **Verify**: Check https://www.ssllabs.com/

### Issue: Images not loading from domain
- **Solution**: Check `next.config.mjs` includes your domain in `remotePatterns`

### Issue: API requests failing
- **Solution**: Disable Cloudflare caching for `/api/*` routes

### Issue: Google OAuth not working
- **Solution**: Update Google Console with new callback URL: `https://organicfreshmeat.com/api/auth/google/callback`

## SSL/TLS Certificate Options

### Free Option (Recommended)
- **Cloudflare Universal SSL** (Always free with Cloudflare)
- Automatically issued and renewed
- Works for root domain + all subdomains

### Paid Options
- **Dedicated Certificate**: $10/month
- **Wildcard Certificate**: $15/month
- **Advanced Certificate**: Custom options

## Monitoring & Analytics

Cloudflare provides valuable analytics:

1. **Dashboard Overview**
   - Requests served
   - Bandwidth saved
   - Threats blocked

2. **Analytics & Logs**
   - Traffic patterns
   - Top pages
   - Cache hit ratio

3. **Real-time Monitor**
   - Recent requests
   - Active threats

## Maintenance

### Regular Tasks
- ✓ Monitor SSL/TLS certificate expiration (usually automatic)
- ✓ Review security events
- ✓ Check cache hit ratio
- ✓ Update firewall rules as needed

### Renewal
- Cloudflare Universal SSL auto-renews
- No action needed from your side

## Support Resources

- **Cloudflare Documentation**: https://developers.cloudflare.com/
- **Community Forum**: https://community.cloudflare.com/
- **Support Plan**: https://www.cloudflare.com/plans/

## Next Steps

1. ✅ Domain added to Cloudflare
2. ⏳ Update nameservers (24-48 hours)
3. ⏳ Configure DNS records
4. ⏳ Enable SSL/TLS
5. ⏳ Deploy your application
6. ✓ Monitor and optimize

---

**Last Updated**: April 2026
