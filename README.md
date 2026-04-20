# ⛰ Kedar Camps — Full Stack Deployment Guide
## React + Spring Boot + PostgreSQL (Neon) — 100% FREE

---

## 📁 Project Structure
```
kedar-camps/
├── frontend/        → React + Vite  → deploy to Vercel
├── backend/         → Spring Boot   → deploy to Render
└── database/        → PostgreSQL    → Neon (free cloud DB)
    └── schema.sql
```

---

## STEP 1 — Set Up Neon Database (Free PostgreSQL)

1. Go to **https://neon.tech** and sign up (free)
2. Click **New Project** → Name it `kedar-camps` → Choose region closest to India
3. Click **Create Project** — you'll get a connection string like:
   ```
   postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/kedar_camps?sslmode=require
   ```
4. Go to **SQL Editor** in Neon dashboard
5. Copy the entire contents of `database/schema.sql` and paste → **Run**
6. ✅ Your database is ready!

**Convert your Neon URL to JDBC format for Spring Boot:**
- Original: `postgresql://user:pass@host/dbname?sslmode=require`
- JDBC:     `jdbc:postgresql://host/dbname?sslmode=require&user=user&password=pass`

---

## STEP 2 — Deploy Backend to Render (Free)

### 2a. Push your code to GitHub
```bash
cd kedar-camps
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kedar-camps.git
git push -u origin main
```

### 2b. Create Render Web Service
1. Go to **https://render.com** and sign up (free)
2. Click **New** → **Web Service**
3. Connect your GitHub account and select `kedar-camps` repo
4. Configure the service:
   - **Name**: `kedar-camps-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`  (Render auto-detects the Dockerfile)
   - **Branch**: `main`
   - **Plan**: Free

5. Add **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Your JDBC connection string from Neon |
   | `PORT` | `8080` |

6. Click **Create Web Service**
7. Wait ~5 minutes for first deployment
8. Your API will be at: `https://kedar-camps-api.onrender.com`

### 2c. Test your API
```bash
curl https://kedar-camps-api.onrender.com/api/health
# Should return: {"status":"UP","service":"Kedar Camps API"}

curl "https://kedar-camps-api.onrender.com/api/availability?checkIn=2025-07-01&checkOut=2025-07-05"
# Should return availability data
```

> ⚠️ **Free Render Note**: The free tier sleeps after 15 min inactivity. First request after sleep takes ~30s. Upgrade to paid ($7/mo) to avoid this.

---

## STEP 3 — Deploy Frontend to Vercel (Free)

### 3a. Configure the API URL
1. In `frontend/` folder, create `.env.production`:
   ```
   VITE_API_URL=https://kedar-camps-api.onrender.com
   ```
2. Commit and push this change.

### 3b. Deploy on Vercel
1. Go to **https://vercel.com** and sign up with GitHub (free)
2. Click **New Project** → Import `kedar-camps` repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add **Environment Variable**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://kedar-camps-api.onrender.com` |

5. Click **Deploy**
6. Your site will be live at: `https://kedar-camps.vercel.app`

---

## STEP 4 — Custom Domain (Optional, ₹500/year)

1. Buy a `.in` domain from **GoDaddy** or **Namecheap** (~₹500/yr)
2. In Vercel dashboard → **Domains** → Add your domain
3. Vercel gives you DNS records to add at your registrar
4. Done! Site goes live at `www.kedarcamps.in`

---

## 🔧 Local Development

### Prerequisites
- Node.js 18+ and npm
- Java 17+ and Maven
- PostgreSQL (or use Neon connection directly)

### Run Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if using remote backend, otherwise proxy handles it
npm run dev
# Open http://localhost:3000
```

### Run Backend
```bash
cd backend
# Set environment variable:
export DATABASE_URL="jdbc:postgresql://your-neon-host/kedar_camps?sslmode=require&user=USER&password=PASS"
mvn spring-boot:run
# API at http://localhost:8080
```

---

## 🔑 Admin Access
- URL: Click **Admin** in navbar
- Password: `kedar@123`
- **Change this** in `BookingController.java` line: `private static final String ADMIN_KEY = "kedar@123";`
- For production, move this to an environment variable.

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` | Live availability |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/verify/{code}` | Verify booking code |
| GET | `/api/admin/bookings` | All bookings (admin) |
| PUT | `/api/admin/bookings/{id}` | Update booking (admin) |

Admin endpoints require header: `X-Admin-Key: kedar@123`

---

## 💰 Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| Neon PostgreSQL | Free tier (0.5 GB) | ₹0 |
| Render (backend) | Free tier | ₹0 |
| Vercel (frontend) | Free tier (100 GB bandwidth) | ₹0 |
| Custom domain | `.in` domain | ~₹500/year |
| **Total** | | **₹0–500/year** |

---

## 🏕 Camp Configuration Reference

| Camp ID | Name | Capacity | Total Units | Price/Night |
|---------|------|----------|-------------|-------------|
| c2 | Duo Tent | 2 persons | 4 camps | ₹1,800 |
| c3 | Trio Tent | 3 persons | 4 camps | ₹2,400 |
| c5 | Explorer Camp | 5 persons | 6 camps | ₹3,500 |
| c6 | Family Camp | 6 persons | 4 camps | ₹4,200 |
| c10 | Group Camp | 10 persons | 2 camps | ₹7,000 |
| c20 | Mega Camp | 20 persons | 2 camps | ₹12,000 |

To update camp prices/counts, edit:
- **Backend**: `BookingService.java` → `CAMP_CONFIG`, `CAMP_NAMES`, `CAMP_PRICE` maps
- **Frontend**: `src/utils.js` → `CAMPS` array

---

## 🆘 Troubleshooting

**CORS errors in browser?**
→ Update `CorsConfig.java` to allow your Vercel domain explicitly

**Render backend not starting?**
→ Check logs in Render dashboard → verify `DATABASE_URL` env var is set correctly

**Neon connection refused?**
→ Ensure JDBC URL includes `?sslmode=require` — Neon requires SSL

**Vercel build fails?**
→ Check `VITE_API_URL` env var is set in Vercel project settings
