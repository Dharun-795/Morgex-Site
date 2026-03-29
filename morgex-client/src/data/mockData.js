export const allCourses = [
  {
    id: 'c1',
    title: 'Full Stack Web Development',
    description: 'Master HTML, CSS, JavaScript, React, and Node.js to build complete web applications from scratch.',
    thumbnail: '/courses/web_dev.png',
    price: 3499,
    rating: 4.8,
    students: 1250,
    curriculum: ['HTML/CSS Basics', 'Advanced JavaScript', 'React Framework', 'Backend with Node & Express', 'MongoDB Database']
  },
  {
    id: 'c2',
    title: 'Cloud Computing Architecture',
    description: 'Learn how to architect, deploy, and scale robust applications using modern cloud infrastructure.',
    thumbnail: '/courses/cloud.png',
    price: 4999,
    rating: 4.7,
    students: 850,
    curriculum: ['Cloud Fundamentals', 'Virtualization', 'Serverless Architecture', 'Containers & Kubernetes', 'Cloud Security']
  },
  {
    id: 'c3',
    title: 'Cybersecurity Fundamentals',
    description: 'Defend networks and systems from malicious attacks. Learn cryptography, risk management, and network security.',
    thumbnail: '/courses/cyber.png',
    price: 4500,
    rating: 4.9,
    students: 1100,
    curriculum: ['Networking Basics', 'Cryptography', 'Threats & Vulnerabilities', 'Identity & Access Management', 'Security Operations']
  },
  {
    id: 'c4',
    title: 'Data Science & Analytics',
    description: 'Extract insights from data using Python, pandas, and statistical modeling techniques.',
    thumbnail: '/courses/data.png',
    price: 5999,
    rating: 4.8,
    students: 950,
    curriculum: ['Python for Data', 'Data Visualization', 'Statistical Analysis', 'Intro to Machine Learning', 'Big Data Concepts']
  },
  {
    id: 'c5',
    title: 'React Framework Masterclass',
    description: 'Deep dive into React ecosystem including hooks, context API, Redux toolkit, and Next.js integration.',
    thumbnail: '/courses/web_dev.png',
    price: 2999,
    rating: 4.9,
    students: 1540,
    curriculum: ['React Foundations', 'Component Lifecycle', 'Advanced Hooks', 'State Management', 'React Router']
  },
  {
    id: 'c6',
    title: 'AWS Solutions Architect',
    description: 'Prepare for the AWS Certified Solutions Architect exam with comprehensive labs and practical architecture scenarios.',
    thumbnail: '/courses/cloud.png',
    price: 5500,
    rating: 4.8,
    students: 700,
    curriculum: ['EC2 & VPC', 'S3 Storage Solutions', 'Databases on AWS', 'High Availability', 'Security & Cost Management']
  },
  {
    id: 'c7',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Think like a hacker to secure systems. Learn Kali Linux, Metasploit, Wireshark, and essential pentesting skills.',
    thumbnail: '/courses/cyber.png',
    price: 6500,
    rating: 4.9,
    students: 1800,
    curriculum: ['Linux Basics', 'Reconnaissance', 'Network Scanning', 'Exploitation', 'Post-Exploitation']
  },
  {
    id: 'c8',
    title: 'Machine Learning with Python',
    description: 'Build predictive models using Scikit-Learn. Covering regression, classification, clustering and more.',
    thumbnail: '/courses/data.png',
    price: 6499,
    rating: 4.7,
    students: 890,
    curriculum: ['Data Preprocessing', 'Regression Models', 'Classification Algorithms', 'Clustering Techniques', 'Model Evaluation']
  },
  {
    id: 'c9',
    title: 'Advanced Node.js Scaling',
    description: 'Design highly scalable microservices architecture using Node.js, Docker, Redis, and event-driven patterns.',
    thumbnail: '/courses/web_dev.png',
    price: 3999,
    rating: 4.8,
    students: 650,
    curriculum: ['Microservices Pattern', 'Dockerizing Node', 'Redis Caching', 'Message Brokers (RabbitMQ)', 'Performance Tuning']
  },
  {
    id: 'c10',
    title: 'Azure Cloud Fundamentals',
    description: 'Get started with Microsoft Azure building modern enterprise solutions natively in the cloud.',
    thumbnail: '/courses/cloud.png',
    price: 4999,
    rating: 4.6,
    students: 420,
    curriculum: ['Azure Active Directory', 'Azure Compute Instances', 'Storage Accounts', 'Networking', 'Azure Governance']
  },
  {
    id: 'c11',
    title: 'CompTIA Security+ Certification prep',
    description: 'A complete guided roadmap to passing the renowned CompTIA Security+ certification exam.',
    thumbnail: '/courses/cyber.png',
    price: 4200,
    rating: 4.8,
    students: 3100,
    curriculum: ['Threats & Attacks', 'Architecture & Design', 'Implementation', 'Operations & Incident Response', 'Governance & Risk']
  },
  {
    id: 'c12',
    title: 'Deep Learning with PyTorch',
    description: 'Harness the power of neural networks for Computer Vision and Natural Language Processing using PyTorch.',
    thumbnail: '/courses/data.png',
    price: 7999,
    rating: 4.9,
    students: 1200,
    curriculum: ['Tensors & Autograd', 'Neural Network Foundations', 'Convolutional Networks (CNN)', 'Recurrent Networks (RNN)', 'Generative AI Concepts']
  }
];

export const userEnrollments = {
  'test@user.com': ['c1', 'c2']
};
