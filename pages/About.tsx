
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Our Mission</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-none">Empowering Small Businesses with AI.</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Agently was founded to level the playing field for service-based businesses. We believe every entrepreneur deserves a world-class receptionist without the overhead of a call center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative p-12 rounded-[4rem] bg-indigo-600 text-white overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h2 className="text-4xl font-black mb-6 tracking-tight leading-tight">We're building the future of customer service.</h2>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed mb-8">
              Our team of AI researchers and product designers is dedicated to creating the most natural, helpful, and efficient AI receptionists on the planet.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">A</div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest">Founded 2024</p>
                <p className="text-xs text-indigo-200 font-bold">San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Agently Story</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              It started with a simple observation: local service businesses—plumbers, dentists, lawyers—were missing half their calls because they were busy doing the work.
            </p>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              We saw an opportunity to use the latest breakthroughs in Large Language Models to create a solution that doesn't just route calls, but actually understands and helps customers.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-black text-indigo-600 mb-1 tracking-tighter">5k+</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Customers</p>
              </div>
              <div>
                <p className="text-4xl font-black text-indigo-600 mb-1 tracking-tighter">1M+</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Calls Handled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Join the Revolution</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
            We're always looking for talented individuals to join our mission. If you're passionate about AI and small business, we'd love to hear from you.
          </p>
          <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all active:scale-95">
            View Open Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
