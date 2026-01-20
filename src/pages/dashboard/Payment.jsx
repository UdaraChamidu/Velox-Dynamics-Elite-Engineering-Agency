import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, CheckCircle, Clock, FileText } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../contexts/DataContext';

const Payment = () => {
  const { pricingPlans } = useData();
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <DashboardNav>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground mb-8">
          Choose a pricing plan and complete your payment
        </p>

        {!selectedPlan ? (
          <>
            {/* Select Plan */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${
                    plan.popular ? 'border-primary glow-md' : ''
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full mb-3">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <span className="w-4 h-4" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full">
                    Select {plan.name}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Payment History Link */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Payment History</h3>
                  <p className="text-sm text-muted-foreground">
                    View all your past transactions and invoices
                  </p>
                </div>
                <Link to="/dashboard/payment/history">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </Link>
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Payment Form */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Order Summary */}
              <Card className="p-6 lg:col-span-1 h-fit">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing</span>
                    <span className="font-medium">Per {selectedPlan.period}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">{selectedPlan.price}</span>
                </div>

                <Button variant="outline" onClick={() => setSelectedPlan(null)} className="w-full">
                  Change Plan
                </Button>
              </Card>

              {/* Stripe Payment Form */}
              <Card className="p-6 lg:col-span-2">
                <h3 className="font-semibold mb-4">Payment Information</h3>

                <div className="space-y-6">
                  {/* Stripe Notice */}
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-400">
                      🔒 <strong>Secure Payment with Stripe</strong>
                      <br />
                      To enable payments, add your Stripe API keys to the <code>.env</code> file:
                      <br />
                      <code className="text-xs">VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...</code>
                    </p>
                  </div>

                  {/* Mock Card Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Information
                    </label>
                    <div className="p-4 border border-border rounded-lg bg-muted/5">
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card number"
                          disabled
                          className="w-full px-3 py-2 bg-background border border-border rounded text-muted-foreground cursor-not-allowed"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            disabled
                            className="px-3 py-2 bg-background border border-border rounded text-muted-foreground cursor-not-allowed"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            disabled
                            className="px-3 py-2 bg-background border border-border rounded text-muted-foreground cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Payment processing is ready. Add Stripe keys to enable live payments.
                    </p>
                  </div>

                  {/* Billing Details */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      disabled
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg cursor-not-allowed text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Billing Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      disabled
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg cursor-not-allowed text-muted-foreground"
                    />
                  </div>

                  {/* Pay Button */}
                  <Button disabled className="w-full" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay {selectedPlan.price} (Stripe Integration Pending)
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By confirming your payment, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardNav>
  );
};

export default Payment;
