<div align="center">

# 🎯 500Score

### *Professional Card Game Scoring Application*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

*A sleek, modern React application for tracking scores in the classic 500 card game. Built with TypeScript, featuring persistent game state, comprehensive rule references, and a beautiful responsive design.*

[🚀 Live Demo](#) | [📖 Documentation](#features) | [🤝 Contributing](#contributing)

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🎮 **Core Gameplay**
- ♠️ **Suit Selection** - Visual emoji-based suit selection with enhanced visibility
- 🎯 **Smart Scoring** - Automatic calculation based on official 500 rules
- 📊 **Live Scoreboard** - Real-time score tracking with win condition detection
- ⏱️ **Round Timer** - Track time spent on each round

</td>
<td width="50%" valign="top">

### 🔄 **Game Management**
- 💾 **Auto-Save** - Persistent game state with localStorage
- ↩️ **Undo/Redo** - Full game history with action rollback
- 📤 **Export/Import** - Save and load complete game states
- ✏️ **Round Editing** - Modify any previous round with automatic recalculation

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎨 **Modern Design**
- 🌙 **Dark Mode** - Full light/dark theme support
- 📱 **Mobile-First** - Optimized layout and spacing for iPhone and mobile devices
- 💻 **Responsive** - Seamless experience across mobile, tablet, and desktop
- 🎭 **Team Icons** - Customizable team emojis and player names
- ✨ **Smooth Animations** - Polished UI with micro-interactions

</td>
<td width="50%" valign="top">

### 📚 **Comprehensive Rules**
- 🃏 **Joker Rules** - Complete joker gameplay mechanics
- 📢 **Bidding Rules** - Re-entering and bid modification guidelines
- 🎲 **Misère Rules** - Special bid hierarchy and requirements
- 📋 **Scoring Reference** - Interactive scoring table with all suit values

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0+ 
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/davestanyer/500score.git
cd 500score

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
pnpm build

# Preview production build locally
pnpm preview
```

---

## 🎯 Game Rules Quick Reference

<details>
<summary><b>🎴 Basic Scoring</b></summary>

| Suit | ♠️ Spades | ♣️ Clubs | ♦️ Diamonds | ♥️ Hearts | No-Trump |
|------|-----------|----------|-------------|-----------|----------|
| **6** | 40 | 60 | 80 | 100 | 120 |
| **7** | 140 | 160 | 180 | 200 | 220 |
| **8** | 240 | 260 | 280 | 300 | 320 |
| **9** | 340 | 360 | 380 | 400 | 420 |
| **10** | 440 | 460 | 480 | 500 | 520 |

**Special Bids:**
- **Misère**: 250 points (higher than 7, lower than 8)
- **Open Misère**: 500 points

</details>

<details>
<summary><b>🃏 Joker Rules</b></summary>

**Trump Suit Contract:**
- Joker belongs to trump suit and becomes highest trump card
- Must be played if necessary to follow suit

**No Trump Contract:**
- Joker is a suit by itself but wins any trick
- Cannot be played if you can follow suit
- When leading joker, must specify suit for others to follow

</details>

<details>
<summary><b>📢 Bidding Rules</b></summary>

**Re-entering Bidding:**
- Can ALWAYS re-enter when someone changes suit
- Can ALWAYS re-enter when someone increases bid
- Normal bidding rules apply once re-entered

**Changing Your Bid:**
- With competition: Change suit OR increase bid (once each)
- Solo bidder: Can only increase, not change suit (once only)
- Others get chance to re-enter after changes

</details>

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **State Management**: React Hooks + Context API
- **Storage**: Browser localStorage with schema versioning
- **Icons**: Lucide React + Custom emoji system

### Project Structure
```
src/
├── components/          # React components
│   ├── BidInput.tsx    # Bidding interface
│   ├── Scoreboard.tsx  # Score display
│   ├── RoundHistory.tsx # Game history
│   └── ...
├── types/              # TypeScript definitions
├── utils/              # Business logic & utilities
├── constants/          # Game constants & configuration
└── App.tsx            # Main application component
```

### Key Design Patterns
- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Business logic separation
- **Type Safety**: Comprehensive TypeScript coverage
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Works without JavaScript for basic features

---

## 🧪 Development

### Available Scripts

| Command | Description |
|---------|-----------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm format` | Format code with Prettier |

### Development Guidelines

<details>
<summary><b>🔧 Code Standards</b></summary>

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Extended React and TypeScript rules
- **Prettier**: Consistent code formatting
- **Naming**: camelCase for variables, PascalCase for components
- **Commits**: Conventional commit format

</details>

<details>
<summary><b>🎨 UI Guidelines</b></summary>

- **Design System**: Consistent color palette and spacing
- **Responsive**: Mobile-first breakpoints
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Lazy loading and code splitting
- **Dark Mode**: Full theme support

</details>

---

## 🛣️ Roadmap

### ✅ Completed (v2.1)
- [x] Modern UI redesign with iOS-style aesthetics
- [x] Enhanced suit selection with emoji symbols
- [x] Comprehensive rule documentation
- [x] Dark mode support
- [x] Round editing functionality
- [x] Export/import game data
- [x] Undo/redo system
- [x] Round timer feature
- [x] **Mobile-first optimization** - Comprehensive responsive design overhaul
- [x] **Compact layouts** - Optimized spacing and button sizes for mobile devices
- [x] **Touch-friendly interface** - Improved button sizing and touch targets

### 🚧 In Progress
- [ ] Enhanced error handling and validation
- [ ] Performance optimizations (React.memo, useMemo)
- [ ] Comprehensive test suite
- [ ] Accessibility improvements (ARIA, keyboard nav)

### 🔮 Future Features
- [ ] Multiplayer support with real-time sync
- [ ] Advanced game statistics and analytics
- [ ] Tournament mode with bracket management
- [ ] Progressive Web App (PWA) capabilities
- [ ] Cloud save synchronization
- [ ] Customizable house rules

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Fork and clone your fork
git clone https://github.com/YOUR_USERNAME/500score.git
cd 500score

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development server
pnpm dev
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

<table>
<tr>
  <td align="center">
    <a href="https://github.com/davestanyer">
      <img src="https://github.com/davestanyer.png" width="100px;" alt="Dave Stanyer"/>
      <br />
      <sub><b>Dave Stanyer</b></sub>
      <br />
      <small>🚀 Project Owner</small>
    </a>
  </td>
  <td align="center">
    <a href="https://github.com/TomCarey">
      <img src="https://github.com/TomCarey.png" width="100px;" alt="Tom Carey"/>
      <br />
      <sub><b>Tom Carey</b></sub>
      <br />
      <small>💻 Core Contributor</small>
    </a>
  </td>
  <td align="center">
    <a href="https://claude.ai">
      <img src="https://avatars.githubusercontent.com/u/142793510?s=100" width="100px;" alt="Claude AI"/>
      <br />
      <sub><b>Claude AI</b></sub>
      <br />
      <small>🤖 AI Assistant</small>
    </a>
  </td>
</tr>
</table>

---

## 🙏 Acknowledgments

- **500 Card Game Community** for rules clarification and feedback
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first styling approach
- **Vite Team** for the lightning-fast build tool
- **All Contributors** who have helped improve this project

---

<div align="center">

### 💝 Support the Project

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

**Built with ❤️ by the 500Score Team**

[🔝 Back to Top](#-500score)

</div>