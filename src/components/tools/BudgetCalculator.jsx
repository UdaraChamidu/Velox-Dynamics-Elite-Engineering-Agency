import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, Users, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const BudgetCalculator = () => {
  const [selections, setSelections] = useState({
    projectType: 'web-app',
    complexity: 'medium',
    timeline: '3-months',
    teamSize: 'small'
  });

  const pricing = {
    projectType: {
      'web-app': 5000,
      'mobile-app': 7000,
      'ai-solution': 10000,
      'automation': 4000
    },
    complexity: {
      'low': 1,
      'medium': 1.5,
      'high': 2.5
    },
    timeline: {
      '1-month': 1.5,
      '3-months': 1,
      '6-months': 0.8
    },
    teamSize: {
      'small': 1,
      'medium': 1.3,
      'large': 1.6
    }
  };

  const calculateEstimate = () => {
    const base = pricing.projectType[selections.projectType];
    const complexity = pricing.complexity[selections.complexity];
    const timeline = pricing.timeline[selections.timeline];
    const teamSize = pricing.teamSize[selections.teamSize];
    
    return Math.round(base * complexity * timeline * teamSize);
  };

  const estimate = calculateEstimate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
        >
          <Calculator className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Budget Calculator</h2>
        <p className="text-muted-foreground text-lg">
          Get an instant estimate for your project
        </p>
      </div>

      <Card className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Type */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Project Type
            </label>
            <div className="space-y-2">
              {[
                { value: 'web-app', label: 'Web Application', desc: 'Full-stack web platform' },
                { value: 'mobile-app', label: 'Mobile App', desc: 'iOS/Android application' },
                { value: 'ai-solution', label: 'AI Solution', desc: 'Machine learning project' },
                { value: 'automation', label: 'Automation', desc: 'Workflow automation' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelections({ ...selections, projectType: option.value })}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selections.projectType === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Complexity
            </label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Low', desc: 'Basic features' },
                { value: 'medium', label: 'Medium', desc: 'Standard complexity' },
                { value: 'high', label: 'High', desc: 'Advanced features' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelections({ ...selections, complexity: option.value })}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selections.complexity === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Timeline
            </label>
            <div className="space-y-2">
              {[
                { value: '1-month', label: '1 Month', desc: 'Rush delivery' },
                { value: '3-months', label: '3 Months', desc: 'Standard timeline' },
                { value: '6-months', label: '6+ Months', desc: 'Extended timeline' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelections({ ...selections, timeline: option.value })}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selections.timeline === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Team Size
            </label>
            <div className="space-y-2">
              {[
                { value: 'small', label: 'Small Team', desc: '1-2 developers' },
                { value: 'medium', label: 'Medium Team', desc: '3-5 developers' },
                { value: 'large', label: 'Large Team', desc: '6+ developers' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelections({ ...selections, teamSize: option.value })}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selections.teamSize === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estimate Result */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-primary/20 rounded-lg"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Estimated Project Cost</p>
            <motion.p
              key={estimate}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold text-primary mb-4"
            >
              ${estimate.toLocaleString()}
            </motion.p>
            <p className="text-sm text-muted-foreground mb-6">
              *This is an estimate. Final pricing may vary based on specific requirements.
            </p>
            <Button size="lg">
              Get Detailed Quote
            </Button>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default BudgetCalculator;
