import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Users, Clock, CheckCircle, ArrowRight, Star } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Footer from '../../components/navigation/Footer';
import { useData } from '../../contexts/DataContext';

const CaseStudies = () => {
  const { caseStudies } = useData();
  const location = useLocation();

  // Scroll to specific case study if hash is present
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView ({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

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
              Success <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real clients. See how we've transformed businesses with innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              id={study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2 }}
              className="scroll-mt-24"
            >
              <Card className="overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-primary/20 text-primary font-semibold rounded-full text-sm">
                      {study.category}
                    </span>
                    {study.featured && (
                      <span className="px-4 py-1 bg-yellow-500/20 text-yellow-400 font-semibold rounded-full text-sm flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{study.title}</h2>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{study.client} • {study.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{study.timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                  {/* Challenge */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 font-bold">1</span>
                      </div>
                      Challenge
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-bold">2</span>
                      </div>
                      Solution
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {study.solution}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {study.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-card border border-border rounded-md text-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 font-bold">3</span>
                      </div>
                      Results
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {study.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="p-6 bg-card border border-border rounded-lg text-center"
                        >
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {result.improvement && (
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            )}
                            <span className="text-2xl font-bold text-primary">
                              {result.value}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.metric}</p>
                        </div>
                      ))}
                    </div>

                    {/* Before/After */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-red-400">Before</h4>
                        <p className="text-sm text-muted-foreground">{study.beforeAfter.before}</p>
                      </div>
                      <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-green-400">After</h4>
                        <p className="text-sm text-muted-foreground">{study.beforeAfter.after}</p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {study.testimonial && (
                    <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-primary/20 rounded-lg">
                      <div className="text-3xl text-primary mb-4">"</div>
                      <p className="text-lg italic text-muted-foreground mb-4">
                        {study.testimonial.quote}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                          {study.testimonial.author[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{study.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Team Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{study.team}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{study.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Join our roster of satisfied clients and transform your business with cutting-edge technology.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
