import React, { useEffect, useState } from 'react';
import { Organization } from '../types';

interface SettingsProps {
  org: Organization;
  onSave: (settings: {
    timezone: string;
    phoneNumber: string;
    twilio?: {
      accountSid?: string;
      authToken?: string;
      validateRequests?: boolean;
      clearCredentials?: boolean;
    };
  }) => Promise<void>;
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
  const [timezone, setTimezone] = useState(org.settings.timezone);
  const [phoneNumber, setPhoneNumber] = useState(org.settings.phoneNumber);
  const [twilioAccountSid, setTwilioAccountSid] = useState(org.settings.twilio.accountSid);
  const [twilioAuthToken, setTwilioAuthToken] = useState('');
  const [twilioValidateRequests, setTwilioValidateRequests] = useState(org.settings.twilio.validateRequests);
  const [clearTwilioCredentials, setClearTwilioCredentials] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimezone(org.settings.timezone);
    setPhoneNumber(org.settings.phoneNumber);
    setTwilioAccountSid(org.settings.twilio.accountSid);
    setTwilioAuthToken('');
    setTwilioValidateRequests(org.settings.twilio.validateRequests);
    setClearTwilioCredentials(false);
  }, [
    org.settings.phoneNumber,
    org.settings.timezone,
    org.settings.twilio.accountSid,
    org.settings.twilio.authTokenConfigured,
    org.settings.twilio.validateRequests,
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      if (!clearTwilioCredentials && twilioAuthToken.trim() && !twilioAccountSid.trim()) {
        throw new Error('Enter your Twilio Account SID when saving a new auth token.');
      }

      if (
        !clearTwilioCredentials
        && twilioAccountSid.trim() !== org.settings.twilio.accountSid.trim()
        && org.settings.twilio.authTokenConfigured
        && !twilioAuthToken.trim()
      ) {
        throw new Error('Enter the matching Twilio auth token when you change the Account SID.');
      }

      await onSave({
        timezone,
        phoneNumber,
        twilio: {
          accountSid: twilioAccountSid.trim(),
          ...(twilioAuthToken.trim() ? { authToken: twilioAuthToken.trim() } : {}),
          validateRequests: twilioValidateRequests,
          clearCredentials: clearTwilioCredentials,
        },
      });
      setMessage('Organization settings updated.');
      setTwilioAuthToken('');
      setClearTwilioCredentials(false);
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
        <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Twilio Connection</h3>
              <p className="text-sm text-slate-500">Connect each workspace to its own Twilio account for inbound and outbound voice agents.</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${org.settings.twilio.authTokenConfigured ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-slate-200 bg-white text-slate-500'}`}>
              {org.settings.twilio.authTokenConfigured ? 'Connected' : 'Not Connected'}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Twilio Account SID</label>
              <input
                value={twilioAccountSid}
                onChange={event => {
                  setTwilioAccountSid(event.target.value);
                  setClearTwilioCredentials(false);
                }}
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Twilio Auth Token</label>
              <input
                type="password"
                value={twilioAuthToken}
                onChange={event => {
                  setTwilioAuthToken(event.target.value);
                  setClearTwilioCredentials(false);
                }}
                placeholder={org.settings.twilio.authTokenConfigured ? `Saved token ending in ${org.settings.twilio.authTokenLastFour}` : 'Enter a Twilio auth token'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                {org.settings.twilio.authTokenConfigured
                  ? 'Leave this blank to keep the saved token, or enter a new token to rotate it.'
                  : 'This token is stored server-side and is not sent back to the browser after save.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Webhook Base URL</label>
              <input value={org.settings.twilio.webhookBaseUrl} className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium bg-white text-slate-500" disabled />
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={twilioValidateRequests}
                onChange={event => setTwilioValidateRequests(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                <span className="block text-sm font-bold text-slate-700">Validate Twilio signatures</span>
                <span className="block text-xs text-slate-500">Recommended for production inbound and status webhooks.</span>
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setTwilioAccountSid('');
                setTwilioAuthToken('');
                setClearTwilioCredentials(true);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all hover:border-red-200 hover:text-red-600"
            >
              Disconnect Twilio
            </button>
            {clearTwilioCredentials && (
              <span className="text-xs font-medium text-red-600">Saved Twilio credentials will be removed when you save.</span>
            )}
          </div>
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
