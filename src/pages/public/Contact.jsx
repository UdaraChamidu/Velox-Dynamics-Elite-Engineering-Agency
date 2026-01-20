import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import Card from '../../components/ui/Card';
import FloatingShapes from '../../components/ui/FloatingShapes';
import ServiceRequestWizard from '../../components/forms/ServiceRequestWizard';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with cutting-edge technology? Let's discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Request Wizard */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ServiceRequestWizard />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Reach Us</h2>
            <p className="text-muted-foreground">
              Prefer to contact us directly? Choose your preferred method below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:contact@veloxdynamics.com" className="text-muted-foreground hover:text-primary transition-colors">
                contact@veloxdynamics.com
              </a>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 123-4567
              </a>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-muted-foreground">Global Remote Team</p>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="p-6 inline-block">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Response Time:</strong> We typically respond within 24 hours
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Velox Dynamics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
