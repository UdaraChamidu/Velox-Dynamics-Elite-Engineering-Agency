import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Mail } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Footer from '../../components/navigation/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TiltCard from '../../components/ui/TiltCard';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Shadow',
      role: 'Lead AI Architect',
      avatar: 'AS',
      bio: 'Pioneering AI solutions with 10+ years in deep learning and neural networks.'
    },
    {
      name: 'Maya Cipher',
      role: 'Computer Vision Expert',
      avatar: 'MC',
      bio: 'Transforming visual data into actionable intelligence through cutting-edge CV systems.'
    },
    {
      name: 'Kai Storm',
      role: 'Automation Specialist',
      avatar: 'KS',
      bio: 'Orchestrating seamless workflows and intelligent process automation.'
    },
    {
      name: 'Nova Steel',
      role: 'Full-Stack Engineer',
      avatar: 'NS',
      bio: 'Building scalable, high-performance web applications with modern technology stacks.'
    }
  ];

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">The <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Pack</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Silent. Focused. Precise. Meet the wolves behind Velox Dynamics.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard>
                  <Card className="p-6 text-center h-full">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold glow-md">
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Join The Pack CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join The Pack</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Are you a talented freelancer or developer looking to work on cutting-edge projects? 
                We're always looking for exceptional talent to join our elite team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline">
                    See What We Build
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
