# Domain Setup Quick Reference - organicfreshmeat.com

## 🎯 Quick Start

Your domain `organicfreshmeat.com` has been registered on Cloudflare. Follow these steps in order:

## Phase 1: DNS Configuration (24-48 hours)

### Step 1: Update Nameservers
**Location**: Your domain registrar (GoDaddy, Namecheap, Bluehost, etc.)

Replace current nameservers with:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

⏱️ **Wait 24-48 hours** for DNS propagation

### Step 2: Add DNS Records in Cloudflare
After nameservers are updated, go to Cloudflare Dashboard > DNS and add:

**A Record** (Get IP from your hosting provider):
```
Type: A
Name: @
Content: [YOUR_SERVER_IP]
TTL: Auto
Proxy: Proxied ☁️
```

**CNAME Record** (For www):
```
Type: CNAME
Name: www
Content: organicfreshmeat.com
TTL: Auto
Proxy: Proxied ☁️
```

### Step 3: Enable SSL/TLS
1. Go to SSL/TLS in Cloudflare
2. Encryption mode: **Full** (or Flexible to start)
3. Toggle **Always Use HTTPS** to ON

## Phase 2: Application Configuration

### Step 1: Update Environment Variables
File: `.env.local` ✅ Already updated with:
```env
NEXT_PUBLIC_APP_URL=https://organicfreshmeat.com
NEXT_PUBLIC_APP_DOMAIN=organicfreshmeat.com
NEXT_PUBLIC_API_URL=https://organicfreshmeat.com/api
GOOGLE_OAUTH_REDIRECT_URI=https://organicfreshmeat.com/api/auth/google/callback
```

### Step 2: Update Google OAuth
1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to Credentials → OAuth 2.0 Client IDs
4. Update Authorized redirect URIs:
   ```
   https://organicfreshmeat.com/api/auth/google/callback
   ```
5. Copy new credentials to `.env.local`

### Step 3: Verify Production URLs
- [ ] API endpoints use `NEXT_PUBLIC_API_URL`
- [ ] Email uses `organicfreshmeat.com`
- [ ] Payment redirects use correct domain

## Phase 3: Deployment

### Option A: Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

Then update Cloudflare DNS:
- Change A record to CNAME pointing to Vercel

### Option B: Deploy to Your Own Server
```bash
# Build
npm run build

# Deploy with PM2
pm2 start npm --name "organic-meat-shop" -- start
```

### Option C: Docker Deployment
Build and deploy Docker image to your hosting

## Phase 4: Post-Deployment Testing

### ✅ Verification Checklist
- [ ] Domain resolves: `https://organicfreshmeat.com`
- [ ] SSL certificate valid (green 🔒)
- [ ] Google OAuth works
- [ ] Razorpay/Stripe configured
- [ ] Email notifications work
- [ ] Mobile responsive

### 🧪 Test URLs
```
Homepage: https://organicfreshmeat.com
Login: https://organicfreshmeat.com/login
Products: https://organicfreshmeat.com/products
Checkout: https://organicfreshmeat.com/checkout
API Health: https://organicfreshmeat.com/api/health
```

## Important Files

| File | Purpose | Status |
|------|---------|--------|
| `.env.local` | Environment variables | ✅ Updated |
| `next.config.mjs` | Next.js configuration | ✅ Updated |
| `CLOUDFLARE_SETUP.md` | Cloudflare guide | ✅ Created |
| `PRODUCTION_DEPLOYMENT.md` | Full deployment guide | ✅ Created |

## Common Issues

### ❌ DNS not resolving
**Solution**: Check nameserver update status at https://www.whoisds.com/
Wait up to 48 hours for propagation

### ❌ SSL certificate not showing
**Solution**: 
1. Set Cloudflare SSL mode to "Flexible"
2. Test after 24 hours
3. Switch to "Full" after confirming

### ❌ Google OAuth not working
**Solution**: Verify callback URL in Google Console matches exactly:
```
https://organicfreshmeat.com/api/auth/google/callback
```

### ❌ Images not loading
**Solution**: Already added to `next.config.mjs`
```javascript
{
  protocol: "https",
  hostname: "organicfreshmeat.com",
}
```

### ❌ API requests failing
**Solution**: Check that API routes use environment variables, not hardcoded URLs

## Timeline

| When | What |
|------|------|
| Now | Update nameservers |
| 24-48 hrs | DNS propagates, configure records |
| 1-2 hrs | Deploy application |
| 1 hr | Test and verify |
| Ongoing | Monitor and optimize |

## Security Checklist

- [ ] SSL/TLS enabled
- [ ] All secrets strong (min 32 chars)
- [ ] Database credentials secured
- [ ] API keys protected
- [ ] CORS configured
- [ ] Security headers set
- [ ] Rate limiting enabled
- [ ] Backups scheduled

## Next Steps

1. **Now**: Update nameservers at your registrar
2. **In 24-48 hrs**: Configure DNS records & deploy
3. **Day 3**: Test all functionality
4. **Day 4**: Monitor and optimize

## Resources

- 📖 [Cloudflare Setup](CLOUDFLARE_SETUP.md)
- 📖 [Production Deployment](PRODUCTION_DEPLOYMENT.md)
- 📖 [Auth Setup](AUTH_SETUP.md)
- 📖 [Payment Integration](PAYMENT_INTEGRATION.md)
- 📖 [Promo Codes](PROMO_CODES.md)

## Support

For detailed guides, refer to:
- **Cloudflare Issues**: See `CLOUDFLARE_SETUP.md`
- **Deployment Issues**: See `PRODUCTION_DEPLOYMENT.md`
- **Auth Issues**: See `AUTH_SETUP.md`
- **Payment Issues**: See `PAYMENT_INTEGRATION.md`

---

**Status**: Application configured for `organicfreshmeat.com` ✅
**Last Updated**: April 2026
