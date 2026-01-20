import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Eye, 
  Workflow, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  Cpu,
  Zap,
  Lock
} from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';

const Home = () => {
  const { testimonials } = useData();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const services = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions leveraging cutting-edge deep learning models for intelligent automation and predictive analytics.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Advanced visual recognition systems for real-time object detection, facial recognition, and image analysis.',
      gradient: 'from-pink-500/20 to-purple-500/20'
    },
    {
      icon: Workflow,
      title: 'N8N Automation',
      description: 'Powerful workflow automation integrating multiple platforms for seamless business process optimization.',
      gradient: 'from-purple-600/20 to-purple-400/20'
    },
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'End-to-end web solutions with modern frameworks, scalable architecture, and premium user experiences.',
      gradient: 'from-pink-400/20 to-pink-600/20'
    }
  ];

  const roadmap = [
    {
      icon: Cpu,
      title: 'Electronics',
      status: 'Classified',
      description: 'Advanced PCB design and embedded systems'
    },
    {
      icon: Zap,
      title: 'Mechatronics',
      status: 'Classified',
      description: 'Integration of mechanical and electronic systems'
    },
    {
      icon: Lock,
      title: 'Robotics',
      status: 'Classified',
      description: 'Autonomous systems and intelligent machines'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
              Engineering Speed.<br />Mastering Intelligence.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Elite AI, Computer Vision, and Automation solutions crafted by the Silent Wolf pack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button size="lg" className="text-lg">
                  View Our Work
                </Button>
              </Link>
              <Link to="/team">
                <Button size="lg" variant="outline" className="text-lg">
                  Meet The Pack
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Brain className="w-16 h-16 text-primary/30" />
            </motion.div>
            <motion.div
              className="absolute top-40 right-10"
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <Cpu className="w-20 h-20 text-secondary/30" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-1/4"
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            >
              <Eye className="w-14 h-14 text-primary/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Cutting-edge solutions for the modern age
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 glow-md`}>
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Horizons / Roadmap */}
      <section className="py-20 px-6 relative z-10 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Future Horizons</h2>
            <p className="text-xl text-muted-foreground">
              Expanding into uncharted territories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {roadmap.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="p-8 text-center relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full glow-sm">
                      {item.status}
                    </div>
                    <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
              <p className="text-xl text-muted-foreground">
                What our partners say about us
              </p>
            </motion.div>

            <div className="relative">
              <Card className="p-8 md:p-12">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl text-primary mb-4">"</div>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    {testimonials[currentTestimonial].content}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                      {testimonials[currentTestimonial].name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </motion.div>
              </Card>

              {testimonials.length > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary hover:glow-sm transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6 mx-auto" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-card border border-border hover:border-primary hover:glow-sm transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6 mx-auto" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Vision?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the pack and experience the future of engineering.
          </p>
          <Link to="/login">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Velox Dynamics. All rights reserved. Built with precision and passion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
