
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Now in Public Beta</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Your Business, <br />
            <span className="text-indigo-600">Always Answered.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700">
            Agently is the AI-powered receptionist that handles FAQs, captures leads, and books appointments 24/7. Never miss a customer again.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Link to="/login" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-95">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-indigo-600 transition-all active:scale-95">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Trusted by 5,000+ Service Businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ICONS.Robot />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">AI Voice & Chat</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Natural sounding AI that handles both phone calls and web chats with the same intelligence.
              </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ICONS.Users />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Lead CRM</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Automatically capture and organize every lead. Agently qualifies them before they reach your inbox.
              </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ICONS.Dashboard />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Instant Setup</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                No coding required. Agently learns your business by scanning your website in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight">Ready to hire your <br />first AI employee?</h2>
          <Link to="/login" className="inline-block px-12 py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
