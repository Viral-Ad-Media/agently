
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Features: React.FC = () => {
  const features = [
    {
      title: '24/7 Intelligent Support',
      desc: 'Never miss a call or chat. Agently is always on, providing personalized support that goes beyond simple routing.',
      icon: <ICONS.Dashboard />,
      accentClass: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Automated Basics',
      desc: 'Handle FAQs and routine inquiries automatically, freeing up your team for more complex tasks.',
      icon: <ICONS.Robot />,
      accentClass: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Seamless Handoffs',
      desc: 'When a human touch is needed, Agently transitions the conversation smoothly to your team with full context.',
      icon: <ICONS.Users />,
      accentClass: 'bg-violet-50 text-violet-600'
    },
    {
      title: 'No-Code Setup',
      desc: 'Get started in minutes. Our AI scans your website to learn your business—no coding or complex scripting required.',
      icon: <ICONS.Settings />,
      accentClass: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Brand-Consistent Voice',
      desc: 'Choose a voice and tone that matches your brand. Agently sounds like a natural extension of your business.',
      icon: <ICONS.Phone />,
      accentClass: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Multi-language Support',
      desc: 'Break down language barriers. Agently can communicate with your customers in their preferred language.',
      icon: <ICONS.Shield />,
      accentClass: 'bg-sky-50 text-sky-600'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Platform Capabilities</h2>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Meet your 24/7 AI Receptionist</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Agently delivers intelligent phone and chat support that works for your business, handles the basics automatically, and scales with your team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 ${feature.accentClass}`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black mb-6 tracking-tight">Ready to transform your customer experience?</h2>
            <p className="text-indigo-100 text-lg font-medium mb-8">
              Join thousands of small businesses using Agently to provide world-class support without the overhead of a traditional call center.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all">
                Get Started Free
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                Book a Demo
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-indigo-500/10 rounded-[2rem] border border-white/10 flex items-center justify-center">
             <div className="text-8xl animate-pulse">🤖</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
