# Community Healthcare Support Portal (CHSP)

A full-stack, responsive web application designed to streamline resident and patient interactions for local community outpatient centers. This platform simplifies outpatient (OPD) scheduling, coordinates community volunteer intake, and features an interactive directories assistant.

---

## 1. Project Overview
The **Community Healthcare Support Portal** serves as an administrative bridge between clinical outpatient departments (OPD), local caregivers, and residents. It provides:
1. **Clinical Consultation Scheduling**: An structured booking form that validates patient symptoms and compiles a clinical summary that clinicians can review before the appointment.
2. **Help-Desk Directory Assistant**: A secure text interface that answers patient questions about operational hours, facility maps, specialists, and registration steps based on the hospital's local directory database.
3. **Volunteer Network Program**: An interactive enrollment intake system supporting public participation and administrative scheduling.

---

## 2. Features & Modules
* **Interactive Dashboard**: Modern landing page with responsive layouts, services grids, specialist directories, and facility information cards.
* **Intake Briefing Generator**: Validates scheduling data (such as strict clinical age parameters between 1-125), and utilizes a compiled summarization layout to present clinicians with a precise overview of patient concerns.
* **Directory Search Assistant**: A dedicated assistant answering questions regarding outpatient hours or physical floor destinations. It is strictly configured to protect patient safety by addressing only operational matters and politely declining clinical diagnostic or pharmaceutical prescription requests.
* **Community Volunteer Registry**: A responsive form designed to sign up community assistants, matching schedule availability to program logistics.
* **Unified Contact Page**: Physical coordinates with MapPin markers, department dispatch lines, and weekly working calendars.

---

## 3. Technology Stack
* **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS, Lucide Icons, Framer Motion
* **Backend**: Node.js, Express (custom server supporting Vite middleware mode for local development and optimized static asset delivery in production)
* **SDKs**: Google GenAI SDK (`@google/genai`) for secure, server-side data summarization and assistance

---

## 4. System Architecture
This application utilizes a full-stack architecture designed to keep sensitive keys and logic securely contained on the server:

```
[ Patient / Browser ] 
         │ 
         ▼ (Fetch requests)
[ Express API Server ] ── (Locates Local Directory Database)
         │ 
         ▼ (Securely includes environment secrets)
[ Google Gemini Model Endpoints ]
```

### Context Retrieval & Formatting
To ensure high thematic accuracy and support user queries:
1. **Keyword-Based Retrieval**: The search assistant processes incoming questions and scores matching indexes against a local directory database containing working hours, physical floor plans, and expert specialists.
2. **Instruction Appended Constraints**: The server pairs the extracted facts alongside the user query in a structured prompt. This forces the model to draw replies *only* from verified coordinates, and politely defaults if the query pertains to clinical therapy, custom code templates, or unrelated subjects.
3. **Resilient Failover Chain**: In the event of system or rate limits, the server steps down to high-availability alternative models to prevent form crashes.

---

## 5. Setting Up the Project

### Environment Variables
To enable the clinical briefing summaries and directory search assistant, declare your secret key in a `.env` file at the root:

```env
# Server secret for the Gemini API
GEMINI_API_KEY="your_actual_key_here"
```

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the local full-stack development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact with the application.

### Production Build & Deployment
Build and bundle both frontend and backend bundles for production deployment:
```bash
npm run build
npm start
```
The application compiles a compressed client bundle and packages the Express entry point into the `dist/` directory for highly optimized deployment execution.

---

## 6. Clinical & Operational Value
* **Alleviating Front-Desk Load**: Standard operational questions (such as laboratory times and clinic locations) are instantly handled, allowing nursing staff to focus on critical patients.
* **Clinical Intake Optimization**: By packaging patient-submitted symptoms into structured briefs, healthcare coordinators spend less time taking manual notes during initial consultations.
