This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

I'll read the README and analyze the project structure to give you a complete description.

[11 tools called]

Based on my analysis of your project, here's a complete description of everything:

## **Project Overview: SlideCreation / NeoShark Learning Platform**

This is a **Next.js 15** full-stack educational web application that combines slide/presentation creation with flashcard study features, note-taking, and interactive learning modules. It's built with modern React 19, TypeScript, and uses a complete authentication system.

---

## **🏗️ Tech Stack**

### **Frontend:**
- **Next.js 15.5.4** (App Router with React 19)
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React Three Fiber** & **@react-three/drei** for 3D graphics (shark scene)
- **Radix UI** components (Dialog, Slot)
- **next-themes** for dark/light mode
- **Lucide React** for icons
- **cmdk** for command palette modal
- **Zustand** for state management

### **Backend & Database:**
- **Prisma ORM** (currently SQLite, but you mentioned planning MySQL migration)
- **NextAuth v4** for authentication (Google OAuth)
- **OpenAI API** integration
- **API Routes** for backend logic

---

## **📂 Project Structure**

### **Root Level:**
```
/slidecreation/
├── app/                    # Next.js App Router
├── components/             # Shared UI components
├── lib/                    # Utilities & database
├── prisma/                 # Database schema & migrations
├── public/                 # Static assets
└── Configuration files
```

---

## **🔐 Authentication System**

**Provider:** Google OAuth via NextAuth

**Models (Prisma):**
- `User` - User accounts with email, name, image
- `Account` - OAuth account data  
- `Session` - User sessions with JWT strategy
- `VerificationToken` - Email verification tokens

**Protected Routes:** Everything under `/dashboard/*` is protected by middleware

**Auth Pages:**
- `/signin` - Sign-in page
- `/login` - Login page

---

## **📱 Main Application Areas**

### **1. Landing Page (`/`)**
**Components:**
- `Header` - Hero section
- `AboutSection` - About the platform
- `FeatureSection` - Feature showcase
- `SharkScene` - 3D animated shark (Three.js)
- `NeosharkBackground` - Branded background

### **2. Dashboard (`/dashboard`)**
**Layout:** Authenticated dashboard with sidebar navigation

**Main Features:**

#### **A. Projects Section (`/dashboard/projects`)**
**Purpose:** IDE-like note-taking and learning environment

**Components:**
- `HeaderBar` - Top navigation
- `Sidebar` - Left sidebar with notes list and navigation tabs
  - Notes tab
  - Progress tracker
  - Calendar
  - Study mode
- `NoteTabs` - Tab management for multiple notes
- `NoteEditor` - Rich text editor for notes with:
  - Title editing
  - Content editing
  - Auto-save functionality
- `RightSidebar` - Chatbot/AI assistant
- `BottomTerminal` - Terminal emulator
- `FocusModeButton` - Distraction-free mode toggle

**Learning Modules:**
Located in `/dashboard/projects/components/learning/`

Current modules in `PreviewPane`:
1. **Flashcard Module** - Study flashcards
2. **Practice Tests Module** - Take practice exams
3. **Multiple Choice Module** - Quiz yourself

**Module Files:**
- `modules.ts` - Module registry
- `FlashcardModule.tsx` - Flashcard practice
- `PracticeTestModule.tsx` - Practice testing
- `MultipleChoiceModule.tsx` - Multiple choice quizzes
- Legacy modules (Recursion, Sorting, Trees) - Previous learning content

#### **B. Flashcards Section (`/dashboard/flashcards`)**
**Purpose:** Create and study flashcards with spaced repetition

**Routes:**
- `/dashboard/flashcards` - List all flashcards
- `/dashboard/flashcards/new` - Create new flashcard
- `/dashboard/flashcards/[id]/edit` - Edit existing flashcard
- `/dashboard/flashcards/study` - Study mode

**API Endpoints:**
- `GET/POST /api/flashcards` - List/create flashcards
- `GET/PUT/DELETE /api/flashcards/[id]` - CRUD operations

**Database Model:**
```prisma
Flashcard {
  id, front, back, userId, createdAt, updatedAt
}
```

#### **C. Settings (`/dashboard/settings`)**
User preferences and configuration

---

## **🎨 UI Components** (`/components/ui/`)

Reusable Radix UI + Tailwind components:
- `button.tsx` - Button variants
- `card.tsx` - Card container
- `command.tsx` - Command palette
- `dialog.tsx` - Modal dialogs
- `input.tsx` - Form inputs

---

## **🧩 Key Features**

### **1. AI Integration**
- OpenAI API for content generation
- Chat interface in projects section
- API route: `/api/chat`

### **2. Theme System**
- Light/Dark mode toggle
- Persistent theme with `next-themes`
- Tailwind dark mode classes

### **3. Command Palette**
- Keyboard shortcuts (`Cmd+K`)
- Quick navigation modal
- Route: `/@modal/(.)cmd`

### **4. Tab Navigation**
Multiple tab systems for organizing content:
- `TabNavigation.tsx` - Main tab component
- Specific tabs: Overview, Content, Design, Media, Review

### **5. Slide Generator**
- `lib/slideGenerator.ts` - Slide creation logic
- `Slide.tsx` component for rendering

---

## **🗄️ Database Schema (Prisma)**

**Current:** SQLite (`dev.db`)  
**Planned:** MySQL migration

**Tables:**
1. **User** - User accounts
2. **Account** - OAuth accounts
3. **Session** - User sessions
4. **VerificationToken** - Email verification
5. **Flashcard** - User flashcards with front/back

**Relations:**
- User → Flashcards (one-to-many)
- User → Accounts (one-to-many)
- User → Sessions (one-to-many)

---

## **🎯 Application Flow**

1. **Landing** → User visits homepage
2. **Sign In** → Google OAuth authentication
3. **Dashboard** → Protected dashboard access
4. **Projects** → IDE-like note editor with learning modules
5. **Flashcards** → Create/study flashcards
6. **AI Chat** → Ask questions and get help

---

## **🔧 Configuration Files**

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript config
- `tailwind.config` (via postcss.config.mjs)
- `components.json` - Radix UI component config
- `eslint.config.mjs` - Linting rules
- `.gitignore` - Git ignore patterns

---

## **📦 Key Dependencies**

- `next` 15.5.4
- `react` 19.1.0
- `next-auth` 4.24.11
- `@prisma/client` 6.17.1
- `openai` 6.5.0
- `framer-motion` 12.23.22
- `three` 0.180.0
- `zustand` 5.0.8

---

## **🚀 Development Commands**

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

---

## **📝 Notes**

- The README is still the default Next.js template - needs updating to reflect actual project features
- Some legacy learning modules (Recursion, Sorting, Trees) still exist but are being replaced with the new module system (Flashcards, Practice Tests, Multiple Choice)
- The project appears to be transitioning from a slide creation focus to a more comprehensive learning platform called "NeoShark"

Would you like me to write an updated, comprehensive README that reflects all of this?







The tructure

I'll analyze the project structure and create a comprehensive overview of the entire codebase. Let me examine the key files to understand the architecture.


[5 tools called]

Now let me examine some key components and the dashboard structure:


[4 tools called]

Let me also check the API routes and some key components:


[3 tools called]

Now let me check the learning modules structure:


[2 tools called]

Based on my analysis of the codebase, here's the comprehensive structure of the **NeoShark** project:

# NeoShark Project Structure

## 🏗️ **Project Overview**
**NeoShark** is a Next.js 15 application that serves as an AI-powered presentation builder and educational platform with flashcard functionality. It features Google OAuth authentication, interactive learning modules, and a modern React-based UI.

---

## 📁 **Root Directory Structure**

```
slidecreation/
├── 📁 app/                          # Next.js App Router (main application)
├── 📁 components/                   # Shared UI components
├── 📁 lib/                         # Utilities and configurations
├── 📁 prisma/                      # Database schema and migrations
├── 📁 public/                      # Static assets
├── 📄 package.json                 # Dependencies and scripts
├── 📄 next.config.ts               # Next.js configuration
├── 📄 middleware.ts                # Authentication middleware
└── 📄 tsconfig.json                # TypeScript configuration
```

---

## 🎯 **Core Application Structure**

### **1. App Router (`/app/`)**

#### **Authentication System**
```
app/
├── (auth)/                         # Route group for auth pages
│   ├── login/page.tsx              # Login page
│   └── signin/page.tsx             # Sign-in page
├── @modal/                         # Parallel route for modals
│   └── (.)cmd/page.tsx             # Command modal
├── api/                            # API routes
│   ├── auth/[...nextauth]/route.ts # NextAuth configuration
│   └── flashcards/                 # Flashcard API endpoints
│       ├── route.ts                # GET/POST flashcards
│       └── [id]/route.ts           # Individual flashcard operations
```

#### **Main Pages**
```
app/
├── page.tsx                        # Landing page
├── layout.tsx                      # Root layout with providers
├── providers.tsx                   # Context providers (Auth, Theme)
├── About/page.tsx                  # About page
├── preview/page.tsx                # Preview functionality
└── try/                           # Testing/development pages
```

#### **Dashboard System**
```
app/dashboard/
├── layout.tsx                      # Dashboard layout with sidebar
├── page.tsx                        # Main dashboard overview
├── settings/page.tsx               # User settings
├── flashcards/                     # Flashcard management
│   ├── page.tsx                    # Flashcard list
│   ├── new/page.tsx                # Create new flashcards
│   ├── [id]/edit/page.tsx          # Edit flashcards
│   ├── [id]/study/page.tsx         # Study mode
│   └── FlashcardAnalytics.tsx      # Analytics component
└── projects/                       # Learning projects
    ├── page.tsx                    # Projects overview
    ├── components/                 # Project components
    └── store/                      # State management
```

---

## 🧩 **Component Architecture**

### **Shared Components (`/components/`)**
```
components/
└── ui/                            # Reusable UI components
    ├── button.tsx                  # Custom button component
    ├── card.tsx                     # Card component
    ├── command.tsx                  # Command palette
    ├── dialog.tsx                   # Modal dialogs
    └── input.tsx                    # Input components
```

### **App Components (`/app/components/`)**
```
app/components/
├── Header.tsx                      # Main header
├── Navbar.tsx                      # Navigation bar
├── Footer.tsx                      # Footer component
├── DashboardSidebar.tsx            # Dashboard navigation
├── DashboardHeader.tsx             # Dashboard header
├── DashboardGrid.tsx               # Dashboard layout grid
├── LayoutWrapper.tsx               # Layout wrapper
├── command-modal.tsx               # Command modal
├── NeosharkBackground.tsx          # Background animations
├── SharkScene.tsx                  # 3D shark scene
├── Slide.tsx                       # Slide component
├── InputForm.tsx                   # Form components
├── cards.tsx                       # Card components
├── rightnav.tsx                    # Right navigation
├── TabNavigation.tsx               # Tab navigation
└── tabs/                          # Tab components
    ├── ContentTab.tsx              # Content editing
    ├── DesignTab.tsx               # Design tools
    ├── MediaTab.tsx                # Media management
    ├── OverviewTab.tsx             # Overview display
    ├── ReviewTab.tsx               # Review interface
    └── SlideBuilder.tsx            # Slide builder
```

---

## 🎓 **Learning System Architecture**

### **Learning Modules (`/app/dashboard/projects/components/`)**
```
components/
├── FlashcardModule.tsx             # Flashcard learning
├── PracticeTestModule.tsx          # Practice tests
├── MultipleChoiceModule.tsx        # Multiple choice questions
├── NoteEditor.tsx                  # Note-taking interface
├── PreviewPane.tsx                 # Content preview
├── RightSidebar.tsx                # Right sidebar
├── Sidebar.tsx                     # Main sidebar
├── ActivityBar.tsx                 # Activity tracking
├── BottomTerminal.tsx              # Terminal interface
├── Chat.tsx                        # Chat functionality
├── EditorPane.tsx                  # Code editor
├── FocusModeButton.tsx             # Focus mode toggle
├── HeaderBar.tsx                   # Header bar
├── InputBar.tsx                    # Input interface
├── SplitDivider.tsx                # Resizable panels
├── notetabs.tsx                    # Note tabs
├── multipleChoice.tsx              # Multiple choice UI
├── PracticeText.tsx                # Practice text
└── learning/                       # Learning modules
    ├── modules.ts                  # Module definitions
    ├── RecursionModule.tsx         # Recursion learning
    ├── RecursionTabs.ts            # Recursion tabs
    ├── SortingModule.tsx           # Sorting algorithms
    ├── SortingTabs.ts              # Sorting tabs
    ├── TreesModule.tsx             # Tree data structures
    └── TreesTabs.ts                # Tree tabs
```

---

## 🗄️ **Database & State Management**

### **Database Schema (`/prisma/schema.prisma`)**
```prisma
Models:
├── User                           # User accounts
├── Account                        # OAuth accounts
├── Session                        # User sessions
├── VerificationToken              # Email verification
└── Flashcard                      # User flashcards
```

### **State Management**
```
lib/
├── store.ts                       # Main app state (Zustand)
├── prisma.ts                      # Database client
├── slideGenerator.ts              # Slide generation logic
└── utils.ts                       # Utility functions

app/dashboard/projects/store/
├── useTabsStore.ts                # Tab navigation state
└── usePracticeStore.ts            # Practice session state
```

---

## 🔧 **Technology Stack**

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

### **Backend**
- **Database**: SQLite (development) / MySQL (production) [[memory:5030276]]
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Google OAuth
- **API**: Next.js API Routes

### **Development Tools**
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm
- **Version Control**: Git

---

## 🚀 **Key Features**

1. **Authentication System**
   - Google OAuth integration
   - Protected routes with middleware
   - Session management

2. **Learning Platform**
   - Interactive flashcards
   - Multiple learning modules (Recursion, Sorting, Trees)
   - Practice tests and multiple choice questions
   - Study analytics

3. **Presentation Builder**
   - Slide creation and editing
   - Multiple content types (text, media, code)
   - Preview functionality
   - Tab-based interface

4. **Modern UI/UX**
   - Dark/light theme support
   - Responsive design
   - 3D animations and graphics
   - Command palette for quick actions

5. **State Management**
   - Global state with Zustand
   - Local component state
   - Persistent user data

This structure represents a comprehensive educational platform with presentation building capabilities, built using modern React patterns and Next.js best practices.