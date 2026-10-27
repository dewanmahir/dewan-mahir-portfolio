// Personal contact and social details
export const profile = {
  name: "Dewan Mahir",
  designation: "Full-Stack Web Developer",
  location: "Bangladesh",
  email: "dewanmahirofficial@gmail.com",
  phone: "+880 1710271452",
  whatsapp: "https://wa.me/8801710271452",
  github: "https://github.com/dewanmahir",
  linkedin: "https://www.linkedin.com/in/dewanmahir/",
  facebook: "https://www.facebook.com/dewanmahirofficial",
  resume: "/resume.pdf",
};

export const skills = [
  {
    name: "HTML5",
    category: "Frontend",
    level: 100,
    label: "Strong foundation",
  },
  {
    name: "CSS3 & Responsive Design",
    category: "Frontend",
    level: 95,
    label: "Flexbox, Grid & Animations",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    level: 90,
    label: "Async, DOM & APIs",
  },
  {
    name: "React.js",
    category: "Frontend",
    level: 88,
    label: "Hooks, Router & State",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 78,
    label: "App Router & SSR",
  },
  {
    name: "Node.js & Express",
    category: "Backend",
    level: 82,
    label: "RESTful APIs & Auth",
  },
  {
    name: "MongoDB",
    category: "Backend",
    level: 75,
    label: "Database Modeling & CRUD",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    level: 92,
    label: "Version Control & Branching",
  },
  {
    name: "TypeScript",
    category: "Tools",
    level: 80,
    label: "Types, Interfaces & Safety",
  },
];

export const services = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Crafting clean, responsive, and high-performance user interfaces using React, Next.js, and modern CSS with mobile-first principles.",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Apps",
    description:
      "Developing scalable full-stack web applications connecting interactive frontend interfaces with robust Node.js and Express RESTful APIs.",
    skills: ["Node.js", "Express", "REST APIs", "CRUD Operations"],
  },
  {
    id: "performance",
    title: "Performance & Optimization",
    description:
      "Auditing websites for lightning-fast page speed, SEO best practices, accessibility standards (WCAG), and clean component architecture.",
    skills: [
      "PageSpeed",
      "SEO Optimization",
      "Clean Architecture",
      "Cross-Browser",
    ],
  },
  {
    id: "uiux",
    title: "UI/UX & Interactive Design",
    description:
      "Translating Figma mockups and wireframes into pixel-perfect code with smooth transitions, dark/light themes, and intuitive ergonomics.",
    skills: ["Figma to Code", "Micro-interactions", "Dark Mode", "Ergonomics"],
  },
];

export const certificates = [
  {
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    date: "2024",
    credentialUrl: "https://github.com/dewanmahir",
    skills: ["MERN Stack", "React", "Node.js", "MongoDB", "Firebase"],
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialUrl: "https://www.freecodecamp.org",
    skills: ["ES6+", "Algorithms", "Data Structures", "OOP", "Functional"],
  },
  {
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialUrl: "https://www.freecodecamp.org",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Media Queries"],
  },
];

export const projects = [
  {
    slug: "dev-stack",
    name: "Dev Stack Builder",
    category: "React · TypeScript",
    filterTag: "React",
    image: "/images/project-devstack.svg",
    description:
      "An interactive technology explorer that helps developers browse tools, stack dependencies, and plan modern web architectures.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide React"],
    live: "https://github.com/dewanmahir/dev-stack",
    github: "https://github.com/dewanmahir/dev-stack",
    challenges:
      "Managing selected technologies without state duplications, building reusable cards, and keeping the layout fluid on small screens.",
    improvements:
      "Add saved stacks, user authentication, searchable filters, and a shareable stack URL.",
  },
  {
    slug: "developer-conference",
    name: "Web Developer Conference",
    category: "HTML · CSS · JavaScript",
    filterTag: "Frontend",
    image: "/images/project-conference.svg",
    description:
      "A responsive event landing page for a developer conference with schedule, tracks, sponsors, interactive modals, and ticket pricing.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    live: "https://github.com/dewanmahir/web-developer-conference",
    github: "https://github.com/dewanmahir/web-developer-conference",
    challenges:
      "Recreating a consistent visual hierarchy, responsive navigation, card layouts, and a dark hero with accessible contrast.",
    improvements:
      "Add a working ticket booking form, schedule filtering, speaker profiles, and accessible mobile navigation.",
  },
  {
    slug: "personal-portfolio",
    name: "Personal Developer Portfolio",
    category: "React · CSS",
    filterTag: "React",
    image: "/images/project-portfolio.svg",
    description:
      "A fast, modern personal portfolio showcasing web engineering projects, skills, certifications, and direct contact avenues.",
    stack: ["React", "React Router", "CSS3", "Lucide React", "Vite"],
    live: "https://github.com/dewanmahir",
    github: "https://github.com/dewanmahir/portfolio",
    challenges:
      "Structuring each section into modular components, implementing seamless theme switching, and ensuring SPA routing.",
    improvements:
      "Add automated blog integration, real project screenshots, and interactive 3D visual elements.",
  },
];

export const education = [
  {
    qualification: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Shamsur Rahman College, Goshairhat, Shariatpur",
    period: "2022s",
    details:
      "Completed higher secondary education with a Humanities background.",
  },
];
