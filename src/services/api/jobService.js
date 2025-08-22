const mockJobs = [
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
    description: "We're looking for a senior frontend developer to join our growing team.",
    requirements: ["React", "TypeScript", "5+ years experience"],
    matches: [
      { Id: 1, name: "Sarah Chen", photo: "https://images.unsplash.com/photo-1494790108755-2616b60b5e02?w=40&h=40&fit=crop&crop=faces" },
      { Id: 2, name: "Mike Johnson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
      { Id: 3, name: "Emily Davis", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" }
    ]
  },
  {
    Id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=faces",
    department: "Product",
    location: "New York, NY",
    salaryRange: "$110k - $140k",
    type: "Full-time",
    status: "Open",
    postedDate: "2024-01-12",
    applicantCount: 18,
    matchCount: 2,
    description: "Product manager role for our growing SaaS platform.",
    requirements: ["Product Management", "Analytics", "3+ years experience"],
    matches: [
      { Id: 4, name: "Alex Rodriguez", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
      { Id: 5, name: "Lisa Wong", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces" }
    ]
  },
  {
    Id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=faces",
    department: "Design",
    location: "Remote",
    salaryRange: "$85k - $110k",
    type: "Full-time",
    status: "Filled",
    postedDate: "2024-01-08",
    applicantCount: 31,
    matchCount: 0,
    description: "UX designer for mobile and web applications.",
    requirements: ["Figma", "User Research", "Portfolio required"],
    matches: []
  },
  {
    Id: 4,
    title: "Data Scientist",
    company: "DataCorp",
    companyLogo: "https://images.unsplash.com/photo-1553028826-f4804151e0f1?w=80&h=80&fit=crop&crop=faces",
    department: "Analytics",
    location: "Austin, TX",
    salaryRange: "$130k - $160k",
    type: "Full-time",
    status: "On Hold",
    postedDate: "2024-01-05",
    applicantCount: 12,
    matchCount: 1,
    description: "Data scientist role focusing on machine learning and analytics.",
    requirements: ["Python", "Machine Learning", "PhD preferred"],
    matches: [
      { Id: 6, name: "David Park", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" }
    ]
  }
];

let currentId = 5;

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