import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Briefcase, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { searchContent } = useData();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      // Debounce search
      const timer = setTimeout(() => {
        const searchResults = searchContent(query);
        setResults(searchResults);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, searchContent]);

  const handleResultClick = (result) => {
    navigate(result.url);
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'blog':
        return FileText;
      case 'case-study':
        return Briefcase;
      case 'service':
        return Code2;
      default:
        return FileText;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blog posts, case studies, services..."
          className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {results.map((result, index) => {
              const Icon = getIcon(result.type);
              return (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{result.title}</h4>
                    {result.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {result.description}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground/60 mt-1 inline-block">
                      {result.category || result.type}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {isOpen && results.length === 0 && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl p-6 text-center z-50"
          >
            <p className="text-muted-foreground">No results found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
