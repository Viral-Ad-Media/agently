
import React, { useState } from 'react';
import { Organization } from '../types';

interface BillingProps {
  org: Organization;
  onUpdatePlan: (plan: 'Starter' | 'Pro') => Promise<void>;
  onCancelPlan: () => Promise<void>;
  onDownloadInvoice: (invoiceId: string) => Promise<void>;
  onContactSales: () => Promise<void>;
}

const Billing: React.FC<BillingProps> = ({ org, onUpdatePlan, onCancelPlan, onDownloadInvoice, onContactSales }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { usage, plan, status, currentPeriodEnd } = org.subscription;

  const handleUpdatePlan = async (newPlan: 'Starter' | 'Pro') => {
    setLoading(true);
    setError('');

    try {
      await onUpdatePlan(newPlan);
    } catch (planError) {
      setError(planError instanceof Error ? planError.message : 'Unable to update plan.');
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (action: () => Promise<void>) => {
    setLoading(true);
    setError('');

    try {
      await action();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Unable to complete that billing action.');
    } finally {
      setLoading(false);
    }
  };

  const usagePercent = usage.minuteLimit > 0 ? Math.min(100, (usage.minutes / usage.minuteLimit) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Info */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
               <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase tracking-wider">{status}</span>
             </div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Current Plan</h3>
             <h2 className="text-4xl font-black text-slate-900 mb-2">{plan} <span className="text-lg font-medium text-slate-400">Plan</span></h2>
             <p className="text-slate-500 mb-8">Next billing date: <strong>{new Date(currentPeriodEnd).toLocaleDateString()}</strong></p>

             <div className="space-y-6">
                <div>
                   <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Minute Usage</p>
                        <p className="text-xs text-slate-500">{usage.minutes} / {usage.minuteLimit} minutes used</p>
                      </div>
                      <p className="text-sm font-black text-indigo-600">{usagePercent.toFixed(0)}%</p>
                   </div>
                   <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${usagePercent > 90 ? 'bg-red-500' : 'bg-indigo-600'}`}
                        style={{ width: `${usagePercent}%` }}
                      ></div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                   <button onClick={() => void handleUpdatePlan(plan === 'Pro' ? 'Starter' : 'Pro')} className="py-3 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm">
                      {plan === 'Pro' ? 'Switch to Starter' : 'Upgrade to Pro'}
                   </button>
                   <button onClick={() => void runAction(onCancelPlan)} className="py-3 px-4 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
                      Cancel Plan
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold">Billing History</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                      <tr>
                         <th className="px-6 py-4">Invoice ID</th>
                         <th className="px-6 py-4">Date</th>
                         <th className="px-6 py-4">Amount</th>
                         <th className="px-6 py-4">Status</th>
                         <th className="px-6 py-4 text-right">Receipt</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {org.invoices.map(invoice => (
                        <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-mono text-sm">{invoice.id}</td>
                           <td className="px-6 py-4 text-sm">{new Date(invoice.date).toLocaleDateString()}</td>
                           <td className="px-6 py-4 text-sm font-bold">${invoice.amount.toFixed(2)}</td>
                           <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase">{invoice.status}</span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button onClick={() => void runAction(() => onDownloadInvoice(invoice.id))} className="text-indigo-600 hover:text-indigo-800">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Upgrade Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl">
             <h3 className="text-xl font-bold mb-4">Upgrade to Pro</h3>
             <ul className="space-y-3 mb-8">
                {[
                  '500 monthly calls',
                  '2,500 minutes included',
                  'Multiple AI agents',
                  'Custom voice cloning',
                  'Priority human escalation'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {feature}
                  </li>
                ))}
             </ul>
             <button 
                disabled={loading || plan === 'Pro'}
                onClick={() => handleUpdatePlan('Pro')}
                className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
             >
                {loading ? <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : (plan === 'Pro' ? 'Current Plan' : 'Go Pro for $99/mo')}
             </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h4 className="font-bold mb-2">Need a Custom Plan?</h4>
             <p className="text-sm text-slate-500 mb-4">For high-volume centers, we offer enterprise pricing and dedicated support.</p>
             <button onClick={() => void runAction(onContactSales)} className="text-indigo-600 text-sm font-bold hover:underline">Contact Sales →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
