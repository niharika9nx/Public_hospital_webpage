# Community Healthcare Support Portal (CHSP)

A modern, responsive, and human-centered outpatient coordination portal designed to streamline clinic scheduling, facilitate volunteer intake, and deliver administrative search assistance.

---

## 🎨 Design Philosophy & Colors
This application replaces clinical blue-dominant palettes with a warm, community-oriented color profile:
- **Tonal Palette**: Soft Cream backgrounds, rich Ambers (`amber-600`), and earthy Greens (`emerald-600`) paired with high-contrast Charcoal text (`stone-850`) for a modern, approachable visual layout.
- **Typography**: Paired display headings in **Raleway** for visual character with **Manrope** for body copy to ensure high typography pacing, legible information density, and absolute accessibility.
- **Micro-interactions**: Subtle glassmorphism, sticky transitions on the header navigation, custom cursor hover effects on bento cards, and responsive sliding motion transitions powered by Framer Motion.

---

## 🚀 Core Features

### 1. Unified Home Dashboard
- **Image Carousel**: Autoplaying visual slider detailing clinical operations, specialist doctors, and community aid programs, synchronized with animated copy and smooth transition zooms.
- **Services Blueprint**: Grid view of specialties (General Practice, NGO Roster coordination, Wellness lounges).
- **Facilities Grid**: Expandable bento blocks demonstrating OPD locations, Patient Comfort lounges, and volunteer clinics.

### 2. Formulated Outpatient Care Scheduler (Left Panel)
- **Validation-Vetted Inputs**: Fully integrated client-side verification for phone, age bounds, and symptom descriptions.
- **Patient Clinical Briefing**: Interactive summary compiled automatically after booking submissions, featuring Markdown formatting and advisory tags.

### 3. Portal Support Assistant (Right Panel)
- **Knowledge-Grounded Helpers**: High-speed, context-grounded chat interface that resolves queries about departments, OPD timetables, specific rooms, facilities, and physical coordinates.
- **Prescriptive Grounding Advice**: Pre-populated action chips for one-click access to critical operations.

### 4. Volunteer Intake desk
- Dedicated registration form designed for coordinate logging, skill inventory tracking, and scheduling commitments.

### 5. Detailed Contacts Directory
- Active calendars for outpatient timetables, specific telephone channels, and critical disaster advisories.

---

## 📁 Key File Structure
```
├── server.ts                   # Backend Express proxy & Vite development engine
├── src/
│   ├── App.tsx                 # Navigation coordinator & sticky header scroll engine
│   ├── main.tsx                # Client mounting target
│   ├── index.css               # Global Raleway / Manrope config and keyframes
│   ├── data/
│   │   └── knowledgeBase.ts    # Hospital handbook data
│   ├── pages/
│   │   ├── Home.tsx            # Redesigned landing, staff, and bento cards
│   │   ├── Appointment.tsx     # Refined split scheduler & chatbot
│   │   ├── Volunteer.tsx       # Intake coordinator
│   │   └── Contact.tsx         # Directories & clinic timetables
│   └── components/
│       └── MarkdownView.tsx    # Styled renderer for briefings and chat responses
├── package.json                # Bundler configurations
└── tsconfig.json               # Type bindings
```

---

## 📦 Setting Up the Workspace

### Prerequisites
- **Node.js** (v18 or higher is recommended)
- **npm** (v9 or higher)

### Installation
1. Clone or unpack the files into your local workspace.
2. Install dependencies:
```bash
npm install
```

### Running Locally
To launch the developmental server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production
To bundle assets and compile the Express backend into a single self-contained executable:
```bash
npm run build
```
The output is written into the `dist/` directory.

### Launching Production Mode
To launch the production server with minimized network latency and maximum asset caching:
```bash
npm start
```
