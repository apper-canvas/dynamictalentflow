const mockJobs = [
  // Technology Industry
  {
    Id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    department: "Engineering",
    location: "San Francisco, CA",
    salaryRange: "$120k - $150k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-15",
    applicantCount: 23,
    matchCount: 3,
    description: "We're looking for a senior frontend developer to join our growing team and build cutting-edge web applications.",
    requirements: ["React", "TypeScript", "5+ years experience", "Redux", "CSS3"],
    matches: [
      { Id: 1, name: "Sarah Chen", photo: "https://images.unsplash.com/photo-1494790108755-2616b60b5e02?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 95, skills: ["React", "TypeScript", "Redux"] },
      { Id: 2, name: "Mike Johnson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["React", "JavaScript", "CSS3"] },
      { Id: 3, name: "Emily Davis", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 92, skills: ["TypeScript", "React", "Node.js"] }
    ]
  },
  {
    Id: 2,
    title: "Backend Engineer",
    company: "CloudTech Solutions",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=faces",
    department: "Engineering",
    location: "Seattle, WA",
    salaryRange: "$130k - $160k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-18",
    applicantCount: 19,
    matchCount: 2,
    description: "Backend engineer position focused on scalable microservices architecture and cloud infrastructure.",
    requirements: ["Node.js", "Python", "AWS", "Docker", "Microservices"],
    matches: [
      { Id: 4, name: "Alex Rodriguez", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 94, skills: ["Node.js", "AWS", "Docker"] },
      { Id: 5, name: "Lisa Wong", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 87, skills: ["Python", "AWS", "Kubernetes"] }
    ]
  },
  {
    Id: 3,
    title: "DevOps Engineer",
    company: "InfraTech",
    companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=faces",
    department: "Operations",
    location: "Remote",
    salaryRange: "$115k - $145k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-20",
    applicantCount: 15,
    matchCount: 1,
    description: "DevOps engineer to manage CI/CD pipelines and cloud infrastructure automation.",
    requirements: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Linux"],
    matches: [
      { Id: 6, name: "David Park", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 91, skills: ["Kubernetes", "Terraform", "AWS"] }
    ]
  },
  {
    Id: 4,
    title: "Mobile App Developer",
    company: "AppVentures",
    companyLogo: "https://images.unsplash.com/photo-1553028826-f4804151e0f1?w=80&h=80&fit=crop&crop=faces",
    department: "Mobile",
    location: "Austin, TX",
    salaryRange: "$100k - $130k",
    type: "Full-time",
    status: "Open",
    applicantCount: 27,
    matchCount: 4,
    description: "React Native developer to build cross-platform mobile applications for iOS and Android.",
    requirements: ["React Native", "JavaScript", "iOS", "Android", "Redux"],
    matches: [
      { Id: 7, name: "Jessica Liu", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 93, skills: ["React Native", "iOS", "Android"] },
      { Id: 8, name: "Carlos Martinez", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 89, skills: ["React Native", "Redux", "JavaScript"] },
      { Id: 9, name: "Anna Thompson", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 85, skills: ["JavaScript", "React", "Mobile"] },
      { Id: 10, name: "Ryan Kim", photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["React Native", "TypeScript", "iOS"] }
    ]
  },
  {
    Id: 5,
    title: "Data Scientist",
    company: "AI Innovations",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=faces",
    department: "Data Science",
    location: "Boston, MA",
    salaryRange: "$125k - $155k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-14",
    applicantCount: 21,
    matchCount: 2,
    description: "Data scientist role focusing on machine learning models and predictive analytics.",
    requirements: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
    matches: [
      { Id: 11, name: "Dr. Sophie Miller", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 97, skills: ["Python", "TensorFlow", "Statistics"] },
      { Id: 12, name: "James Wilson", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 90, skills: ["Machine Learning", "Python", "SQL"] }
    ]
  },

  // Finance Industry
  {
    Id: 6,
    title: "Quantitative Analyst",
    company: "Goldman Sachs",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop&crop=faces",
    department: "Quantitative Research",
    location: "New York, NY",
    salaryRange: "$150k - $200k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-16",
    applicantCount: 34,
    matchCount: 3,
    description: "Quantitative analyst position developing mathematical models for trading strategies and risk management.",
    requirements: ["Python", "R", "Statistics", "Finance", "PhD preferred"],
    matches: [
      { Id: 13, name: "Dr. Michael Chang", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 96, skills: ["Python", "Statistics", "Finance"] },
      { Id: 14, name: "Rachel Green", photo: "https://images.unsplash.com/photo-1494790108755-2616b60b5e02?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 91, skills: ["R", "Statistics", "Economics"] },
      { Id: 15, name: "Kevin Zhang", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["Python", "Finance", "Mathematics"] }
    ]
  },
  {
    Id: 7,
    title: "Investment Banking Analyst",
    company: "JP Morgan Chase",
    companyLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop&crop=faces",
    department: "Investment Banking",
    location: "New York, NY",
    salaryRange: "$100k - $130k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-19",
    applicantCount: 45,
    matchCount: 2,
    description: "Investment banking analyst role supporting M&A transactions and financial modeling.",
    requirements: ["Financial Modeling", "Excel", "PowerPoint", "Finance Degree", "CFA preferred"],
    matches: [
      { Id: 16, name: "Andrew Foster", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 92, skills: ["Financial Modeling", "Excel", "Finance"] },
      { Id: 17, name: "Emma Watson", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 87, skills: ["Excel", "PowerPoint", "Analysis"] }
    ]
  },
  {
    Id: 8,
    title: "Risk Management Specialist",
    company: "Bank of America",
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&h=80&fit=crop&crop=faces",
    department: "Risk Management",
    location: "Charlotte, NC",
    salaryRange: "$85k - $115k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-13",
    applicantCount: 28,
    matchCount: 1,
    description: "Risk management specialist to assess and monitor financial risks across trading portfolios.",
    requirements: ["Risk Management", "Statistics", "VaR", "Monte Carlo", "Excel"],
    matches: [
      { Id: 18, name: "Thomas Anderson", photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 89, skills: ["Risk Management", "Statistics", "Excel"] }
    ]
  },
  {
    Id: 9,
    title: "Financial Software Developer",
    company: "FinTech Solutions",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    department: "Technology",
    location: "San Francisco, CA",
    salaryRange: "$130k - $165k",
    type: "Full-time",
    status: "Filled",
    postedDate: "2024-01-11",
    applicantCount: 22,
    matchCount: 0,
    description: "Software developer specializing in financial applications and trading systems.",
    requirements: ["Java", "C++", "Financial Markets", "Low Latency", "Algorithms"],
    matches: []
  },

  // Healthcare Industry
  {
    Id: 10,
    title: "Healthcare Data Analyst",
    company: "MedTech Analytics",
    companyLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=80&h=80&fit=crop&crop=faces",
    department: "Data Analytics",
    location: "Boston, MA",
    salaryRange: "$75k - $95k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-17",
    applicantCount: 31,
    matchCount: 3,
    description: "Healthcare data analyst to analyze patient outcomes and healthcare trends using statistical methods.",
    requirements: ["SQL", "R", "Healthcare", "Statistics", "HIPAA"],
    matches: [
      { Id: 19, name: "Dr. Maria Rodriguez", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 94, skills: ["Healthcare", "Statistics", "R"] },
      { Id: 20, name: "Jennifer Lee", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["SQL", "Healthcare", "Analysis"] },
      { Id: 21, name: "Robert Taylor", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 85, skills: ["R", "Statistics", "Data Analysis"] }
    ]
  },
  {
    Id: 11,
    title: "Clinical Research Coordinator",
    company: "PharmaCorp Research",
    companyLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=faces",
    department: "Clinical Research",
    location: "San Diego, CA",
    salaryRange: "$60k - $80k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-21",
    applicantCount: 26,
    matchCount: 2,
    description: "Clinical research coordinator to manage clinical trials and ensure regulatory compliance.",
    requirements: ["Clinical Research", "GCP", "Regulatory", "Medical Writing", "Excel"],
    matches: [
      { Id: 22, name: "Sarah Mitchell", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 91, skills: ["Clinical Research", "GCP", "Regulatory"] },
      { Id: 23, name: "John Davis", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 86, skills: ["Medical Writing", "Excel", "Research"] }
    ]
  },
  {
    Id: 12,
    title: "Health Informatics Specialist",
    company: "Digital Health Systems",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=faces",
    department: "Health Informatics",
    location: "Atlanta, GA",
    salaryRange: "$80k - $105k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-10",
    applicantCount: 18,
    matchCount: 1,
    description: "Health informatics specialist to design and implement healthcare information systems.",
    requirements: ["Health Informatics", "HL7", "EPIC", "Healthcare IT", "Project Management"],
    matches: [
      { Id: 24, name: "Lisa Chen", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 90, skills: ["Health Informatics", "EPIC", "Healthcare IT"] }
    ]
  },
  {
    Id: 13,
    title: "Biostatistician",
    company: "BioMetrics Inc",
    companyLogo: "https://images.unsplash.com/photo-1582719471384-894fbb16e74d?w=80&h=80&fit=crop&crop=faces",
    department: "Biostatistics",
    location: "Research Triangle, NC",
    salaryRange: "$90k - $120k",
    type: "Full-time",
    status: "On Hold",
    postedDate: "2024-01-09",
    applicantCount: 14,
    matchCount: 1,
    description: "Biostatistician to design and analyze clinical trials and observational studies.",
    requirements: ["Biostatistics", "SAS", "R", "Clinical Trials", "PhD preferred"],
    matches: [
      { Id: 25, name: "Dr. Patricia Wong", photo: "https://images.unsplash.com/photo-1494790108755-2616b60b5e02?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 95, skills: ["Biostatistics", "SAS", "Clinical Trials"] }
    ]
  },

  // Marketing Industry
  {
    Id: 14,
    title: "Digital Marketing Manager",
    company: "Growth Marketing Co",
    companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=faces",
    department: "Marketing",
    location: "Los Angeles, CA",
    salaryRange: "$70k - $95k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-22",
    applicantCount: 42,
    matchCount: 4,
    description: "Digital marketing manager to lead online marketing campaigns and drive customer acquisition.",
    requirements: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Marketing Strategy"],
    matches: [
      { Id: 26, name: "Amanda Johnson", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 93, skills: ["Google Ads", "SEO", "Analytics"] },
      { Id: 27, name: "Mark Thompson", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 89, skills: ["Facebook Ads", "Marketing Strategy", "Analytics"] },
      { Id: 28, name: "Nicole Brown", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 87, skills: ["SEO", "Content Marketing", "Social Media"] },
      { Id: 29, name: "Daniel Garcia", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 85, skills: ["Google Ads", "PPC", "Marketing"] }
    ]
  },
  {
    Id: 15,
    title: "Content Marketing Specialist",
    company: "Content Creators Hub",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=faces",
    department: "Content",
    location: "Chicago, IL",
    salaryRange: "$55k - $75k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-23",
    applicantCount: 38,
    matchCount: 3,
    description: "Content marketing specialist to create engaging content and manage editorial calendars.",
    requirements: ["Content Creation", "Copywriting", "SEO", "Social Media", "WordPress"],
    matches: [
      { Id: 30, name: "Hannah Wilson", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 92, skills: ["Content Creation", "Copywriting", "SEO"] },
      { Id: 31, name: "Chris Martinez", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["WordPress", "Social Media", "Content"] },
      { Id: 32, name: "Sophia Lee", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 86, skills: ["Copywriting", "SEO", "Marketing"] }
    ]
  },
  {
    Id: 16,
    title: "Brand Manager",
    company: "Premier Brands",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    department: "Brand Management",
    location: "Miami, FL",
    salaryRange: "$80k - $105k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-12",
    applicantCount: 29,
    matchCount: 2,
    description: "Brand manager to develop and execute brand strategies across multiple product lines.",
    requirements: ["Brand Management", "Marketing Strategy", "Consumer Research", "Creative Direction", "MBA preferred"],
    matches: [
      { Id: 33, name: "Victoria Adams", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 91, skills: ["Brand Management", "Marketing Strategy", "Consumer Research"] },
      { Id: 34, name: "Ryan O'Connor", photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 87, skills: ["Creative Direction", "Brand Strategy", "Marketing"] }
    ]
  },
  {
    Id: 17,
    title: "Social Media Manager",
    company: "Social Buzz Agency",
    companyLogo: "https://images.unsplash.com/photo-1553028826-f4804151e0f1?w=80&h=80&fit=crop&crop=faces",
    department: "Social Media",
    location: "Remote",
    salaryRange: "$50k - $70k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-24",
    applicantCount: 51,
    matchCount: 5,
    description: "Social media manager to create and execute social media strategies across multiple platforms.",
    requirements: ["Social Media", "Content Creation", "Analytics", "Community Management", "Graphic Design"],
    matches: [
      { Id: 35, name: "Zoe Parker", photo: "https://images.unsplash.com/photo-1494790108755-2616b60b5e02?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 94, skills: ["Social Media", "Content Creation", "Analytics"] },
      { Id: 36, name: "Tyler Johnson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 90, skills: ["Community Management", "Social Media", "Engagement"] },
      { Id: 37, name: "Maya Patel", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 88, skills: ["Graphic Design", "Content Creation", "Instagram"] },
      { Id: 38, name: "Jake Williams", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 85, skills: ["Analytics", "Social Media", "ROI"] },
      { Id: 39, name: "Elena Rodriguez", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 86, skills: ["Community Management", "Content Strategy", "Social"] }
    ]
  },
  {
    Id: 18,
    title: "Marketing Analytics Manager",
    company: "Data-Driven Marketing",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=faces",
    department: "Marketing Analytics",
    location: "Denver, CO",
    salaryRange: "$85k - $110k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-15",
    applicantCount: 24,
    matchCount: 2,
    description: "Marketing analytics manager to measure campaign performance and provide data-driven insights.",
    requirements: ["Google Analytics", "SQL", "Tableau", "Marketing Attribution", "Statistical Analysis"],
    matches: [
      { Id: 40, name: "Alex Chen", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 93, skills: ["Google Analytics", "SQL", "Tableau"] },
      { Id: 41, name: "Samantha Davis", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=faces", compatibilityScore: 89, skills: ["Statistical Analysis", "Marketing Attribution", "Data Visualization"] }
    ]
  }
];

let currentId = 18;

export const getJobs = () => {
  return [...mockJobs];
};

export const getJobById = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Job ID must be a valid integer');
  }
  return mockJobs.find(job => job.Id === numId);
};

export const createJob = (jobData) => {
  const newJob = {
    ...jobData,
    Id: ++currentId,
    postedDate: new Date().toISOString().split('T')[0],
    applicantCount: 0,
    matchCount: 0,
    matches: []
  };
  mockJobs.push(newJob);
  return newJob;
};

export const updateJob = (id, jobData) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Job ID must be a valid integer');
  }
  
  const index = mockJobs.findIndex(job => job.Id === numId);
  if (index === -1) {
    throw new Error(`Job with ID ${numId} not found`);
  }
  
  mockJobs[index] = { ...mockJobs[index], ...jobData };
  return mockJobs[index];
};

export const deleteJob = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Job ID must be a valid integer');
  }
  
  const index = mockJobs.findIndex(job => job.Id === numId);
  if (index === -1) {
    throw new Error(`Job with ID ${numId} not found`);
  }
  
  return mockJobs.splice(index, 1)[0];
};