import React, { useState, useEffect } from 'react';
import { Rocket, Clock, Bell, Mail } from 'lucide-react';
import FloatingShapes from '../../components/ui/FloatingShapes';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In production, send to newsletter service
    setSubscribed(true);
    setTimeout(() => setEmail(''), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo-192.png" 
              alt="Velox Dynamics" 
              className="h-20 w-auto mx-auto"
            />
          </div>

          {/* Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Rocket className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Something Amazing
            <br />
            Is Coming Soon
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're crafting something extraordinary. Be the first to know when we launch our revolutionary new service.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="p-6 bg-card border border-border rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Notify Form */}
          {subscribed ? (
            <div className="mb-8 p-6 bg-green-500/10 border border-green-500/20 rounded-lg max-w-md mx-auto">
              <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                <Bell className="w-5 h-5" />
                You're on the list! We'll notify you at launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mb-8 max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </form>
          )}

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: '🚀', title: 'Revolutionary', desc: 'Cutting-edge technology' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized performance' },
              { icon: '🎯', title: 'Precision', desc: 'Tailored solutions' }
            ].map((feature) => (
              <div key={feature.title} className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
