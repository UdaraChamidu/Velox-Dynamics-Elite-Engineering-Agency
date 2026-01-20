import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  // Mock client logos - replace with actual client logos
  const clients = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'InnovateLabs', logo: '🔬' },
    { name: 'DataSystems', logo: '📊' },
    { name: 'CloudNet', logo: '☁️' },
    { name: 'AI Solutions', logo: '🤖' },
    { name: 'SecureSpace', logo: '🔒' },
    { name: 'QuantumTech', logo: '⚛️' },
    { name: 'NextGen', logo: '🚀' }
  ];

  return (
    <section className="py-16 bg-muted/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground">
            Partnering with innovative companies worldwide
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-lg hover:bg-card transition-all group cursor-pointer"
            >
              <div className="text-5xl mb-2 grayscale group-hover:grayscale-0 transition-all">
                {client.logo}
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-12 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">✓</span>
              </div>
              <span className="text-sm font-medium">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">★</span>
              </div>
              <span className="text-sm font-medium">5.0 Client Rating</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400">🏆</span>
              </div>
              <span className="text-sm font-medium">Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
