import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Pre-populated portfolio projects
const INITIAL_PROJECTS = [
  {
    id: 'project-1',
    title: 'VisionGuard AI',
    category: 'Computer Vision',
    description: 'Advanced computer vision system for real-time security monitoring and threat detection using state-of-the-art deep learning models.',
    image: null,
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'Docker'],
    year: 2024
  },
  {
    id: 'project-2',
    title: 'AutoFlow N8N System',
    category: 'Automation',
    description: 'Enterprise workflow automation platform integrating multiple services and APIs for seamless business process optimization.',
    image: null,
    techStack: ['N8N', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    year: 2024
  },
  {
    id: 'project-3',
    title: 'Velox Core Platform',
    category: 'Web App',
    description: 'Full-stack web application with advanced analytics, real-time collaboration, and intelligent data visualization.',
    image: null,
    techStack: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'WebSocket'],
    year: 2024
  }
];

// Pre-populated testimonials
const INITIAL_TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'CTO, TechVision Inc',
    avatar: null,
    content: 'Velox Dynamics transformed our AI infrastructure. Their computer vision solution exceeded all expectations and delivered results 3 months ahead of schedule.',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Marcus Rodriguez',
    role: 'Founder, AutoScale',
    avatar: null,
    content: 'Working with the Velox team was incredible. Their automation expertise saved us 40+ hours weekly and the ROI was evident within the first month.',
    rating: 5
  }
];

// Blog posts
const INITIAL_BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'future-of-ai-automation',
    title: 'The Future of AI-Powered Automation',
    category: 'AI & Machine Learning',
    author: 'Velox Team',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    featured: true,
    excerpt: 'Explore how artificial intelligence is revolutionizing business automation and what it means for the future of work.',
    content: `Artificial Intelligence is no longer a futuristic concept—it's reshaping how businesses operate today. In this article, we explore the cutting-edge developments in AI-powered automation and their real-world applications.

## The Current State of AI Automation

Modern AI systems can now handle complex decision-making processes that were previously exclusive to human expertise. From predictive analytics to autonomous process optimization, the capabilities are expanding rapidly.

## Key Benefits

- **Efficiency**: Reduce operational time by up to 70%
- **Accuracy**: Minimize human error in repetitive tasks
- **Scalability**: Handle increased workload without proportional cost increase
- **Insights**: Uncover patterns humans might miss

## Real-World Applications

Our clients have seen tremendous success implementing AI automation in various domains:
- Healthcare diagnostics
- Financial fraud detection
- Supply chain optimization
- Customer service automation

The future is here, and it's intelligent.`,
    tags: ['AI', 'Automation', 'Machine Learning', 'Business Intelligence']
  },
  {
    id: 'blog-2',
    slug: 'computer-vision-applications',
    title: 'Computer Vision: Real-World Applications',
    category: 'Computer Vision',
    author: 'Velox Team',
    publishDate: '2024-01-10',
    readTime: '7 min read',
    featured: false,
    excerpt: 'Discover how computer vision technology is being applied across industries to solve complex visual recognition challenges.',
    content: `Computer vision has evolved from a research curiosity to a practical tool solving real-world problems across industries.

## What is Computer Vision?

Computer vision enables machines to interpret and understand visual information from the world, mimicking human visual perception through advanced algorithms and neural networks.

## Industry Applications

### Security & Surveillance
Real-time threat detection and monitoring systems that never sleep.

### Manufacturing
Quality control automation detecting defects at superhuman speeds.

### Healthcare
Medical imaging analysis assisting doctors in early disease detection.

### Retail
Customer behavior analysis and automated checkout systems.

## The Technology Stack

Our vision systems leverage:
- Deep learning frameworks (TensorFlow, PyTorch)
- OpenCV for image processing
- Custom-trained neural networks
- Edge computing for real-time processing

Ready to implement computer vision in your business?`,
    tags: ['Computer Vision', 'Deep Learning', 'Technology', 'Innovation']
  },
  {
    id: 'blog-3',
    slug: 'n8n-workflow-automation',
    title: 'Mastering N8N Workflow Automation',
    category: 'Automation',
    author: 'Velox Team',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    featured: false,
    excerpt: 'Learn how to leverage N8N for building powerful, scalable workflow automations without writing complex code.',
    content: `N8N has emerged as a powerful tool for workflow automation, offering flexibility and power without the complexity of traditional development.

## Why N8N?

Unlike traditional automation tools, N8N provides:
- Open-source flexibility
- Self-hosted control
- Extensive integration options
- Visual workflow design

## Common Use Cases

1. **Data Synchronization**: Keep multiple systems in sync automatically
2. **Notification Management**: Create intelligent alert systems
3. **Report Generation**: Automate recurring reports
4. **API Orchestration**: Connect disparate services seamlessly

## Best Practices

- Start with simple workflows and iterate
- Use error handling nodes for robustness
- Implement proper logging for debugging
- Schedule tasks during off-peak hours

## Results

Our clients typically see:
- 40+ hours saved per week
- 99.9% automation reliability
- ROI within the first month

Transform your business processes with intelligent automation.`,
    tags: ['N8N', 'Automation', 'Workflow', 'Productivity']
  }
];

// Case studies
const INITIAL_CASE_STUDIES = [
  {
    id: 'case-1',
    slug: 'visionguard-security-ai',
    title: 'VisionGuard AI: Revolutionizing Security Monitoring',
    client: 'SecureSpace Inc',
    industry: 'Security & Surveillance',
    category: 'Computer Vision',
    featured: true,
    challenge: 'SecureSpace needed a scalable solution to monitor 500+ cameras across multiple facilities in real-time, detecting threats faster than their human security team could respond.',
    solution: 'We developed VisionGuard AI, a custom computer vision system using state-of-the-art object detection and behavioral analysis algorithms. The system processes video feeds in real-time, identifying anomalies and potential threats with 98.5% accuracy.',
    results: [
      { metric: 'Threat Detection Speed', value: '15x faster', improvement: true },
      { metric: 'False Positives', value: '87% reduction', improvement: true },
      { metric: 'Operating Costs', value: '45% decrease', improvement: true },
      { metric: 'Coverage', value: '500+ cameras', improvement: false }
    ],
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'Docker', 'Redis', 'PostgreSQL'],
    testimonial: {
      quote: 'VisionGuard AI transformed our security operations. What used to take our team hours now happens in seconds with incredible accuracy.',
      author: 'James Mitchell',
      role: 'COO, SecureSpace Inc'
    },
    timeline: '4 months',
    team: '3 engineers',
    beforeAfter: {
      before: 'Manual monitoring of 500 cameras, 12-hour response times, high false alarm rates',
      after: 'Automated real-time monitoring, sub-minute threat detection, 98.5% accuracy'
    }
  },
  {
    id: 'case-2',
    slug: 'autoflow-enterprise-automation',
    title: 'AutoFlow: Enterprise Workflow Transformation',
    client: 'TechCorp Global',
    industry: 'Technology',
    category: 'Automation',
    featured: true,
    challenge: 'TechCorp struggled with disconnected systems, manual data entry across 15+ platforms, and inconsistent business processes leading to errors and delays.',
    solution: 'We implemented AutoFlow, a comprehensive N8N-based automation platform integrating all their systems. Custom workflows automated data synchronization, report generation, and cross-platform communication.',
    results: [
      { metric: 'Time Saved', value: '45 hours/week', improvement: true },
      { metric: 'Data Entry Errors', value: '95% reduction', improvement: true },
      { metric: 'Process Completion Time', value: '70% faster', improvement: true },
      { metric: 'ROI Timeline', value: '3 weeks', improvement: false }
    ],
    techStack: ['N8N', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Lambda', 'REST APIs'],
    testimonial: {
      quote: 'AutoFlow eliminated our data silos and freed our team to focus on strategic work instead of manual tasks.',
      author: 'Maria Santos',
      role: 'VP Operations, TechCorp Global'
    },
    timeline: '6 weeks',
    team: '2 engineers',
    beforeAfter: {
      before: 'Manual data entry, disconnected systems, 45+ hours weekly on repetitive tasks',
      after: 'Fully automated workflows, unified data ecosystem, team focused on growth'
    }
  },
  {
    id: 'case-3',
    slug: 'datalytics-ai-platform',
    title: 'DataLytics: Intelligent Analytics Platform',
    client: 'DataLytics Corp',
    industry: 'Data Analytics',
    category: 'Full-Stack Development',
    featured: false,
    challenge: 'DataLytics needed a modern web platform to visualize complex datasets with real-time collaboration features for distributed teams.',
    solution: 'We built a full-stack analytics platform with React frontend, Node.js backend, and WebSocket-powered real-time collaboration. Custom D3.js visualizations make complex data intuitive.',
    results: [
      { metric: 'User Engagement', value: '320% increase', improvement: true },
      { metric: 'Report Generation Time', value: '80% faster', improvement: true },
      { metric: 'Collaboration Efficiency', value: '5x improvement', improvement: true },
      { metric: 'Active Users', value: '10,000+', improvement: false }
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'WebSocket', 'D3.js', 'AWS'],
    testimonial: {
      quote: 'The platform Velox built is exactly what we envisioned. Our clients love the intuitive interface and real-time features.',
      author: 'Alex Kim',
      role: 'CEO, DataLytics Corp'
    },
    timeline: '5 months',
    team: '4 engineers',
    beforeAfter: {
      before: 'Static reports, no collaboration tools, disconnected team workflows',
      after: 'Real-time collaborative platform, interactive visualizations, 10k+ active users'
    }
  }
];

// Pricing plans
const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,500',
    period: 'per project',
    popular: false,
    description: 'Perfect for small projects and MVPs',
    features: [
      { name: 'Single service focus', included: true },
      { name: 'Up to 4 weeks development', included: true },
      { name: 'Basic documentation', included: true },
      { name: 'Email support', included: true },
      { name: '2 revision rounds', included: true },
      { name: 'Deployment assistance', included: true },
      { name: 'Dedicated team', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom integrations', included: false }
    ],
    cta: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$7,500',
    period: 'per project',
    popular: true,
    description: 'Ideal for most business needs',
    features: [
      { name: 'Multiple service integration', included: true },
      { name: 'Up to 12 weeks development', included: true },
      { name: 'Comprehensive documentation', included: true },
      { name: 'Priority support', included: true },
      { name: 'Unlimited revisions', included: true },
      { name: 'Full deployment & setup', included: true },
      { name: 'Dedicated team', included: true },
      { name: '3 months maintenance', included: true },
      { name: 'Custom integrations', included: true }
    ],
    cta: 'Start Professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    popular: false,
    description: 'For large-scale, mission-critical projects',
    features: [
      { name: 'Full-scale system design', included: true },
      { name: 'Unlimited development time', included: true },
      { name: 'Enterprise documentation', included: true },
      { name: '24/7 priority support', included: true },
      { name: 'Unlimited revisions', included: true },
      { name: 'Full DevOps setup', included: true },
      { name: 'Dedicated team of 4+', included: true },
      { name: '12 months maintenance', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'On-site consulting', included: true }
    ],
    cta: 'Contact Sales'
  }
];

// FAQ data
const FAQ_DATA = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What services does Velox Dynamics offer?',
    answer: 'We specialize in AI & Machine Learning, Computer Vision, N8N Automation, and Full-Stack Development. Our team delivers custom solutions tailored to your specific business needs.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Who is the "Silent Wolf pack"?',
    answer: 'The Silent Wolf pack is our elite team of engineers who work quietly but deliver powerfully. We believe in letting our work speak louder than our words.'
  },
  {
    id: 'faq-3',
    category: 'Services',
    question: 'Do you work with startups or only established companies?',
    answer: 'We work with businesses of all sizes! From startups needing MVPs to enterprises requiring complex systems, we have solutions for every scale.'
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'Can you help with both frontend and backend development?',
    answer: 'Absolutely! We offer full-stack development services, handling everything from user interface design to database architecture and deployment.'
  },
  {
    id: 'faq-5',
    category: 'Pricing',
    question: 'How do you price your projects?',
    answer: 'We offer three main tiers: Starter ($2,500), Professional ($7,500), and Enterprise (custom pricing). Final pricing depends on project scope, complexity, and timeline.'
  },
  {
    id: 'faq-6',
    category: 'Pricing',
    question: 'Do you offer payment plans?',
    answer: 'Yes! For Professional and Enterprise projects, we offer milestone-based payment plans. Typically: 30% upfront, 40% at midpoint, 30% on completion.'
  },
  {
    id: 'faq-7',
    category: 'Pricing',
    question: 'What\'s included in the maintenance period?',
    answer: 'Maintenance includes bug fixes, security updates, performance monitoring, and minor feature adjustments. Enterprise plans get 24/7 support coverage.'
  },
  {
    id: 'faq-8',
    category: 'Technical',
    question: 'What AI/ML frameworks do you work with?',
    answer: 'We specialize in TensorFlow, PyTorch, and scikit-learn for machine learning. For computer vision, we use OpenCV, YOLO, and custom-trained neural networks.'
  },
  {
    id: 'faq-9',
    category: 'Technical',
    question: 'Can you integrate with our existing systems?',
    answer: 'Yes! We have extensive experience integrating with various APIs, databases, and legacy systems. N8N automation is particularly powerful for system integration.'
  },
  {
    id: 'faq-10',
    category: 'Technical',
    question: 'Do you provide training for our team?',
    answer: 'Yes, Enterprise plans include comprehensive training sessions. Professional plans can add training for an additional fee. We ensure your team can maintain and extend the solution.'
  },
  {
    id: 'faq-11',
    category: 'Support',
    question: 'What kind of support do you offer after project completion?',
    answer: 'All projects include email support. Professional plans get priority support, and Enterprise plans receive 24/7 support with guaranteed response times.'
  },
  {
    id: 'faq-12',
    category: 'Support',
    question: 'How long does a typical project take?',
    answer: 'Starter projects: 2-4 weeks. Professional projects: 6-12 weeks. Enterprise projects: 3-6 months. Timeline varies based on complexity and requirements.'
  },
  {
    id: 'faq-13',
    category: 'Support',
    question: 'What happens if I need changes after the project is done?',
    answer: 'All plans include revision rounds during development. Post-launch changes are covered during the maintenance period. After that, we offer affordable hourly rates for updates.'
  }
];

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [requests, setRequests] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('velox_projects');
    const storedTestimonials = localStorage.getItem('velox_testimonials');
    const storedRequests = localStorage.getItem('velox_requests');
    const storedProposals = localStorage.getItem('velox_proposals');
    const storedMessages = localStorage.getItem('velox_messages');
    const storedConversations = localStorage.getItem('velox_conversations');

    setProjects(storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS);
    setTestimonials(storedTestimonials ? JSON.parse(storedTestimonials) : INITIAL_TESTIMONIALS);
    setRequests(storedRequests ? JSON.parse(storedRequests) : []);
    setProposals(storedProposals ? JSON.parse(storedProposals) : []);
    setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    setConversations(storedConversations ? JSON.parse(storedConversations) : []);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('velox_projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (testimonials.length > 0) {
      localStorage.setItem('velox_testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('velox_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('velox_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('velox_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('velox_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const addRequest = (request) => {
    const newRequest = {
      ...request,
      id: `request-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setRequests(prev => [...prev, newRequest]);
    return newRequest;
  };

  const updateRequest = (requestId, updates) => {
    setRequests(prev => 
      prev.map(req => req.id === requestId ? { ...req, ...updates, updatedAt: new Date().toISOString() } : req)
    );
  };

  const deleteRequest = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const addProposal = (proposal) => {
    const newProposal = {
      ...proposal,
      id: `proposal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setProposals(prev => [...prev, newProposal]);
    return newProposal;
  };

  const updateProposal = (proposalId, updates) => {
    setProposals(prev =>
      prev.map(prop => prop.id === proposalId ? { ...prop, ...updates, updatedAt: new Date().toISOString() } : prop)
    );
  };

  const getUserRequests = (userId) => {
    return requests.filter(req => req.userId === userId);
  };

  const getUserProposals = (userId) => {
    return proposals.filter(prop => prop.userId === userId);
  };

  // Message Management Functions
  const sendMessage = (message) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [...prev, newMessage]);

    // Update or create conversation
    const conversationId = message.conversationId || `${message.senderId}-${message.recipientId}`;
    setConversations(prev => {
      const existing = prev.find(c => c.id === conversationId);
      if (existing) {
        return prev.map(c => 
          c.id === conversationId 
            ? { ...c, lastMessage: newMessage.text, lastMessageTime: newMessage.timestamp, unreadCount: (c.unreadCount || 0) + 1 }
            : c
        );
      } else {
        return [...prev, {
          id: conversationId,
          participants: [message.senderId, message.recipientId],
          lastMessage: newMessage.text,
          lastMessageTime: newMessage.timestamp,
          unreadCount: 1
        }];
      }
    });

    return newMessage;
  };

  const getConversationMessages = (conversationId) => {
    return messages.filter(msg => msg.conversationId === conversationId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getUserConversations = (userId) => {
    return conversations.filter(conv => conv.participants.includes(userId));
  };

  const markMessagesAsRead = (conversationId, userId) => {
    setMessages(prev => prev.map(msg => 
      msg.conversationId === conversationId && msg.recipientId === userId
        ? { ...msg, read: true }
        : msg
    ));

    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  // Search function for global content search
  const searchContent = (query) => {
    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search blog posts
    INITIAL_BLOG_POSTS.forEach(post => {
      if (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          type: 'blog',
          title: post.title,
          description: post.excerpt,
          category: post.category,
          url: `/blog/${post.slug}`
        });
      }
    });

    // Search case studies
    INITIAL_CASE_STUDIES.forEach(study => {
      if (
        study.title.toLowerCase().includes(lowerQuery) ||
        study.challenge.toLowerCase().includes(lowerQuery) ||
        study.client.toLowerCase().includes(lowerQuery) ||
        study.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'case-study',
          title: study.title,
          description: study.challenge,
          category: study.category,
          url: `/case-studies#${study.slug}`
        });
      }
    });

    // Search projects
    projects.forEach(project => {
      if (
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'service',
          title: project.title,
          description: project.description,
          category: project.category,
          url: '/portfolio'
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  };

  const value = {
    projects,
    testimonials,
    requests,
    proposals,
    messages,
    conversations,
    addRequest,
    updateRequest,
    deleteRequest,
    addProposal,
    updateProposal,
    getUserRequests,
    getUserProposals,
    sendMessage,
    getConversationMessages,
    getUserConversations,
    markMessagesAsRead,
    blogPosts: INITIAL_BLOG_POSTS,
    caseStudies: INITIAL_CASE_STUDIES,
    pricingPlans: PRICING_PLANS,
    faqs: FAQ_DATA,
    searchContent
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
