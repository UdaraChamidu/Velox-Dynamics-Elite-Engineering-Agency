import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const colors = {
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/50',
    error: 'from-red-500/20 to-rose-500/20 border-red-500/50',
    warning: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50'
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-br ${colors[toast.type]} border backdrop-blur-xl rounded-lg p-4 shadow-lg min-w-[320px]`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${iconColors[toast.type]} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  {toast.title && (
                    <h4 className="font-semibold text-foreground mb-1">{toast.title}</h4>
                  )}
                  <p className="text-sm text-muted-foreground">{toast.message}</p>
                </div>
                <button
                  onClick={() => onClose(toast.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
