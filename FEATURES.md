#  HR Portal - Feature Documentation

This document explicitly lists all features currently implemented in the HR Portal & AI Policy Assistant application.

## 🚀 Key Modules

### 1. Authentication & Security
- **Secure Login Screen**: A vertically centered, glassmorphic login card with animated background shapes.
- **Validation**:
  - Email field is case-insensitive and trims whitespace automatically.
  - Form validation prevents empty submissions.
  - Loading states during authentication simulation.
- **Session Management**: User session persists via `localStorage`, allowing auto-login on refresh.

### 2. Layout & Navigation
- **Responsive Layout**: 
  - **Desktop**: Maximum screen utilization (up to 1600px width) for productivity.
  - **Mobile**: Single-column view with a slide-out drawer (Hamburger menu).
- **Interactive Sidebar**:
  - Categorized menu items (Policies vs. AI Tools).
  - Active state highlighting with gradient text effects.
  - Smooth transitions and hover effects.

### 3. AI Policy Q&A Assistant (ChatBot)
- **RAG-Simulated Chat Interface**:
  - Context-aware answers based on internal policy data (e.g., "What is the notice period?").
  - "Thinking" indicators with bouncing animations.
- **Smart Suggestions**:
  - One-click quick questions (chips) to guide users (e.g., "Tell me about leave policies").
- **Rich Message Formatting**: 
  - Distinct styles for User (dark/gradient) and AI (light/glass) messages.
  - Source citations highlighting authoritative documents.

### 4. AI Document Assistant (New!)
A dedicated hub for automating administrative tasks, accessible via the sidebar.

#### 📄 A. Document Generator
- **Instant Templates**: Create professional documents instantly.
  - **Offer Letters**: Generates structured letters with candidate name, CTC, and start date.
  - **NDAs**: Generates legal non-disclosure agreements.
- **Field Validation**: Robust checking ensures no incomplete documents are generated.
- **Live Preview**: Real-time markdown rendering of the generated document.

#### 📝 B. Policy Summarizer
- Extracts key points from long policy documents.
- Presents actionable insights in a concise bullet-point format.
- Visual "AI Pulse" animation during processing.

#### 🌐 C. Policy Translator
- Simulates translation of policy documents into multiple languages:
  - Spanish (Español)
  - French (Français)
  - German (Deutsch)
  - Hindi (हिंदी)

### 5. UI/UX & Design System
- **Premium Aesthetic**: 
  - Consistent **Glassmorphism** theme throughout (frosted glass backgrounds).
  - Modern San Francisco-style typography (Unified font family).
- **Animations**:
  - `Framer Motion` used for smooth page transitions and tool switching.
  - CSS animations for background blobs, spinners, and pulses.
- **Responsive Design**:
  - Dynamic viewport sizing (`dvh`) for mobile browsers.
  - Adaptive grid-to-stack layouts for complex forms.

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript (via Vite).
- **Styling**: Vanilla CSS3 with CSS Variables for consistent theming.
- **Icons**: Lucide React.
- **Animation**: Framer Motion.
