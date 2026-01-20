import React from 'react';
import PublicNav from '../../components/navigation/PublicNav';
import FloatingShapes from '../../components/ui/FloatingShapes';
import TimelineEstimator from '../../components/tools/TimelineEstimator';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <FloatingShapes />
      
      <main className="relative z-10 pt-24 pb-20 px-6">
        <TimelineEstimator />
        
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss your specific requirements and create a detailed project plan.
          </p>
          <Link to="/contact">
            <Button size="lg">Schedule a Consultation</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
