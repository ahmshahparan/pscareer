// Exact career pathway data from user's Per Scholas spreadsheet
export const pathwayData = {
  courses: [
    {
      id: "uci_1024_3",
      name: "UCI 1024.3: IT Support",
      code: "UCI 1024.3",
      level: "foundation",
      description: "Foundation course in IT support covering essential hardware and operating systems skills",
      prerequisites: [],
      techPrep: [
        "Computer Hardware Basics",
        "Operating Systems Basics"
      ],
      domain: "Information Technology",
      subdomain: "IT Support",
      outcomes: [
        {
          role: "IT Support Analyst L1",
          level: "Entry",
          salaryRange: "$40,000 - $55,000", // Estimated based on role
          jobOpenings: 1200 // Estimated
        }
      ],
      skills: [
        "Computer Hardware Basics",
        "Operating Systems Basics",
        "Technical Troubleshooting",
        "Customer Service",
        "Problem Solving"
      ],
      certifications: [
        "CompTIA A+",
        "Microsoft Certified: Modern Desktop Administrator",
        "ITIL Foundation"
      ],
      education: {
        subBA: 40,
        bachelors: 55,
        graduate: 5
      }
    },
    {
      id: "uci_3001",
      name: "UCI 3001: Network Technician",
      code: "UCI 3001",
      level: "advanced",
      description: "Advanced networking course building on IT support fundamentals to develop network technician skills",
      prerequisites: ["uci_1024_3"],
      techPrep: [], // Empty as per spreadsheet - builds on previous course
      domain: "Information Technology",
      subdomain: "IT Support",
      outcomes: [
        {
          role: "IT Support Analyst L1",
          level: "Mid",
          salaryRange: "$50,000 - $70,000", // Higher range for Mid level
          jobOpenings: 800, // Estimated
          salaryIncrease: "20-25%"
        }
      ],
      skills: [
        "Advanced Network Configuration",
        "Network Troubleshooting",
        "Network Security",
        "System Administration",
        "Technical Leadership"
      ],
      certifications: [
        "CompTIA Network+",
        "Cisco CCNA",
        "CompTIA Security+"
      ],
      education: {
        subBA: 30,
        bachelors: 60,
        graduate: 10
      }
    }
  ],

  pathways: [
    {
      id: "it_support_pathway",
      name: "IT Support Career Progression",
      description: "Complete pathway from foundation IT support to advanced network technician skills",
      courses: ["uci_1024_3", "uci_3001"],
      progression: [
        {
          courseId: "uci_1024_3",
          role: "IT Support Analyst L1",
          level: "Entry",
          duration: "12-16 weeks"
        },
        {
          courseId: "uci_3001",
          role: "IT Support Analyst L1", 
          level: "Mid",
          duration: "8-12 weeks",
          salaryIncrease: "20-25%"
        }
      ],
      totalDuration: "20-28 weeks",
      careerOutlook: "Strong demand for IT support professionals with networking skills",
      domain: "Information Technology"
    }
  ]
};

export const getCourseById = (id) => {
  return pathwayData.courses.find(course => course.id === id);
};

export const getPathwayById = (id) => {
  return pathwayData.pathways.find(pathway => pathway.id === id);
};

export const getCoursesByLevel = (level) => {
  return pathwayData.courses.filter(course => course.level === level);
};

export const getFoundationCourses = () => {
  return pathwayData.courses.filter(course => course.level === 'foundation');
};

export const getAdvancedCourses = () => {
  return pathwayData.courses.filter(course => course.level === 'advanced');
};

export const getCoursesWithPrerequisites = () => {
  return pathwayData.courses.filter(course => course.prerequisites.length > 0);
};

export const getAllDomains = () => {
  return [...new Set(pathwayData.courses.map(course => course.domain))];
};

export const getPathwaysByCourse = (courseId) => {
  return pathwayData.pathways.filter(pathway => 
    pathway.courses.includes(courseId)
  );
};

export const getCoursePrerequisites = (courseId) => {
  const course = getCourseById(courseId);
  if (!course || !course.prerequisites.length) return [];
  
  return course.prerequisites.map(prereqId => getCourseById(prereqId));
};

export const getNextCourses = (courseId) => {
  return pathwayData.courses.filter(course => 
    course.prerequisites.includes(courseId)
  );
};

