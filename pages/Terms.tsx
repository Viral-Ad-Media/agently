
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Legal</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-none">Terms of Service.</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Please read these terms carefully before using Agently.
          </p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed">
          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">1. Acceptance of Terms</h2>
            <p>By accessing or using Agently, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Agently's website for personal, non-commercial transitory viewing only.</p>
            <ul className="list-disc pl-6 space-y-4 text-slate-500 font-medium">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on Agently's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">3. Disclaimer</h2>
            <p>The materials on Agently's website are provided on an 'as is' basis. Agently makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">4. Limitations</h2>
            <p>In no event shall Agently or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Agently's website, even if Agently or an Agently authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">5. Accuracy of Materials</h2>
            <p>The materials appearing on Agently's website could include technical, typographical, or photographic errors. Agently does not warrant that any of the materials on its website are accurate, complete or current. Agently may make changes to the materials contained on its website at any time without notice.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">6. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
