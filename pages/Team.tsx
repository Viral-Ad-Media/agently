
import React, { useState } from 'react';
import { Organization, UserRole } from '../types';

interface TeamProps {
  org: Organization;
  onInvite: (email: string, role: Extract<UserRole, 'Admin' | 'Viewer'>) => Promise<void>;
  onRemoveMember: (id: string) => Promise<void>;
}

const Team: React.FC<TeamProps> = ({ org, onInvite, onRemoveMember }) => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Viewer');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await onInvite(inviteEmail, inviteRole as Extract<UserRole, 'Admin' | 'Viewer'>);
      setInviteEmail('');
      setShowInvite(false);
    } catch (inviteError) {
      setError(inviteError instanceof Error ? inviteError.message : 'Unable to invite teammate.');
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (id: string) => {
    setSaving(true);
    setError('');

    try {
      await onRemoveMember(id);
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Unable to remove teammate.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team Management</h2>
          <p className="text-slate-500">Manage user roles and organization access.</p>
        </div>
        <button 
          onClick={() => setShowInvite(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>
          Invite Member
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {error && (
          <div className="mx-6 mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}
        <table className="w-full text-left">
           <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                 <th className="px-6 py-4">User</th>
                 <th className="px-6 py-4">Email</th>
                 <th className="px-6 py-4">Role</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {org.members.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {user.name[0]}
                         </div>
                         <p className="font-bold text-slate-900">{user.name}</p>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                   <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        user.role === 'Owner' ? 'bg-indigo-100 text-indigo-600' : 
                        user.role === 'Admin' ? 'bg-amber-100 text-amber-600' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      {user.role !== 'Owner' && (
                        <button 
                          onClick={() => void removeMember(user.id)}
                          className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      )}
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>

      {showInvite && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in fade-in">
              <h3 className="text-xl font-bold mb-6">Invite Team Member</h3>
              <form onSubmit={handleInvite} className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="teammate@company.com"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={inviteRole}
                      onChange={e => setInviteRole(e.target.value as UserRole)}
                    >
                       <option value="Admin">Admin</option>
                       <option value="Viewer">Viewer</option>
                    </select>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowInvite(false)}
                      className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600"
                    >
                       Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                    >
                       {saving ? 'Sending...' : 'Send Invite'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Team;
