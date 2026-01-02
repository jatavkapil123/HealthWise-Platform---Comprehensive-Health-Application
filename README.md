# HealthWise - AI-Powered Health Platform

A modern, comprehensive health platform built with Next.js, featuring AI-powered diagnostics, telemedicine, mental health support, and community wellness tools.

## ✨ Features

- **AI Symptom Checker** - Intelligent health assessment powered by advanced AI
- **Telemedicine** - Connect with certified doctors through secure video consultations  
- **Mental Health Support** - Access therapy, counseling, and wellness resources
- **Health Monitoring** - Track vital signs and health metrics
- **Community Health** - Join support groups and connect with health experts
- **Emergency Care** - 24/7 emergency support and immediate assistance

## 🎨 Design System

### Theme Features
- **Modern Glass Morphism** - Elegant glass effects with backdrop blur
- **Gradient Accents** - Beautiful health-themed color gradients
- **Smooth Animations** - Micro-interactions and smooth transitions
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Accessibility** - WCAG compliant with proper focus management

### Color Palette
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Health Colors**: Success (`#10b981`), Warning (`#f59e0b`), Danger (`#ef4444`)
- **Accent Colors**: Mint, Coral, Lavender, Peach
- **Neutral**: Sophisticated gray scale with proper contrast

### Typography
- **Primary Font**: Inter (clean, modern, highly readable)
- **Display Font**: Plus Jakarta Sans (friendly, approachable)
- **Responsive Scales**: Fluid typography that adapts to screen size

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthwise-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/healthwise
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # Global styles with design system
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers
├── components/            # Reusable UI components
│   ├── home/             # Home page specific components
│   │   ├── Hero.tsx      # Hero section with search
│   │   ├── FeaturedServices.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── HealthMetrics.tsx
│   │   ├── EmergencyAccess.tsx
│   │   └── CommunityHealth.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Site footer
│   └── ui/               # Base UI components
├── lib/                  # Utility functions
├── services/             # API services
├── types/                # TypeScript type definitions
└── utils/                # Helper utilities
```

## 🎯 Key Components

### Header
- **Glass morphism design** with backdrop blur
- **Responsive navigation** with mobile-friendly menu
- **Smart search** with health topic suggestions
- **Emergency access** button prominently displayed
- **User actions** for notifications and profile

### Hero Section
- **Gradient background** with floating elements
- **Large search bar** for health queries
- **Feature highlights** with animated cards
- **Trust indicators** and user statistics
- **Multiple CTAs** for different user journeys

### Footer
- **Comprehensive links** organized by category
- **Emergency contact** section prominently displayed
- **Social media** integration
- **Certifications** and trust badges
- **Contact information** with multiple channels

## 🛠 Built With

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React (consistent, modern icons)
- **Fonts**: Inter & Plus Jakarta Sans (Google Fonts)
- **Animations**: CSS animations with Tailwind utilities
- **TypeScript**: Full type safety throughout

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Adaptive layouts for tablets
- **Desktop Enhanced**: Rich desktop experience
- **Touch Optimized**: Proper touch targets and gestures

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard Navigation** fully supported
- **Screen Reader** optimized
- **Focus Management** with visible focus indicators
- **Color Contrast** meets accessibility standards

## 🔧 Customization

### Theme Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your primary color scale
  },
  health: {
    // Health-specific colors
  }
}
```

### Component Styles
Modify component classes in `src/app/globals.css`:
```css
.btn-primary {
  /* Your button styles */
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Email**: support@healthwise.com
- **Phone**: +1-800-HEALTHWISE
- **Emergency**: 911 or +1-800-HEALTH

---

**Made with ❤️ for better health outcomes**