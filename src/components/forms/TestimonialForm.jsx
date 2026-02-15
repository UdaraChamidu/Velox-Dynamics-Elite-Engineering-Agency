import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    rating: 5,
    testimonial: '',
    projectType: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to backend
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        rating: 5,
        testimonial: '',
        projectType: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your testimonial has been submitted and is pending review.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
            >
              <Star className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Share Your Experience</h2>
            <p className="text-muted-foreground">
              Help others by sharing your experience working with us
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              {/* Company & Role */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Role
                  </label>
                  <Input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="CEO, CTO, etc."
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select project type</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ai-solution">AI/ML Solution</option>
                  <option value="computer-vision">Computer Vision</option>
                  <option value="automation">Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Testimonial *
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your experience working with Velox Dynamics..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum 50 characters
                </p>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Submit Testimonial
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your testimonial will be reviewed before being published on our website.
              </p>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default TestimonialForm;
