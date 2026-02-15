import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Footer from '../../components/navigation/Footer';
import { useData } from '../../contexts/DataContext';


const FAQ = () => {
  const { faqs } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to know about our services and how we work.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg glow-md'
                    : 'bg-card text-muted-foreground hover:bg-muted/30 border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 flex items-start justify-between text-left hover:bg-muted/10 transition-colors rounded-lg"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{faq.question}</h3>
                          <span className="text-xs text-muted-foreground">{faq.category}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-14 text-muted-foreground">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No FAQs found matching "{searchQuery}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
