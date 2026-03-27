import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const SIGNALS = [
  { label: 'Calls answered', value: '96%', detail: 'Average coverage after setup' },
  { label: 'Lead capture lift', value: '2.3x', detail: 'Compared with voicemail-only workflows' },
  { label: 'Setup time', value: '< 15m', detail: 'Website import and first agent live' },
];

const INDUSTRIES = ['Dental', 'Legal', 'Home Services', 'Real Estate', 'Clinics', 'Agencies'];

const Home: React.FC = () => {
  return (
    <div className="pb-16 pt-8 sm:pt-10">
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="pt-12 lg:pt-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-[0_0_0_6px_rgba(255,153,0,0.14)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">Voice + Chat + CRM</span>
            </div>

            <h1 className="font-display mt-8 max-w-4xl text-5xl leading-[0.95] text-slate-900 sm:text-6xl lg:text-7xl">
              Reception software that feels like an operating system, not a widget.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 sm:text-xl">
              Agently gives every business its own voice agents, website chatbots, lead capture, and call intelligence in one clean workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-full bg-slate-950 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="rounded-full border border-slate-200 bg-white/85 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-700 shadow-sm transition hover:border-amber-200 hover:text-indigo-600"
              >
                Explore Pricing
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {SIGNALS.map((item) => (
                <div key={item.label} className="rounded-[1.8rem] border border-white/70 bg-white/82 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                  <p className="mt-3 font-display text-3xl text-slate-900">{item.value}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pt-12">
            <div className="absolute inset-x-8 top-8 h-52 rounded-full bg-indigo-600/12 blur-3xl" />
            <div className="relative space-y-5 rounded-[2.5rem] border border-white/70 bg-white/88 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Control Room</p>
                  <h2 className="font-display mt-2 text-2xl text-slate-900">Always-on coverage</h2>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                  4 agents online
                </span>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.2)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">Voice Agent</p>
                    <p className="mt-2 text-xl font-black">BrightPath Front Desk</p>
                    <p className="mt-2 text-sm font-medium text-white/65">Inbound line answering, lead qualification, and appointment routing.</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <ICONS.Phone />
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Today</p>
                    <p className="mt-2 text-2xl font-black">84 calls</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Captured</p>
                    <p className="mt-2 text-2xl font-black">27 leads</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <ICONS.MessageSquare />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Chatbot Agent</p>
                      <p className="text-sm font-black text-slate-900">Embeddable on any site</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                    Use different chatbots for the homepage, pricing, and support pages while sharing the right voice logic behind each one.
                  </p>
                </div>

                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <ICONS.Users />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Lead Workspace</p>
                      <p className="text-sm font-black text-slate-900">Captured automatically</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                    Every conversation turns into structured CRM data your team can review, update, and export without duct-taping tools together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/70 bg-white/78 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">Built for real operators</p>
              <h2 className="font-display mt-2 text-2xl text-slate-900">Designed for teams that run on conversations</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((industry) => (
                <span key={industry} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-600">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-indigo-500">Why teams switch</p>
            <h2 className="font-display mt-3 text-4xl text-slate-900">A sharper UI for a sharper workflow</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              One workspace to manage voice agents, chatbots, Twilio credentials, training data, and every captured conversation.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2.5rem] border border-white/70 bg-white/82 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-xl">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                    <ICONS.Robot />
                  </div>
                  <h3 className="font-display mt-5 text-2xl text-slate-900">Multiple voice agents</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                    Launch inbound and outbound voice agents with separate numbers, rules, knowledge, and call handling behavior.
                  </p>
                </div>

                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <ICONS.MessageSquare />
                  </div>
                  <h3 className="font-display mt-5 text-2xl text-slate-900">Custom chatbots</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                    Style, train, and embed separate chatbot agents for different campaigns, websites, and funnels.
                  </p>
                </div>

                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white">
                    <ICONS.Dashboard />
                  </div>
                  <h3 className="font-display mt-5 text-2xl text-slate-900">Clean operational UI</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                    Review performance, knowledge, billing, leads, and call logs without jumping across disconnected screens.
                  </p>
                </div>

                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/80 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <ICONS.Sparkles />
                  </div>
                  <h3 className="font-display mt-5 text-2xl text-slate-900">Website-trained answers</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                    Import public site content into your knowledge base, then refine entries directly from the dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.24)]">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/45">Deployment Flow</p>
              <h3 className="font-display mt-3 text-3xl">From website to live receptionist in one session.</h3>

              <div className="mt-8 space-y-4">
                {[
                  'Import your public website and generate the first knowledge base.',
                  'Create one or more voice agents with their own Twilio lines.',
                  'Customize chatbots, copy the embed script, and deploy anywhere.',
                  'Review leads, transcripts, and conversion activity from the same workspace.',
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-display text-lg">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/72">{step}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/login"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-900 transition hover:bg-amber-50"
              >
                Build Your Workspace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
