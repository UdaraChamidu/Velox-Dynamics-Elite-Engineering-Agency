import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Footer from '../../components/navigation/Footer';
import ServiceComparison from '../../components/ui/ServiceComparison';
import { useData } from '../../contexts/DataContext';

const Pricing = () => {
  const { pricingPlans } = useData();

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
              Simple <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your project. No hidden fees, transparent pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 glow-md z-10">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <Card 
                  className={`p-8 h-full flex flex-col ${
                    plan.popular 
                      ? 'border-primary glow-lg transform scale-105' 
                      : ''
                  }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/60'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link to="/contact" className="w-full">
                    <Button
                      size="lg"
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground text-lg">
              See exactly what's included in each plan
            </p>
          </div>
          <ServiceComparison />
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 px-6 bg-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our FAQ section or contact us directly for custom pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faq">
              <Button variant="outline" size="lg">View FAQ</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
