# FreshGuard AI 🥬🍎

**Smart Fridge Monitoring Dashboard for Fruits & Vegetables Freshness Detection**

A modern, AI-powered web application that monitors your fridge's inventory and tracks the freshness of fruits and vegetables in real-time.

![FreshGuard AI Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

---

## ✨ Features

### 📊 Dashboard
- Real-time temperature and humidity monitoring
- Total items count with average freshness score
- Items about to spoil alerts
- Live camera feed placeholder
- Quick alerts panel

### 📦 Inventory Management
- Add and remove items
- Search and filter by freshness status
- Visual freshness indicators (Fresh / Use Soon / Spoiling)
- Category-based organization (Fruits & Vegetables)

### 🤖 AI Analysis
- AI-powered freshness detection
- Visual bounding boxes over detected items
- Detailed freshness scores (0.0 - 1.0)
- Detected issues identification

### 📈 Analytics
- Items wasted per week (Bar Chart)
- Freshness trend over time (Area Chart)
- Cost analysis
- Key insights and recommendations

### ⚙️ Settings
- Notification toggles
- Scan frequency configuration
- Temperature threshold adjustment
- Humidity threshold adjustment

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shravanitalekar2020-cmyk/smart-fridge.git
   cd smart-fridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
smart-fridge/
├── src/
│   ├── components/
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   └── Navbar.jsx       # Top navigation bar
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── data/
│   │   └── mockData.js      # Mock data for the application
│   ├── pages/
│   │   ├── Dashboard.jsx    # Dashboard page
│   │   ├── Inventory.jsx    # Inventory management page
│   │   ├── Analysis.jsx     # AI analysis page
│   │   ├── Analytics.jsx    # Analytics & charts page
│   │   └── Settings.jsx     # Settings configuration page
│   ├── App.jsx              # Main App component with routing
│   ├── index.jsx            # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.20.0 | Routing |
| Tailwind CSS | 3.4.0 | Styling |
| Vite | 5.0.8 | Build Tool |
| Recharts | 2.10.0 | Charts & Graphs |
| Lucide React | 0.294.0 | Icons |

---

## 📋 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Fresh Green | `#22c55e` | Fresh items, success states |
| Warning Yellow | `#eab308` | Use soon items |
| Alert Red | `#ef4444` | Spoiling items, critical alerts |
| Soft Gray | `#f1f5f9` | Backgrounds |
| Pure White | `#ffffff` | Cards, surfaces |

---

## 📸 Screenshots

### Dashboard
- Real-time metrics display
- Camera feed with AI detection overlay
- Quick alerts panel

### Inventory
- Searchable item list
- Freshness progress bars
- Add/Remove functionality

### Analytics
- Waste tracking charts
- Freshness trends
- Cost analysis

---

## 🔧 Configuration

### Default Settings

| Setting | Default Value |
|---------|---------------|
| Temperature Threshold | 4°C |
| Humidity Threshold | 65% |
| Scan Frequency | Every 6 hours |
| Notifications | Enabled |

---

## 👨‍💻 Author

**Shravani Talekar**

GitHub: [@shravanitalekar2020-cmyk](https://github.com/shravanitalekar2020-cmyk)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI Framework [React](https://react.dev/)
- Styling [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 Support

For issues and feature requests, please create an issue in the GitHub repository.

---

**Built with ❤️ for smart fridge monitoring**
