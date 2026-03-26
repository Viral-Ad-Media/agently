
import React, { useState } from 'react';
import { api } from '../services/api';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.submitContact(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      window.setTimeout(() => setSent(false), 5000);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Contact Us</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-none">Get in Touch.</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Have questions about Agently? Our team is here to help you get started or answer any technical inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            {sent ? (
              <div className="text-center py-20 animate-in fade-in zoom-in">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Message Sent!</h3>
                <p className="text-slate-500 font-medium leading-relaxed">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows={6}
                    required
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium resize-none"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">Direct Support</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">@</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-70">Email Us</p>
                    <p className="text-lg font-black tracking-tight">hello@agently.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">#</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-70">Call Us</p>
                    <p className="text-lg font-black tracking-tight">+1 (415) 555-0123</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Office Location</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                123 AI Boulevard, Suite 456 <br />
                San Francisco, CA 94103 <br />
                United States
              </p>
              <div className="w-full h-48 bg-slate-100 rounded-3xl overflow-hidden grayscale">
                <img src="https://picsum.photos/seed/sf/800/400" alt="Map" className="w-full h-full object-cover opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
