import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { useData } from '../../contexts/DataContext';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const { projects } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Computer Vision', 'Automation', 'Web App'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6"> Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Portfolio</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our cutting-edge projects showcasing AI, automation, and innovation.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground glow-md'
                    : 'bg-card text-muted-foreground hover:text-primary hover:border-primary border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                      <ExternalLink className="w-12 h-12 text-primary" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div>
            <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-6 flex items-center justify-center">
              <ExternalLink className="w-16 h-16 text-primary" />
            </div>
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              {selectedProject.category}
            </div>
            <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-foreground text-sm rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Year: {selectedProject.year}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Portfolio;
