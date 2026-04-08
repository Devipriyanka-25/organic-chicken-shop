# Production Deployment Guide for organicfreshmeat.com

## Complete Deployment Overview

This guide covers everything needed to deploy your Organic Meat Shop application to production with the domain `organicfreshmeat.com`.

## Pre-Deployment Checklist

### 1. Domain & DNS
- [x] Domain registered: `organicfreshmeat.com`
- [x] Cloudflare account created
- [ ] Nameservers updated at domain registrar
- [ ] DNS records configured in Cloudflare
- [ ] SSL/TLS enabled in Cloudflare

### 2. Environment Variables
- [ ] `.env.local` updated with production URLs
- [ ] API URLs point to `https://organicfreshmeat.com`
- [ ] All secrets are strong and unique
- [ ] Database connection verified

### 3. Third-Party Services
- [ ] Google OAuth credentials updated with: `https://organicfreshmeat.com/api/auth/google/callback`
- [ ] Razorpay test credentials configured
- [ ] Stripe test credentials configured
- [ ] Email service configured (Gmail App Password)
- [ ] MongoDB connection tested

### 4. Application Code
- [ ] All hardcoded `localhost` URLs removed
- [ ] API endpoints use environment variables
- [ ] Error handling implemented
- [ ] Security headers configured
- [ ] CORS configured for your domain

### 5. Testing
- [ ] Local build tests: `npm run build`
- [ ] All auth routes tested
- [ ] Payment flow tested (test mode)
- [ ] Email notifications tested
- [ ] Mobile responsive design verified

## Step 1: Update Google OAuth Credentials

1. **Go to** https://console.cloud.google.com/
2. **Select your project**
3. **Go to** Credentials → OAuth 2.0 Client IDs
4. **Edit** your Web application credentials
5. **Update Authorized redirect URIs** to:
   ```
   https://organicfreshmeat.com/api/auth/google/callback
   ```
6. **Copy** Client ID and Secret to `.env.local`

## Step 2: Choose Hosting Provider

### Option A: Vercel (Recommended - Easiest)
- Official Next.js hosting
- Automatic deployments from Git
- Edge network for fast performance
- Free tier available

**Deployment**:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Connect Domain**:
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add `organicfreshmeat.com`
4. Update Cloudflare CNAME to point to Vercel

### Option B: AWS/DigitalOcean/Render
If using your own server, you need:
- Node.js server setup
- PM2 or systemd for process management
- Nginx reverse proxy
- SSL certificate (Cloudflare handles this)

### Option C: Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

## Step 3: Production Deployment Checklist

### Vercel Deployment
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Configure environment variables in Vercel dashboard
4. Select `npm run build` as build command
5. Deploy!

### Self-Hosted Deployment
```bash
# SSH into your server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/yourusername/organic-meat-shop.git
cd organic-meat-shop

# Install dependencies
npm install

# Build application
npm run build

# Create .env.local with production values
nano .env.local

# Install PM2
npm install -g pm2

# Start application with PM2
pm2 start npm --name "organic-meat-shop" -- start

# Save PM2 process list
pm2 save

# Enable PM2 startup
pm2 startup

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/organicfreshmeat.com
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name organicfreshmeat.com www.organicfreshmeat.com;

    # Redirect HTTP to HTTPS (Cloudflare handles this)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Step 4: Database Migration

### Production MongoDB Setup

**Option A: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Copy connection string
4. Update `MONGODB_URI` in `.env.local`

**Example**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/organic_meat_shop?retryWrites=true&w=majority
```

**Option B: Self-Hosted MongoDB
Install MongoDB on your server and update connection string

### Backup Strategy
```bash
# Backup MongoDB
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/organic_meat_shop"

# Restore from backup
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/organic_meat_shop" ./dump
```

## Step 5: Payment Gateway Setup for Production

### Razorpay
1. Go to https://www.razorpay.com/
2. Sign up and create account
3. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env.local`

### Stripe
1. Go to https://stripe.com/
2. Create account
3. Get production keys from Dashboard
4. Update `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` in `.env.local`

## Step 6: Email Configuration

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on Gmail
2. Create App Password: https://myaccount.google.com/apppasswords
3. Update `.env.local`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@organicfreshmeat.com
   ```

### Alternative: SendGrid
1. Create SendGrid account: https://sendgrid.com/
2. Get API key
3. Update email configuration

## Step 7: Security Configuration

### Add Security Headers (Next.js)

Create `next.config.mjs`:
```javascript
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

### Configure CORS
Update API routes to accept requests only from your domain

### SSL/TLS Certificate
- Cloudflare provides free Universal SSL
- Automatically renewed
- No additional configuration needed

## Step 8: Monitoring & Health Checks

### Setup Monitoring
1. Use Cloudflare Analytics
2. Use Sentry for error tracking: https://sentry.io/
3. Use UptimeRobot for uptime monitoring: https://uptimerobot.com/

### Health Check Endpoint
Create `src/app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({ status: 'healthy', timestamp: new Date() });
}
```

Test: `https://organicfreshmeat.com/api/health`

## Step 9: CI/CD Pipeline (Optional)

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Step 10: Performance Optimization

### Next.js Optimizations
```bash
# Enable image optimization
npm run build

# Check bundle size
npx @next/bundle-analyzer
```

### Cloudflare Optimizations
- Enable Auto Minify
- Enable Brotli compression
- Enable Gzip compression
- Set cache TTL appropriately

### Database Optimization
- Add database indexes
- Use MongoDB connection pooling
- Cache frequently accessed data

## Post-Deployment

### 1. Verify Deployment
```bash
# Check if site is accessible
curl https://organicfreshmeat.com

# Check SSL certificate
openssl s_client -connect organicfreshmeat.com:443

# Check DNS resolution
nslookup organicfreshmeat.com
```

### 2. Test All Functionality
- [ ] Homepage loads
- [ ] Authentication works
- [ ] Products can be added to cart
- [ ] Payment works (test mode)
- [ ] Emails are sent
- [ ] Google OAuth works
- [ ] Mobile view works

### 3. Update Passwords
- [ ] Change all default passwords
- [ ] Rotate API keys
- [ ] Update database credentials

### 4. Backup Strategy
- [ ] Set up automatic database backups
- [ ] Document backup restoration process
- [ ] Test backup restoration

### 5. Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Set up log aggregation
- [ ] Create alerts for critical errors

## Rollback Plan

If deployment goes wrong:

1. **Vercel**: Simply deploy previous version
2. **Self-hosted**: `pm2 restart all` or rollback Git commit
3. **DNS**: Point back to previous server IP

## Production Environment Variables Template

```env
# Domain
NEXT_PUBLIC_APP_URL=https://organicfreshmeat.com
NEXT_PUBLIC_APP_DOMAIN=organicfreshmeat.com
NEXT_PUBLIC_API_URL=https://organicfreshmeat.com/api
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/organic_meat_shop

# Authentication
JWT_SECRET=your-super-strong-random-secret-key-minimum-32-characters

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=rzp_live_your_key_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_OAUTH_REDIRECT_URI=https://organicfreshmeat.com/api/auth/google/callback

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@organicfreshmeat.com
ADMIN_EMAIL=admin@organicfreshmeat.com
```

## Support

For production issues:
1. Check Cloudflare dashboard for errors
2. Check application logs via Vercel or SSH
3. Review error tracking (Sentry)
4. Check database connection

---

**Last Updated**: April 2026
