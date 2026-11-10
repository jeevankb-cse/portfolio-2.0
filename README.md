# Jeevan K B — AI & Machine Learning Engineer Portfolio (Portfolio 2.0)

Official AI & Machine Learning Engineering portfolio of **Jeevan K B** (B.E. in Computer Science & Engineering, City Engineering College, Bengaluru · CGPA 8.48).

- **GitHub Pages Live URL**: [https://jeevankb-cse.github.io/portfolio-2.0/](https://jeevankb-cse.github.io/portfolio-2.0/)
- **GitHub Repository**: [https://github.com/jeevankb-cse/portfolio-2.0](https://github.com/jeevankb-cse/portfolio-2.0)
- **Cloud Run Live URL**: [https://ais-pre-jqseuhul3azqkonyykscxv-976219236024.asia-east1.run.app](https://ais-pre-jqseuhul3azqkonyykscxv-976219236024.asia-east1.run.app)
- **Custom Domain Alias**: [https://portfolio.jeevankb.com](https://portfolio.jeevankb.com) *(Configure DNS CNAME to jeevankb-cse.github.io)*

---

## Featured AI & ML Systems

1. **ScamShield AI** — Autonomous Multi-Turn Agentic Honeypot for Fraud Detection ([GitHub](https://github.com/jeevankb-cse/ScamShield-AI))
2. **WeatherGPT (SIH 2026 Selected — PS 26068)** — Conversational Meteorological Intelligence System ([GitHub](https://github.com/jeevankb-cse/WeatherGPT))
3. **VoxVeritas** — Acoustic Deepfake & Synthetic Voice Detection Engine ([GitHub](https://github.com/jeevankb-cse/VoxVeritas))
4. **Smart Voting System** — Biometric Facial Recognition E-Voting Platform ([GitHub](https://github.com/jeevankb-cse/Smart-voting-system-using-face-recognition))

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion)
- **Icons & UI**: Lucide React
- **Build Tool**: Vite
- **CI/CD & Hosting**: GitHub Actions, GitHub Pages, Vercel

---

## Local Development & Deployment

### Prerequisites
- Node.js 20+ / 22+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/jeevankb-cse/portfolio-2.0.git
cd portfolio-2.0

# Install dependencies
npm install --legacy-peer-deps
```

### Start Development Server
```bash
npm run dev
# or
npx vite --port=3000 --host=0.0.0.0
```

### Build for Production
```bash
npm run build
```

---

## CI/CD Deployment

Includes `.github/workflows/deploy.yml` which automatically builds and deploys the production bundle to GitHub Pages whenever changes are pushed to the `main` branch.
