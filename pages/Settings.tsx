import React, { useEffect, useState } from 'react';
import { Organization } from '../types';

interface SettingsProps {
  org: Organization;
  onSave: (settings: { timezone: string; phoneNumber: string }) => Promise<void>;
}

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
];

const Settings: React.FC<SettingsProps> = ({ org, onSave }) => {
  const [timezone, setTimezone] = useState(org.profile.timezone);
  const [phoneNumber, setPhoneNumber] = useState(org.phoneNumber);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimezone(org.profile.timezone);
    setPhoneNumber(org.phoneNumber);
  }, [org.profile.timezone, org.phoneNumber]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await onSave({ timezone, phoneNumber });
      setMessage('Organization settings updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-black mb-2">Organization Settings</h2>
      <p className="text-slate-500 mb-8">Manage global settings for {org.profile.name}.</p>

      {message && (
        <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Organization Name</label>
          <input type="text" value={org.profile.name} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium bg-slate-50" disabled />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Timezone</label>
          <select value={timezone} onChange={event => setTimezone(event.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500">
            {[timezone, ...TIMEZONES.filter(value => value !== timezone)].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1">Primary Phone Number</label>
          <input value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" disabled={saving} className="rounded-2xl bg-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
