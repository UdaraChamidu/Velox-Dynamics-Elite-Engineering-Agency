# Velox Dynamics

A cutting-edge, high-performance business website and client portal built for modern digital agencies. Features a premium design, interactive tools, and a comprehensive client dashboard.

![Velox Dynamics Logo](/public/logo.png)

## 🚀 Key Features

### 🎨 Modern UX/UI
- **Premium Design**: Gradient-rich, glassmorphism aesthetic with engaging animations (Framer Motion).
- **Dark/Light Theme**: Fully supported theme switching with persistence.
- **Responsive**: Mobile-first design that works perfectly on all devices.
- **PWA Ready**: Installable on mobile and desktop devies for a native app-like experience.

### 🛠️ Interactive Tools
- **Budget Calculator**: Real-time project cost estimation based on complexity and features.
- **ROI Calculator**: Calculate return on investment, cost savings, and payback period.
- **Timeline Estimator**: Estimate project duration with phase breakdowns.
- **Service Request Wizard**: Multi-step, interactive form for detailed project inquiries.

### 💼 Business Features
- **Client Portal**: Secure dashboard for clients to manage projects and files.
- **Case Studies & Portfolio**: Showcase of past work with filtering and details.
- **Blog & News**: Content management system for industry insights.
- **Interactive Pricing**: Service comparison tables and tier-based pricing cards.
- **Team & Careers**: Company culture and team member profiles.

### ⚡ Technical Highlights
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Cards.
- **High Performance**: Built with Vite for lightning-fast loading.
- **Accessibility**: ARIA labels and keyboard navigation support.
- **Analytics**: Integrated Google Analytics 4.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Maps**: React Leaflet
- **Charts**: Recharts
- **Forms**: Formik / Custom Hooks
- **Email**: EmailJS Integration
- **Payments**: Stripe (Ready for integration)

## 📂 Project Structure

```
velox-dynamics/
├── public/                 # Static assets (images, icons, manifest)
├── src/
│   ├── components/
│   │   ├── forms/          # Interactive forms (Wizards, Contact)
│   │   ├── navigation/     # Navbars, Sidebars, Footer
│   │   ├── tools/          # Calculators (Budget, ROI, Timeline)
│   │   ├── ui/             # Reusable UI components (Buttons, Cards)
│   │   └── search/         # Search functionality
│   ├── contexts/           # Global state (Auth, Theme, Data)
│   ├── layouts/            # Page layouts (Dashboard, Public)
│   ├── pages/
│   │   ├── public/         # Public facing pages (Home, Pricing, etc.)
│   │   ├── dashboard/      # Protected client pages
│   │   ├── auth/           # Login/Register pages
│   │   └── error/          # 404, 500 pages
│   ├── styles/             # Global CSS and Tailwind overrides
│   └── utils/              # Helper functions
├── .env                    # Environment variables
├── index.html              # Entry point
└── tailwind.config.js      # Design system configuration
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/velox-dynamics.git
   cd velox-dynamics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file based on `.env.example` and add your keys:
   ```
   VITE_EMAILJS_SERVICE_ID=your_id
   VITE_EMAILJS_TEMPLATE_ID=your_id
   VITE_EMAILJS_PUBLIC_KEY=your_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_key
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Theme Customization
Edit `tailwind.config.js` to modify the color palette, fonts, and box shadows. The theme uses CSS variables defined in `src/index.css`.

### Navigation
Update `src/components/navigation/PublicNav.jsx` to modify top navigation links.
Update `src/components/navigation/DashboardSidebar.jsx` for client portal menu items.

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.

---
© 2024 Velox Dynamics. All rights reserved.
