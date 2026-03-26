
import React, { useState } from 'react';
import { Lead } from '../types';

interface LeadsProps {
  leads: Lead[];
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => Promise<void>;
  onCreateLead: (payload: Pick<Lead, 'name' | 'email' | 'phone' | 'reason'>) => Promise<void>;
  onExport: () => Promise<void>;
}

const Leads: React.FC<LeadsProps> = ({ leads, onUpdateLead, onCreateLead, onExport }) => {
  const [showAddLead, setShowAddLead] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '' });

  const toggleStatus = async (lead: Lead) => {
    const nextStatus = lead.status === 'new' ? 'contacted' : 'closed';

    setSaving(true);
    setError('');

    try {
      await onUpdateLead(lead.id, { status: nextStatus });
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Unable to update lead.');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateLead = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      await onCreateLead(form);
      setForm({ name: '', email: '', phone: '', reason: '' });
      setShowAddLead(false);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Unable to create lead.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    setError('');

    try {
      await onExport();
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : 'Unable to export leads.');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Lead Management</h2>
            <p className="text-sm text-slate-500">Track and follow up with potential customers captured by your agent.</p>
          </div>
          <div className="flex gap-2">
             <button onClick={() => void handleExport()} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">Export CSV</button>
             <button onClick={() => setShowAddLead(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md">+ Add Lead</button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Lead Info</th>
                <th className="px-6 py-4">Inquiry Detail</th>
                <th className="px-6 py-4">Captured</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No leads captured yet. Try the Call Simulator!
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{lead.name}</p>
                          <p className="text-xs text-slate-500">{lead.phone} • {lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-md truncate bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                        {lead.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-600' : 
                        lead.status === 'contacted' ? 'bg-amber-50 text-amber-600' : 
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => void toggleStatus(lead)}
                        disabled={saving}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 opacity-0 group-hover:opacity-100 transition-all"
                       >
                         Change Status
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddLead && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
            <h3 className="mb-6 text-xl font-bold text-slate-900">Add Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <input required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="Lead name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              <input required value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone number" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              <input value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} placeholder="Email address" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              <textarea required rows={4} value={form.reason} onChange={e => setForm(prev => ({ ...prev, reason: e.target.value }))} placeholder="Inquiry reason" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setShowAddLead(false)} className="flex-1 rounded-xl bg-slate-100 py-3 font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-indigo-600 py-3 font-bold text-white disabled:opacity-50">{saving ? 'Saving...' : 'Create Lead'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
