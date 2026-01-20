import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      name: 'Web Application',
      starter: { available: true, details: 'Basic responsive website' },
      professional: { available: true, details: 'Full-stack with authentication' },
      enterprise: { available: true, details: 'Scalable architecture + DevOps' }
    },
    {
      name: 'Mobile App',
      starter: { available: false, details: '-' },
      professional: { available: true, details: 'iOS or Android' },
      enterprise: { available: true, details: 'Cross-platform + Backend' }
    },
    {
      name: 'AI/ML Solutions',
      starter: { available: false, details: '-' },
      professional: { available: true, details: 'Pre-trained models' },
      enterprise: { available: true, details: 'Custom model training' }
    },
    {
      name: 'Computer Vision',
      starter: { available: false, details: '-' },
      professional: { available: true, details: 'Object detection' },
      enterprise: { available: true, details: 'Custom CV pipelines' }
    },
    {
      name: 'N8N Automation',
      starter: { available: true, details: 'Up to 5 workflows' },
      professional: { available: true, details: 'Up to 20 workflows' },
      enterprise: { available: true, details: 'Unlimited workflows' }
    },
    {
      name: 'Database Design',
      starter: { available: true, details: 'Basic schema' },
      professional: { available: true, details: 'Optimized + migrations' },
      enterprise: { available: true, details: 'Multi-region + sharding' }
    },
    {
      name: 'API Development',
      starter: { available: true, details: 'RESTful APIs' },
      professional: { available: true, details: 'REST + GraphQL' },
      enterprise: { available: true, details: 'Microservices architecture' }
    },
    {
      name: 'Cloud Deployment',
      starter: { available: true, details: 'Shared hosting' },
      professional: { available: true, details: 'VPS/Cloud server' },
      enterprise: { available: true, details: 'Auto-scaling + CDN' }
    },
    {
      name: 'Support',
      starter: { available: true, details: 'Email (48h response)' },
      professional: { available: true, details: 'Priority (24h response)' },
      enterprise: { available: true, details: 'Dedicated support (4h SLA)' }
    },
    {
      name: 'Source Code',
      starter: { available: true, details: 'Included' },
      professional: { available: true, details: 'Included + Documentation' },
      enterprise: { available: true, details: 'Full ownership + Training' }
    },
    {
      name: 'Maintenance (months)',
      starter: { available: true, details: '1 month' },
      professional: { available: true, details: '3 months' },
      enterprise: { available: true, details: '12 months' }
    },
    {
      name: 'Team Size',
      starter: { available: true, details: '1-2 developers' },
      professional: { available: true, details: '3-5 developers' },
      enterprise: { available: true, details: 'Dedicated team' }
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$2,500',
      period: 'per project',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      name: 'Professional',
      price: '$5,000',
      period: 'per project',
      popular: true,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      color: 'from-pink-500/20 to-orange-500/20'
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4">
            <h3 className="text-xl font-bold">Compare Plans</h3>
            <p className="text-sm text-muted-foreground">
              Choose the right plan for your project
            </p>
          </div>
          
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg bg-gradient-to-br ${plan.color} border ${
                plan.popular ? 'border-primary shadow-lg' : 'border-border'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}
              <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
              <div className="text-3xl font-bold text-primary mb-1">{plan.price}</div>
              <p className="text-xs text-muted-foreground">{plan.period}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="space-y-1">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-4 gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all"
            >
              <div className="font-medium flex items-center">{service.name}</div>
              
              <div className="flex items-center gap-2">
                {service.starter.available ? (
                  <>
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{service.starter.details}</span>
                  </>
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {service.professional.available ? (
                  <>
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{service.professional.details}</span>
                  </>
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {service.enterprise.available ? (
                  <>
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{service.enterprise.details}</span>
                  </>
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceComparison;
