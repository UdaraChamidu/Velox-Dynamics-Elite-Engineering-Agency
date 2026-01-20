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

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [requests, setRequests] = useState([]);
  const [proposals, setProposals] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('velox_projects');
    const storedTestimonials = localStorage.getItem('velox_testimonials');
    const storedRequests = localStorage.getItem('velox_requests');
    const storedProposals = localStorage.getItem('velox_proposals');

    setProjects(storedProjects ? JSON.parse(storedProjects) : INITIAL_PROJECTS);
    setTestimonials(storedTestimonials ? JSON.parse(storedTestimonials) : INITIAL_TESTIMONIALS);
    setRequests(storedRequests ? JSON.parse(storedRequests) : []);
    setProposals(storedProposals ? JSON.parse(storedProposals) : []);
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

  const value = {
    projects,
    testimonials,
    requests,
    proposals,
    addRequest,
    updateRequest,
    deleteRequest,
    addProposal,
    updateProposal,
    getUserRequests,
    getUserProposals
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
