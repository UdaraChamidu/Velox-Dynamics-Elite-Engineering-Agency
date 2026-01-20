import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Zap } from 'lucide-react';
import Card from '../ui/Card';

const TimelineEstimator = () => {
  const [inputs, setInputs] = useState({
    projectType: 'web-app',
    complexity: 'medium',
    features: 5,
    teamAvailability: 'full-time'
  });

  const calculateTimeline = () => {
    const baseWeeks = {
      'web-app': 8,
      'mobile-app': 12,
      'ai-solution': 16,
      'automation': 6,
      'computer-vision': 14
    };

    const complexityMultiplier = {
      'low': 0.7,
      'medium': 1,
      'high': 1.5
    };

    const availabilityMultiplier = {
      'full-time': 1,
      'part-time': 1.5,
      'flexible': 1.3
    };

    const base = baseWeeks[inputs.projectType] || 8;
    const complexity = complexityMultiplier[inputs.complexity];
    const availability = availabilityMultiplier[inputs.teamAvailability];
    const featureWeeks = inputs.features * 0.5;

    const totalWeeks = Math.ceil((base + featureWeeks) * complexity * availability);
    const months = Math.ceil(totalWeeks / 4);

    return {
      weeks: totalWeeks,
      months: months,
      phases: {
        planning: Math.ceil(totalWeeks * 0.15),
        development: Math.ceil(totalWeeks * 0.6),
        testing: Math.ceil(totalWeeks * 0.15),
        deployment: Math.ceil(totalWeeks * 0.1)
      }
    };
  };

  const timeline = calculateTimeline();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
        >
          <Calendar className="w-10 h-10 text-blue-400" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Timeline Estimator</h2>
        <p className="text-muted-foreground text-lg">
          Get an estimated timeline for your project
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Project Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Type</label>
              <select
                value={inputs.projectType}
                onChange={(e) => setInputs({ ...inputs, projectType: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile App</option>
                <option value="ai-solution">AI/ML Solution</option>
                <option value="computer-vision">Computer Vision</option>
                <option value="automation">Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Complexity Level</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setInputs({ ...inputs, complexity: level })}
                    className={`p-2 rounded-lg border text-sm capitalize transition-all ${
                      inputs.complexity === level
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Features ({inputs.features})
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={inputs.features}
                onChange={(e) => setInputs({ ...inputs, features: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Team Availability</label>
              <select
                value={inputs.teamAvailability}
                onChange={(e) => setInputs({ ...inputs, teamAvailability: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="full-time">Full-time dedicated</option>
                <option value="flexible">Flexible schedule</option>
                <option value="part-time">Part-time availability</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Estimated Duration</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <motion.div
              key={timeline.weeks}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-blue-400"
            >
              {timeline.months} months
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1">
              ({timeline.weeks} weeks)
            </p>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Project Phases
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Planning & Design</span>
                <span className="font-semibold text-primary">{timeline.phases.planning} weeks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Development</span>
                <span className="font-semibold text-primary">{timeline.phases.development} weeks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Testing & QA</span>
                <span className="font-semibold text-primary">{timeline.phases.testing} weeks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Deployment</span>
                <span className="font-semibold text-primary">{timeline.phases.deployment} weeks</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/20">
            <h4 className="font-semibold mb-3">Timeline Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-muted-foreground">Start Date: Immediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-muted-foreground">
                  Estimated Completion: {timeline.months} months from start
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-muted-foreground">
                  Buffer time included for revisions
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/20 rounded-lg text-sm text-muted-foreground text-center">
        <p>
          *Timelines are estimates based on typical project requirements. 
          Actual duration may vary based on specific needs and scope changes.
        </p>
      </div>
    </div>
  );
};

export default TimelineEstimator;
