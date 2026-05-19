// data/hospitalData.js
// ─── All hospital content lives here ───────────────────────────────────────

export const HOSPITAL = {
  name: "Saiera Miraj Memorial Hospital",
  shortName: "SMMH",
  tagline: "Compassionate Care · Advanced Medicine",
  established: "2006",
  phone: "+92332 2224587",
phoneAlt: "+92332 2224587",
emergency: "+92332 2224587",
  email: "info@sairamirajhospital.com",
emailAppt: "info@sairamirajhospital.com",
 address: "Lahore-Jaranwala Road, Begumkot",
city: "Lahore, Punjab",
country: "Pakistan",
  mapUrl: "https://maps.google.com",
  hours: "Open 24 × 7",
};

export const STATS = [
  { number: "19+",  label: "Years of Service" },
  { number: "70+", label: "Expert Doctors" },
  { number: "15k+", label: "Patients Served" },
  { number: "98%",  label: "Patient Satisfaction" },
];

export const SERVICES = [
  {
    id: "emergency",
    icon: "emergency",
    title: "Emergency Services",
    description:
      "Round-the-clock emergency care with a dedicated team of specialists ready to handle life-threatening conditions at any hour.",
  },
  {
    id: "internal",
    icon: "medicine",
    title: "Internal Medicine",
    description:
      "Comprehensive diagnosis and management of complex medical conditions by our experienced internal medicine specialists.",
  },
  {
    id: "surgery",
    icon: "surgery",
    title: "Surgical Services",
    description:
      "Advanced laparoscopic and open surgical procedures with a focus on patient safety and quick recovery.",
  },
  {
    id: "maternity",
    icon: "maternity",
    title: "Maternity & Gynecology",
    description:
      "Complete maternal care from prenatal to postnatal alongside comprehensive women's health services.",
  },
  {
    id: "lab",
    icon: "lab",
    title: "Diagnostic Lab",
    description:
      "State-of-the-art laboratory with rapid turnaround times for pathology, radiology, and imaging services.",
  },
  {
    id: "cardiology",
    icon: "heart",
    title: "Cardiology",
    description:
      "Comprehensive heart care including echocardiography, stress testing, interventional procedures, and cardiac rehab.",
  },
];

export const DEPARTMENTS = [
  { title: "Cardiology",      desc: "Heart & vascular care" },
  { title: "Neurology",       desc: "Brain & nervous system" },
  { title: "Oncology",        desc: "Cancer treatment & care" },
  { title: "Pediatrics",      desc: "Children's healthcare" },
  { title: "Orthopedics",     desc: "Bone & joint surgery" },
  { title: "Ophthalmology",   desc: "Eye care & surgery" },
  { title: "Urology",         desc: "Urinary tract & kidney" },
  { title: "Gynecology",      desc: "Women's health services" },
  { title: "Dermatology",     desc: "Skin & hair conditions" },
  { title: "Gastroenterology",desc: "Digestive system care" },
  { title: "Psychiatry",      desc: "Mental health support" },
  { title: "Radiology",       desc: "Imaging & diagnostics" },
];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Furkh Shahzad",
    specialty: "General Physician & Administrator",
    qualifications: "MBBS, FCPS",
    experience: "7+ Years",
    timing: "Monday to Saturday, 9:00am to 3:00pm",
    phone: "0333-4288440",
    image: "https://www.sairamirajhospital.com/images/dr_farukh-1.png",
    bio: "General Physician and Administrator at Saira Miraj Hospital with extensive experience in patient care and hospital management.",
    color: ["#065f46", "#0d9488"],
    initials: "FS",
  },
  {
    id: 2,
    name: "Dr. Wajeeha Sajjad",
    specialty: "Gynaecologist",
    qualifications: "MBBS, FCPS Obs & Gynae",
    experience: "5+ Years",
    timing: "By Appointment",
    phone: "+92332 2224587",
    image: "https://www.sairamirajhospital.com/images/dr_wajiha.png",
    bio: "Assistant Professor at AIMC with specialization in Obstetrics and Gynaecology.",
    color: ["#7c3aed", "#a855f7"],
    initials: "WS",
  },
  {
    id: 3,
    name: "Dr. Asif Sarwar",
    specialty: "Pediatrician",
    qualifications: "MBBS, FCPS",
    experience: "10+ Years",
    timing: "By Appointment",
    phone: "+92332 2224587",
    image: "https://www.sairamirajhospital.com/images/dr-asif.png",
    bio: "One of the best Pediatricians in Lahore, treating children from infancy to age 18 with care and compassion.",
    color: ["#1d4ed8", "#3b82f6"],
    initials: "AS",
  },
  {
    id: 4,
    name: "Dr. Hammad Ali Asghar",
    specialty: "Consultant Eye Surgeon",
    qualifications: "MCPS Ophthalmology, MPH",
    experience: "5+ Years",
    timing: "By Appointment",
    phone: "+92332 2224587",
    image: "https://www.sairamirajhospital.com/images/dr-hammad-1.png",
    bio: "Phaco, Glaucoma, Squint & Refractive Eye Surgeon. Senior Registrar at AIMC and Ghurki Trust Teaching Hospital.",
    color: ["#b45309", "#f59e0b"],
    initials: "HA",
  },
  {
    id: 5,
    name: "Dr. Sumaira Aziz",
    specialty: "Physiotherapist",
    qualifications: "DPT (UOL)",
    experience: "5+ Years",
    timing: "By Appointment",
    phone: "+92332 2224587",
    image: "https://www.sairamirajhospital.com/images/dr_sumaira-1.png",
    bio: "Qualified physiotherapist providing rehabilitation and physical therapy services.",
    color: ["#be185d", "#ec4899"],
    initials: "SA",
  },
  {
    id: 6,
    name: "Dr. Nimra Amjad",
    specialty: "Clinical Dietitian & Nutritionist",
    qualifications: "Bronze Medalist",
    experience: "5+ Years",
    timing: "By Appointment",
    phone: "+92332 2224587",
    image: "https://www.sairamirajhospital.com/images/dr_nimra-1.png",
    bio: "Expert in medical nutrition therapy for diabetes, hypertension, PCOS, kidney disorders and weight management.",
    color: ["#065f46", "#10b981"],
    initials: "NA",
  },
];

export const WHY_US = [
  {
    num: "01",
    title: "Expert Medical Team",
    desc: "Over 120 highly qualified consultants and specialists with national and international training credentials.",
  },
  {
    num: "02",
    title: "Advanced Technology",
    desc: "Equipped with the latest in medical imaging, minimally invasive surgical tools, and ICU monitoring systems.",
  },
  {
    num: "03",
    title: "Patient-Centred Care",
    desc: "Every treatment plan is personalised, with dedicated care coordinators ensuring a smooth journey.",
  },
  {
    num: "04",
    title: "24/7 Availability",
    desc: "Our emergency services, pharmacy, and helpline operate continuously — help is always just a call away.",
  },
  {
    num: "05",
    title: "Insurance Coverage",
    desc: "Registered with all major insurance panels ensuring hassle-free cashless treatment for eligible patients.",
  },
  {
    num: "06",
    title: "Accredited Excellence",
    desc: "JCI and ISO accredited, with a proven track record of meeting the highest patient safety benchmarks.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Who We Are",           href: "/about" },
      { label: "Mission & Vision",     href: "/about#mission" },
      { label: "Message from Management", href: "/about#message" },
      { label: "Executive Team",       href: "/about#team" },
      { label: "Our Facilities",       href: "/about#facilities" },
    ],
  },
  {
    label: "Care & Services",
    href: "/services",
    children: [
      { label: "Find a Doctor",        href: "/doctors" },
      { label: "Departments",          href: "/departments" },
      { label: "Emergency Services",   href: "/services#emergency" },
      { label: "Diagnostic Lab",       href: "/services#lab" },
      { label: "Surgical Services",    href: "/services#surgery" },
      { label: "Lab Results Online",   href: "/lab-results" },
    ],
  },
  {
    label: "Patients & Families",
    href: "/patients",
    children: [
      { label: "Patient Rights",       href: "/patients#rights" },
      { label: "Visitor Guide",        href: "/patients#visitor" },
      { label: "Insurance Panels",     href: "/patients#insurance" },
      { label: "Patient Support",      href: "/patients#support" },
      { label: "Health & Wellness",    href: "/patients#wellness" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "News & Events",        href: "/media" },
      { label: "Gallery",              href: "/media#gallery" },
      { label: "Press Releases",       href: "/media#press" },
    ],
  },
  { label: "Careers",  href: "/careers" },
  { label: "Contact",  href: "/contact" },
];
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Mr. Arslan Haider",
    location: "Lahore",
    rating: 5,
    quote: "Exceptional care and attentive staff. Highly recommend! I had a wonderful experience at this hospital. The nurses were incredibly supportive, and the doctors took the time to explain everything clearly.",
  },
  {
    id: 2,
    name: "Ms. Nida Anwar",
    location: "Lahore",
    rating: 5,
    quote: "Clean facilities and compassionate service! The hospital was spotless, and every staff member I encountered was kind and professional. They made my stay comfortable during a challenging time.",
  },
  {
    id: 3,
    name: "Mr. M Asfand Yar",
    location: "Sialkot",
    rating: 5,
    quote: "Efficient and friendly staff made all the difference. From admission to discharge, I felt cared for and respected. The quick response time during my emergency was impressive!",
  },
  {
    id: 4,
    name: "Ms. Amna Umer",
    location: "Lahore",
    rating: 5,
    quote: "Life-changing treatment with a personal touch. I received excellent care for my condition. The doctors were thorough and genuinely concerned about my well-being.",
  },
  {
    id: 5,
    name: "Mr. Saeed Iqbal",
    location: "Sheikhupura",
    rating: 5,
    quote: "Top-notch hospital with a focus on patients. This hospital exceeded my expectations! The entire team worked together seamlessly throughout my entire treatment journey.",
  },
];
