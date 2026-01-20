import React from 'react';

const Input = ({ 
  label,
  error,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const baseStyles = "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:glow-sm transition-all duration-250";
  const errorStyles = error ? "border-destructive focus:border-destructive" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export const Textarea = ({ 
  label,
  error,
  className = '',
  containerClassName = '',
  rows = 4,
  ...props 
}) => {
  const baseStyles = "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:glow-sm transition-all duration-250 resize-none";
  const errorStyles = error ? "border-destructive focus:border-destructive" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export const Select = ({ 
  label,
  error,
  options = [],
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const baseStyles = "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:glow-sm transition-all duration-250";
  const errorStyles = error ? "border-destructive focus:border-destructive" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <select
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default Input;
