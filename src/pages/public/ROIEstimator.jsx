import React from 'react';
import { motion } from 'framer-motion';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import ROICalculator from '../../components/tools/ROICalculator';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ROIEstimator = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />
      
      <main className="relative z-10 pt-24 pb-20 px-6">
        <ROICalculator />
        
        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Time Savings</h3>
              <p className="text-sm text-muted-foreground">
                Automation reduces manual work by up to 70%, freeing your team for strategic tasks.
              </p>
            </div>
            
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Cost Reduction</h3>
              <p className="text-sm text-muted-foreground">
                Lower operational costs through optimized processes and reduced errors.
              </p>
            </div>
            
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Faster ROI</h3>
              <p className="text-sm text-muted-foreground">
                Most projects achieve positive ROI within 6-12 months of deployment.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to see how we can help you achieve these results?
            </p>
            <Link to="/contact">
              <Button size="lg">Get a Custom Quote</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ROIEstimator;
