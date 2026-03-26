
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Legal</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-none">Privacy Policy.</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Your privacy is important to us. It is Agently's policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed">
          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">1. Information We Collect</h2>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">2. Use of Information</h2>
            <p>We use your personal information to provide and improve our services, to communicate with you, and to comply with legal obligations. We may also use your information to personalize your experience and to send you promotional communications.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">3. Data Retention</h2>
            <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">4. Third-Party Sharing</h2>
            <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">5. Cookies</h2>
            <p>Our website uses cookies to enhance your experience. You can choose to disable cookies in your browser settings, but this may affect the functionality of our website.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can also object to the processing of your information and request that we restrict the processing of your information.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">7. Contact Us</h2>
            <p>If you have any questions about our Privacy Policy, please contact us at privacy@agently.ai.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
