import { knowledgeBase } from "./knowledgeBase";

export function retrieveContext(query: string): string {
  const queryLower = query.toLowerCase();
  const matchedChunks: string[] = [];

  // Check overview and portal questions
  if (
    queryLower.includes("overview") ||
    queryLower.includes("about") ||
    queryLower.includes("portal") ||
    queryLower.includes("hospital") ||
    queryLower.includes("healthcare") ||
    queryLower.includes("community") ||
    queryLower.includes("chsp") ||
    queryLower.includes("who are you") ||
    queryLower.includes("general info")
  ) {
    matchedChunks.push(`Hospital Overview: ${knowledgeBase.overview}`);
  }

  // Check departments
  const matchedDepartments = knowledgeBase.departments.filter(
    (dept) =>
      queryLower.includes(dept.name.toLowerCase()) ||
      queryLower.includes(dept.head.toLowerCase()) ||
      dept.description.toLowerCase().split(/\s+/).some((word) => word.length > 5 && queryLower.includes(word)) ||
      queryLower.includes("departments") ||
      queryLower.includes("doctor") ||
      queryLower.includes("physician") ||
      queryLower.includes("specialist") ||
      queryLower.includes("medical team")
  );

  if (matchedDepartments.length > 0) {
    matchedDepartments.forEach((dept) => {
      matchedChunks.push(
        `Department of ${dept.name}:\n- Description: ${dept.description}\n- Department Head: ${dept.head}`
      );
    });
  } else if (queryLower.includes("department") || queryLower.includes("specialty") || queryLower.includes("specialities")) {
    // If asking about departments generally, list all of them
    const list = knowledgeBase.departments.map((d) => d.name).join(", ");
    matchedChunks.push(`Available Hospital Departments: ${list}.`);
  }

  // Check services
  const matchedServices = knowledgeBase.services.filter(
    (svc) =>
      queryLower.includes(svc.name.toLowerCase()) ||
      svc.description.toLowerCase().split(/\s+/).some((word) => word.length > 5 && queryLower.includes(word)) ||
      queryLower.includes("service") ||
      queryLower.includes("laboratory") ||
      queryLower.includes("lab") ||
      queryLower.includes("imaging") ||
      queryLower.includes("diagnostics") ||
      queryLower.includes("clinic") ||
      queryLower.includes("procedure")
  );

  if (matchedServices.length > 0) {
    matchedServices.forEach((svc) => {
      matchedChunks.push(`Service: ${svc.name}\n- Details: ${svc.description}`);
    });
  }

  // Check facilities
  const matchedFacilities = knowledgeBase.facilities.filter(
    (fac) =>
      queryLower.includes(fac.name.toLowerCase()) ||
      fac.description.toLowerCase().split(/\s+/).some((word) => word.length > 5 && queryLower.includes(word)) ||
      queryLower.includes("facility") ||
      queryLower.includes("facilities") ||
      queryLower.includes("lounge") ||
      queryLower.includes("building") ||
      queryLower.includes("where is") ||
      queryLower.includes("room") ||
      queryLower.includes("suite")
  );

  if (matchedFacilities.length > 0) {
    matchedFacilities.forEach((fac) => {
      matchedChunks.push(`Facility: ${fac.name}\n- Description: ${fac.description}\n- Location: ${fac.location}`);
    });
  }

  // Check working hours
  if (
    queryLower.includes("hour") ||
    queryLower.includes("time") ||
    queryLower.includes("working") ||
    queryLower.includes("schedule") ||
    queryLower.includes("open") ||
    queryLower.includes("close") ||
    queryLower.includes("weekend") ||
    queryLower.includes("sunday") ||
    queryLower.includes("saturday") ||
    queryLower.includes("weekday")
  ) {
    knowledgeBase.workingHours.forEach((wh) => {
      matchedChunks.push(`Working Schedule [${wh.days}]: Hours: ${wh.hours}\n- Note: ${wh.notes}`);
    });
  }

  // Check volunteer program
  if (
    queryLower.includes("volunteer") ||
    queryLower.includes("join") ||
    queryLower.includes("contribution") ||
    queryLower.includes("program") ||
    queryLower.includes("help") ||
    queryLower.includes("skills") ||
    queryLower.includes("benefits") ||
    queryLower.includes("compensation") ||
    queryLower.includes("register")
  ) {
    matchedChunks.push(`Volunteer Program Overview: ${knowledgeBase.volunteerInfo.overview}`);
    matchedChunks.push(`Skills requested for volunteers: ${knowledgeBase.volunteerInfo.skillsNeeded.join(", ")}`);
    matchedChunks.push(`Commitment: ${knowledgeBase.volunteerInfo.commitment}`);
    matchedChunks.push(`Volunteer Benefits: ${knowledgeBase.volunteerInfo.benefits.join("; ")}`);
  }

  // Check contact information and location
  if (
    queryLower.includes("contact") ||
    queryLower.includes("address") ||
    queryLower.includes("phone") ||
    queryLower.includes("number") ||
    queryLower.includes("telephone") ||
    queryLower.includes("email") ||
    queryLower.includes("mail") ||
    queryLower.includes("emergency") ||
    queryLower.includes("hotline") ||
    queryLower.includes("where is the hospital") ||
    queryLower.includes("location") ||
    queryLower.includes("website") ||
    queryLower.includes("direction")
  ) {
    matchedChunks.push(`Contact Address: ${knowledgeBase.contactInfo.address}`);
    matchedChunks.push(`Phone Line: ${knowledgeBase.contactInfo.phone}`);
    matchedChunks.push(`Email Address: ${knowledgeBase.contactInfo.email}`);
    matchedChunks.push(`Official Web Address: ${knowledgeBase.contactInfo.webAddress}`);
    matchedChunks.push(`Emergency Clinical Hotline: ${knowledgeBase.contactInfo.emergencyHotline}`);
  }

  // Check complaint questions
  if (
    queryLower.includes("complaint") ||
    queryLower.includes("complain") ||
    queryLower.includes("grievance") ||
    queryLower.includes("dispute") ||
    queryLower.includes("feedback") ||
    queryLower.includes("unhappy") ||
    queryLower.includes("issue") ||
    queryLower.includes("report problem")
  ) {
    matchedChunks.push(
      `How and Where to Report Complaints and Feedback:\n` +
      `- Responsible Department: ${knowledgeBase.complaintInfo.department}\n` +
      `- Office Location: ${knowledgeBase.complaintInfo.location}\n` +
      `- Email Address: ${knowledgeBase.complaintInfo.email}\n` +
      `- Direct Phone Line: ${knowledgeBase.complaintInfo.phone}\n` +
      `- Standard Procedure: ${knowledgeBase.complaintInfo.procedure}`
    );
  }

  // Check appointment booking/process questions
  if (
    queryLower.includes("appointment") ||
    queryLower.includes("book") ||
    queryLower.includes("schedule") ||
    queryLower.includes("reserve") ||
    queryLower.includes("doctor fee") ||
    queryLower.includes("consultation")
  ) {
    matchedChunks.push(
      "Appointment Booking Information:\nPatients can book appointments on this support portal through the 'Appointment Booking' page. The form requires your Full Name, Age, Phone Number, Email, Preferred Department, health symptoms or concerns, and Preferred Date. After booking, our administrators will contact you to verify and confirm your clinical consultation. The support assistant will also provide an automated administrative summary of your symptoms."
    );
  }

  // Fallback if absolutely no keywords matched, pull in general overview, working hours and contacts to form a grounded response
  if (matchedChunks.length === 0) {
    matchedChunks.push(`Hospital Overview: ${knowledgeBase.overview}`);
    matchedChunks.push(
      `Contact Details: Address: ${knowledgeBase.contactInfo.address}\nPhone: ${knowledgeBase.contactInfo.phone}\nEmail: ${knowledgeBase.contactInfo.email}`
    );
    matchedChunks.push(
      `Active OPD Hours: Monday to Friday (8:00 AM - 8:00 PM), Saturdays (9:00 AM - 5:00 PM), Sundays (Closed).`
    );
  }

  return matchedChunks.join("\n\n---\n\n");
}
