export interface HospitalInfo {
  overview: string;
  departments: { name: string; description: string; head: string }[];
  services: { name: string; description: string; icon: string }[];
  facilities: { name: string; description: string; location: string }[];
  workingHours: { days: string; hours: string; notes: string }[];
  volunteerInfo: {
    overview: string;
    skillsNeeded: string[];
    commitment: string;
    benefits: string[];
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    webAddress: string;
    emergencyHotline: string;
  };
}

export const knowledgeBase: HospitalInfo = {
  overview: "The Community Healthcare Support Portal (CHSP) is an advanced healthcare workspace committed to providing high-quality, compassionate, and accessible medical services to the local community. Founded with a vision of comprehensive well-being, our facility serves as a vital resource for primary care, specialized medical consultation, diagnostic imaging, and robust patient support programs.",
  departments: [
    {
      name: "General Medicine",
      description: "Comprehensive primary healthcare, routine health check-ups, active screenings, preventive consultations, and management of chronic conditions (e.g., hypertension, diabetes).",
      head: "Dr. Clara Winters, MD"
    },
    {
      name: "Pediatrics",
      description: "Compassionate, specialist medical tracking and curative services tailored for infants, children, and adolescents. Includes vaccinations, development monitoring, and childhood disease management.",
      head: "Dr. Raymond Vance, MD"
    },
    {
      name: "Cardiology",
      description: "State-of-the-art cardiovascular health assessments, ECG, echocardiograms, blood pressure telemetry, heart murmur evaluations, and preventative care plans.",
      head: "Dr. Marcus Sterling, FACC"
    },
    {
      name: "Orthopedics",
      description: "Expert skeletal and joint care, treatment for sports injuries, osteoporosis, fractures, arthritis management, and personalized physical rehabilitation advice.",
      head: "Dr. Evelyn Brooks, MD"
    },
    {
      name: "Dermatology",
      description: "Clinical skin, hair, and nail treatments for conditions such as eczema, psoriasis, acne, early skin anomaly tracking, and advanced patch testing.",
      head: "Dr. Jordan Mercer, MD"
    }
  ],
  services: [
    {
      name: "Primary & Family Care",
      description: "Your foundational health partner. Dedicated to continuous, coordinated, and personal medical care for all ages.",
      icon: "HeartPulse"
    },
    {
      name: "Diagnostic Laboratory & Imaging",
      description: "High-precision physical tests, immediate blood/urine analytics, high-resolution ultrasounds, and digital X-ray diagnostics on-site.",
      icon: "Activity"
    },
    {
      name: "Outpatient Services (OPD)",
      description: "Same-day therapeutic and surgical procedures without the requirement of overnight stays, allowing fast healing at home.",
      icon: "Stethoscope"
    },
    {
      name: "Health & Nutrition Workshops",
      description: "Free weekly public webinars and classes covering heart healthy tips, childhood nutrition, stress relief, and weight management.",
      icon: "Award"
    }
  ],
  facilities: [
    {
      name: "Precision Labs & Imaging Suite",
      description: "Equipped with state-of-the-art diagnostic machinery. Delivers accurate, high-speed findings within hours directly to patient portal.",
      location: "Ground Floor, West Wing"
    },
    {
      name: "Patient Serenity Lounge",
      description: "A spacious waiting and reflection zone designed with calming lighting, negative noise technology, and comfortable seating to ensure peace of mind.",
      location: "First Floor, Central Atrium"
    },
    {
      name: "State-of-the-Art Intensive Support Unit",
      description: "Multi-parameter digital monitoring and emergency support beds ensuring immediate response and top-grade observation.",
      location: "Second Floor, East Wing"
    },
    {
      name: "Community Wellness Center",
      description: "A modular, interactive auditorium for healthcare literacy panels, support groups, and patient physical coordination activities.",
      location: "Annex Building, Suite B"
    }
  ],
  workingHours: [
    {
      days: "Monday to Friday (Weekdays)",
      hours: "8:00 AM - 8:00 PM",
      notes: "Full outpatient appointments, specialty clinics, primary care, and complete laboratory diagnostics are active."
    },
    {
      days: "Saturday (Weekend Care)",
      hours: "9:00 AM - 5:00 PM",
      notes: "Primary family care, routine diagnostics, and scheduled specialist reviews are available."
    },
    {
      days: "Sunday (Closed)",
      hours: "Closed",
      notes: "The physical facility is closed. Only emergency phone operators and self-service online portal booking requests are active."
    }
  ],
  volunteerInfo: {
    overview: "Our Volunteer Program connects passionate individuals to high-impact activities in patient companionship, clinical and administrative support, health literacy campaigns, and community engagement. Volunteers play a vital role in elevating patient satisfaction and ensuring hospital accessibility.",
    skillsNeeded: [
      "Patient Companionship & Guiding",
      "Administrative Support & Digital Record Entry",
      "Diverse Languages Translation (English, Spanish, etc.)",
      "Community Public Health Awareness campaigns",
      "Recreational activity planning for pediatric wards"
    ],
    commitment: "Flexible schedules starting from a minimum of 4 hours per week. Morning, afternoon, and Saturday shifts are available.",
    benefits: [
      "Clinician networking opportunity and medical career development",
      "Hands-on exposure to clinical operations and patient support ecosystems",
      "Formal certificate of community service hours and professional letters of recommendation",
      "Complimentary health screenings and wellness seminars"
    ]
  },
  contactInfo: {
    address: "104 Hope Care Boulevard, Medical District, Suite 500, Metropolis, MP 94103",
    phone: "+1 (555) 321-4321",
    email: "support@communityhealthcareportal.org",
    webAddress: "https://www.communityhealthcareportal.org",
    emergencyHotline: "+1 (555) 911-3000"
  }
};
