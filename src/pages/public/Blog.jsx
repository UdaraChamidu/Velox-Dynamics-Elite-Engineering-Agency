import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import PublicNav from '../../components/navigation/PublicNav';
import Card from '../../components/ui/Card';
import TiltCard from '../../components/ui/TiltCard';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Footer from '../../components/navigation/Footer';
import { useData } from '../../contexts/DataContext';

const Blog = () => {
  const { blogPosts } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading] = useState(false);

  const categories = ['All', 'AI & Machine Learning', 'Computer Vision', 'Automation'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
              Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert perspectives on AI, automation, and cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
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

      {/* Blog Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LoadingSkeleton variant="card" count={6} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <TiltCard>
                      <Card className="h-full hover:border-primary transition-colors duration-300 group overflow-hidden">
                        {/* Featured Badge */}
                        {post.featured && (
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                            Featured
                          </div>
                        )}

                        {/* Gradient Header */}
                        <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <Tag className="w-16 h-16 text-primary relative z-10" />
                        </div>

                        <div className="p-6">
                          {/* Category Badge */}
                          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                            {post.category}
                          </div>

                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* Read More */}
                          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
                              Read Article
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </TiltCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest tech insights and updates.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
