import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import BudgetCalculator from '../../components/tools/BudgetCalculator';

const BudgetEstimator = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />
      
      <main className="relative z-10 pt-24 pb-20 px-6">
        <BudgetCalculator />
        
        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-card border border-border rounded-lg">
          <h3 className="font-semibold mb-4">What's Included</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Full project development</li>
            <li>✓ Quality assurance and testing</li>
            <li>✓ Documentation and training</li>
            <li>✓ Post-launch support (30 days)</li>
            <li>✓ Source code ownership</li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need a more detailed quote?{' '}
              <Link to="/contact" className="text-primary hover:underline">
                Contact our team
              </Link>{' '}
              for a personalized consultation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetEstimator;
