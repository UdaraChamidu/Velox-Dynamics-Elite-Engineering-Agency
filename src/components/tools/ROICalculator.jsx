import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import Card from '../ui/Card';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    currentCost: 50000,
    currentTime: 40,
    teamSize: 5,
    errorRate: 20
  });

  const [results, setResults] = useState({
    timeSaved: 0,
    costSaved: 0,
    productivityGain: 0,
    roi: 0,
    paybackMonths: 0
  });

  const investmentCost = 15000; // Estimated project cost

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    // Time savings (assume 50% reduction with automation)
    const timeSaved = inputs.currentTime * 0.5;
    
    // Cost savings based on time saved
    const hourlyCost = inputs.currentCost / (inputs.currentTime * 40 * 12); // Annual to hourly
    const annualTimeSaved = timeSaved * 40 * 12; // Hours per year
    const costSaved = annualTimeSaved * hourlyCost;
    
    // Productivity gain from error reduction
    const errorReductionValue = (inputs.currentCost * (inputs.errorRate / 100)) * 0.7; // 70% error reduction
    
    // Total annual benefit
    const totalAnnualBenefit = costSaved + errorReductionValue;
    
    // ROI calculation
    const roi = ((totalAnnualBenefit - investmentCost) / investmentCost) * 100;
    
    // Payback period in months
    const monthlyBenefit = totalAnnualBenefit / 12;
    const paybackMonths = investmentCost / monthlyBenefit;

    setResults({
      timeSaved: Math.round(timeSaved),
      costSaved: Math.round(costSaved),
      productivityGain: Math.round((totalAnnualBenefit / inputs.currentCost) * 100),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10
    });
  };

  const handleInputChange = (field, value) => {
    setInputs({
      ...inputs,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center"
        >
          <TrendingUp className="w-10 h-10 text-green-400" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">ROI Calculator</h2>
        <p className="text-muted-foreground text-lg">
          Calculate your return on investment
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Current Situation</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Annual Operating Cost
              </label>
              <input
                type="number"
                value={inputs.currentCost}
                onChange={(e) => handleInputChange('currentCost', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total annual cost for current processes
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Hours Spent Weekly
              </label>
              <input
                type="number"
                value={inputs.currentTime}
                onChange={(e) => handleInputChange('currentTime', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Time spent on manual processes per week
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Team Size
              </label>
              <input
                type="number"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Number of people affected by automation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Error Rate (%)
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={inputs.errorRate}
                onChange={(e) => handleInputChange('errorRate', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span className="font-semibold text-foreground">{inputs.errorRate}%</span>
                <span>50%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">ROI (1 Year)</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <motion.div
              key={results.roi}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-green-400"
            >
              +{results.roi}%
            </motion.div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Annual Cost Savings</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <motion.div
              key={results.costSaved}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-primary"
            >
              ${results.costSaved.toLocaleString()}
            </motion.div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Time Saved Weekly</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <motion.div
              key={results.timeSaved}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-primary"
            >
              {results.timeSaved} hours
            </motion.div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Payback Period</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <motion.div
              key={results.paybackMonths}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-primary"
            >
              {results.paybackMonths} months
            </motion.div>
          </Card>

          <Card className="p-6 bg-muted/20">
            <h4 className="font-semibold mb-3">Investment Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial Investment:</span>
                <span className="font-medium">${investmentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Benefits:</span>
                <span className="font-medium text-green-400">
                  ${(results.costSaved).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold">Net Benefit (Year 1):</span>
                <span className="font-bold text-green-400">
                  ${(results.costSaved - investmentCost).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
