import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgressStepper = ({ currentStep, steps = [] }) => {
  const defaultSteps = [
    { label: 'Submitted', value:  'submitted' },
    { label: 'In Review', value: 'in_review' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' }
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;
  const currentStepIndex = displaySteps.findIndex(step => step.value === currentStep);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(currentStepIndex / (displaySteps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {displaySteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isFuture = index > currentStepIndex;

          return (
            <div key={step.value} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted 
                    ? 'bg-primary border-primary glow-sm' 
                    : isCurrent
                    ? 'bg-primary/20 border-primary glow-md'
                    : 'bg-card border-border'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span className={`text-sm font-bold ${
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium whitespace-nowrap ${
                  isCompleted || isCurrent 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-primary mt-1"
                  >
                    Current
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;
