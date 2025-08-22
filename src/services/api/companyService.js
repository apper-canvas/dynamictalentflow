const mockCompanies = [
  // Technology Companies
  {
    Id: 1,
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    industry: "Technology",
    employeeCount: 1250,
    relationshipStatus: "Active",
    openPositions: 8,
    successfulPlacements: 15,
    lastInteraction: "2024-01-15",
    primaryContact: {
      name: "Sarah Johnson",
      title: "Head of Talent Acquisition",
      email: "sarah.johnson@techcorp.com",
      phone: "(555) 123-4567"
    },
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    description: "Leading technology company specializing in cloud infrastructure and AI solutions.",
    hiringPreferences: ["React", "Node.js", "Python", "AWS", "Machine Learning"],
    relationshipHealth: "excellent"
  },
  {
    Id: 2,
    name: "CloudTech Solutions",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=faces",
    industry: "Cloud Computing",
    employeeCount: 850,
    relationshipStatus: "Active",
    openPositions: 5,
    successfulPlacements: 22,
    lastInteraction: "2024-01-18",
    primaryContact: {
      name: "Michael Chen",
      title: "VP Engineering",
      email: "michael.chen@cloudtech.com",
      phone: "(555) 234-5678"
    },
    location: "Seattle, WA",
    website: "https://cloudtech-solutions.com",
    description: "Enterprise cloud solutions provider with global reach.",
    hiringPreferences: ["Kubernetes", "Docker", "Go", "Terraform", "DevOps"],
    relationshipHealth: "excellent"
  },
  {
    Id: 3,
    name: "StartupXYZ",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=faces",
    industry: "Fintech",
    employeeCount: 125,
    relationshipStatus: "Opportunity",
    openPositions: 3,
    successfulPlacements: 4,
    lastInteraction: "2024-01-20",
    primaryContact: {
      name: "Emma Davis",
      title: "Co-founder & CTO",
      email: "emma@startupxyz.com",
      phone: "(555) 345-6789"
    },
    location: "Austin, TX",
    website: "https://startupxyz.com",
    description: "Fast-growing fintech startup revolutionizing digital payments.",
    hiringPreferences: ["React Native", "TypeScript", "Blockchain", "PostgreSQL"],
    relationshipHealth: "good"
  },
  {
    Id: 4,
    name: "InfraTech",
    logo: "https://images.unsplash.com/photo-1553028826-f4804151e0f1?w=80&h=80&fit=crop&crop=faces",
    industry: "Infrastructure",
    employeeCount: 2100,
    relationshipStatus: "Active",
    openPositions: 12,
    successfulPlacements: 31,
    lastInteraction: "2024-01-22",
    primaryContact: {
      name: "David Park",
      title: "Director of Hiring",
      email: "david.park@infratech.com",
      phone: "(555) 456-7890"
    },
    location: "Remote",
    website: "https://infratech.io",
    description: "Global infrastructure technology company serving enterprise clients.",
    hiringPreferences: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Linux"],
    relationshipHealth: "excellent"
  },
  {
    Id: 5,
    name: "AppVentures",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=faces",
    industry: "Mobile Apps",
    employeeCount: 320,
    relationshipStatus: "Needs Attention",
    openPositions: 2,
    successfulPlacements: 8,
    lastInteraction: "2024-01-05",
    primaryContact: {
      name: "Jessica Liu",
      title: "Head of People",
      email: "jessica@appventures.co",
      phone: "(555) 567-8901"
    },
    location: "Los Angeles, CA",
    website: "https://appventures.co",
    description: "Mobile app development company creating consumer and enterprise solutions.",
    hiringPreferences: ["React Native", "iOS", "Android", "Redux", "GraphQL"],
    relationshipHealth: "attention"
  },

  // Finance Companies
  {
    Id: 6,
    name: "Goldman Sachs",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop&crop=faces",
    industry: "Investment Banking",
    employeeCount: 45000,
    relationshipStatus: "Active",
    openPositions: 15,
    successfulPlacements: 28,
    lastInteraction: "2024-01-16",
    primaryContact: {
      name: "Robert Taylor",
      title: "Managing Director - Talent",
      email: "robert.taylor@gs.com",
      phone: "(555) 678-9012"
    },
    location: "New York, NY",
    website: "https://goldmansachs.com",
    description: "Leading global investment banking and financial services company.",
    hiringPreferences: ["Python", "R", "C++", "Financial Modeling", "Risk Management"],
    relationshipHealth: "excellent"
  },
  {
    Id: 7,
    name: "JP Morgan Chase",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop&crop=faces",
    industry: "Banking",
    employeeCount: 275000,
    relationshipStatus: "Active",
    openPositions: 25,
    successfulPlacements: 42,
    lastInteraction: "2024-01-19",
    primaryContact: {
      name: "Amanda Foster",
      title: "Executive Director - HR",
      email: "amanda.foster@jpmorgan.com",
      phone: "(555) 789-0123"
    },
    location: "New York, NY",
    website: "https://jpmorgan.com",
    description: "Major American investment bank and financial services company.",
    hiringPreferences: ["Java", "Python", "Financial Analysis", "Excel", "Bloomberg"],
    relationshipHealth: "excellent"
  },
  {
    Id: 8,
    name: "FinTech Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    industry: "Financial Technology",
    employeeCount: 890,
    relationshipStatus: "Opportunity",
    openPositions: 6,
    successfulPlacements: 12,
    lastInteraction: "2024-01-11",
    primaryContact: {
      name: "Carlos Martinez",
      title: "VP Technology",
      email: "carlos@fintechsol.com",
      phone: "(555) 890-1234"
    },
    location: "San Francisco, CA",
    website: "https://fintechsolutions.com",
    description: "Innovative fintech company developing next-generation trading platforms.",
    hiringPreferences: ["Java", "C++", "Low Latency", "Algorithms", "Financial Markets"],
    relationshipHealth: "good"
  },

  // Healthcare Companies
  {
    Id: 9,
    name: "MedTech Analytics",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=80&h=80&fit=crop&crop=faces",
    industry: "Healthcare Technology",
    employeeCount: 540,
    relationshipStatus: "Active",
    openPositions: 4,
    successfulPlacements: 18,
    lastInteraction: "2024-01-17",
    primaryContact: {
      name: "Dr. Maria Rodriguez",
      title: "Chief Medical Officer",
      email: "maria.rodriguez@medtech.com",
      phone: "(555) 901-2345"
    },
    location: "Boston, MA",
    website: "https://medtech-analytics.com",
    description: "Healthcare analytics company improving patient outcomes through data science.",
    hiringPreferences: ["Python", "R", "Healthcare", "Statistics", "HIPAA"],
    relationshipHealth: "excellent"
  },
  {
    Id: 10,
    name: "PharmaCorp Research",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=faces",
    industry: "Pharmaceuticals",
    employeeCount: 12500,
    relationshipStatus: "Active",
    openPositions: 8,
    successfulPlacements: 35,
    lastInteraction: "2024-01-21",
    primaryContact: {
      name: "Jennifer Lee",
      title: "Director of Clinical Research",
      email: "jennifer.lee@pharmacorp.com",
      phone: "(555) 012-3456"
    },
    location: "San Diego, CA",
    website: "https://pharmacorp-research.com",
    description: "Leading pharmaceutical research company developing life-saving medications.",
    hiringPreferences: ["Clinical Research", "GCP", "Regulatory", "Medical Writing", "SAS"],
    relationshipHealth: "excellent"
  },
  {
    Id: 11,
    name: "Digital Health Systems",
    logo: "https://images.unsplash.com/photo-1582719471384-894fbb16e74d?w=80&h=80&fit=crop&crop=faces",
    industry: "Health Tech",
    employeeCount: 750,
    relationshipStatus: "Needs Attention",
    openPositions: 3,
    successfulPlacements: 9,
    lastInteraction: "2024-01-08",
    primaryContact: {
      name: "Thomas Anderson",
      title: "VP of Engineering",
      email: "thomas@digitalhealthsys.com",
      phone: "(555) 123-4567"
    },
    location: "Atlanta, GA",
    website: "https://digital-health-systems.com",
    description: "Digital health platform connecting patients with healthcare providers.",
    hiringPreferences: ["Health Informatics", "HL7", "EPIC", "Healthcare IT", "FHIR"],
    relationshipHealth: "attention"
  },

  // Marketing & Creative Companies
  {
    Id: 12,
    name: "Growth Marketing Co",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=faces",
    industry: "Digital Marketing",
    employeeCount: 280,
    relationshipStatus: "Active",
    openPositions: 7,
    successfulPlacements: 16,
    lastInteraction: "2024-01-22",
    primaryContact: {
      name: "Hannah Wilson",
      title: "Head of Talent",
      email: "hannah@growthmarketing.co",
      phone: "(555) 234-5678"
    },
    location: "Los Angeles, CA",
    website: "https://growth-marketing.co",
    description: "Full-service digital marketing agency specializing in growth hacking.",
    hiringPreferences: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Growth Marketing"],
    relationshipHealth: "excellent"
  },
  {
    Id: 13,
    name: "Content Creators Hub",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=faces",
    industry: "Content Marketing",
    employeeCount: 150,
    relationshipStatus: "Opportunity",
    openPositions: 4,
    successfulPlacements: 7,
    lastInteraction: "2024-01-23",
    primaryContact: {
      name: "Nicole Brown",
      title: "Creative Director",
      email: "nicole@contenthub.com",
      phone: "(555) 345-6789"
    },
    location: "Chicago, IL",
    website: "https://content-creators-hub.com",
    description: "Creative agency producing engaging content for global brands.",
    hiringPreferences: ["Content Creation", "Copywriting", "SEO", "Social Media", "Video Production"],
    relationshipHealth: "good"
  },
  {
    Id: 14,
    name: "Premier Brands",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
    industry: "Brand Management",
    employeeCount: 650,
    relationshipStatus: "Active",
    openPositions: 5,
    successfulPlacements: 21,
    lastInteraction: "2024-01-12",
    primaryContact: {
      name: "Ryan O'Connor",
      title: "VP Brand Strategy",
      email: "ryan@premierbrands.com",
      phone: "(555) 456-7890"
    },
    location: "Miami, FL",
    website: "https://premier-brands.com",
    description: "Brand management company working with Fortune 500 clients.",
    hiringPreferences: ["Brand Management", "Marketing Strategy", "Consumer Research", "Creative Direction"],
    relationshipHealth: "excellent"
  },
  {
    Id: 15,
    name: "Social Buzz Agency",
    logo: "https://images.unsplash.com/photo-1553028826-f4804151e0f1?w=80&h=80&fit=crop&crop=faces",
    industry: "Social Media",
    employeeCount: 95,
    relationshipStatus: "Opportunity",
    openPositions: 6,
    successfulPlacements: 11,
    lastInteraction: "2024-01-24",
    primaryContact: {
      name: "Maya Patel",
      title: "Account Director",
      email: "maya@socialbuzz.agency",
      phone: "(555) 567-8901"
    },
    location: "Remote",
    website: "https://social-buzz.agency",
    description: "Social media agency creating viral campaigns for emerging brands.",
    hiringPreferences: ["Social Media", "Content Creation", "Community Management", "Influencer Marketing"],
    relationshipHealth: "good"
  }
];

let currentId = 15;

export const getCompanies = () => {
  return [...mockCompanies];
};

export const getCompanyById = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Company ID must be a valid integer');
  }
  return mockCompanies.find(company => company.Id === numId);
};

export const createCompany = (companyData) => {
  const newCompany = {
    ...companyData,
    Id: ++currentId,
    successfulPlacements: 0,
    lastInteraction: new Date().toISOString().split('T')[0],
    relationshipHealth: "good"
  };
  mockCompanies.push(newCompany);
  return newCompany;
};

export const updateCompany = (id, companyData) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Company ID must be a valid integer');
  }
  
  const index = mockCompanies.findIndex(company => company.Id === numId);
  if (index === -1) {
    throw new Error(`Company with ID ${numId} not found`);
  }
  
  mockCompanies[index] = { 
    ...mockCompanies[index], 
    ...companyData,
    lastInteraction: new Date().toISOString().split('T')[0]
  };
  return mockCompanies[index];
};

export const deleteCompany = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    throw new Error('Company ID must be a valid integer');
  }
  
  const index = mockCompanies.findIndex(company => company.Id === numId);
  if (index === -1) {
    throw new Error(`Company with ID ${numId} not found`);
  }
  
  return mockCompanies.splice(index, 1)[0];
};

export const searchCompanies = (searchTerm, filters = {}) => {
  let filtered = [...mockCompanies];
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(company => 
      company.name.toLowerCase().includes(term) ||
      company.industry.toLowerCase().includes(term) ||
      company.location.toLowerCase().includes(term) ||
      company.primaryContact.name.toLowerCase().includes(term)
    );
  }
  
  if (filters.industry) {
    filtered = filtered.filter(company => company.industry === filters.industry);
  }
  
  if (filters.relationshipStatus) {
    filtered = filtered.filter(company => company.relationshipStatus === filters.relationshipStatus);
  }
  
  if (filters.relationshipHealth) {
    filtered = filtered.filter(company => company.relationshipHealth === filters.relationshipHealth);
  }
  
  return filtered;
};

export const getCompanyByName = (name) => {
  if (!name) return null;
  return mockCompanies.find(company => 
    company.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCompanyJobStats = (companyName) => {
  // This would integrate with job service in a real implementation
  // For now, we'll use the existing mock data in the company objects
  const company = getCompanyByName(companyName);
  if (!company) return { openJobs: 0, totalPlacements: 0, placementRate: 0 };
  
  const placementRate = company.openPositions > 0 
    ? Math.round((company.successfulPlacements / (company.successfulPlacements + company.openPositions)) * 100)
    : company.successfulPlacements > 0 ? 100 : 0;
    
  return {
    openJobs: company.openPositions,
    totalPlacements: company.successfulPlacements,
    placementRate: placementRate
  };
};