
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/mo',
      desc: 'Perfect for small businesses starting with AI.',
      features: ['100 Call Minutes', 'AI Web Chat', 'Lead Capture CRM', 'Standard Voice Profiles', 'Email Support'],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/mo',
      desc: 'For growing teams with higher call volume.',
      features: ['500 Call Minutes', 'Custom AI Training', 'Appointment Booking', 'Premium Voice Profiles', 'Priority Support', 'CRM Integration'],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Tailored solutions for large organizations.',
      features: ['Unlimited Minutes', 'API Access', 'Dedicated Account Manager', 'Custom Voice Cloning', 'SLA Guarantees', 'On-premise Options'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-inter pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Pricing Plans</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-none">Simple, Transparent <br />Pricing.</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Choose the plan that fits your business needs. No hidden fees, no complex contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-10 rounded-[3rem] bg-white border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${plan.popular ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-slate-200 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{plan.desc}</p>
              </div>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                to="/login" 
                className={`block w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all active:scale-95 ${
                  plan.popular 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3rem] bg-indigo-600 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="max-w-xl">
            <h3 className="text-3xl font-black mb-4 tracking-tight">Need something custom?</h3>
            <p className="text-indigo-100 font-medium leading-relaxed">
              We offer custom plans for high-volume businesses and specialized industries. Contact our team to discuss your requirements.
            </p>
          </div>
          <Link to="/contact" className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
