
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (payload: { name: string; companyName: string; email: string; password: string }) => Promise<void>;
  onSendMagicLink: (email: string) => Promise<{ magicLinkToken: string; magicLinkUrl?: string | null }>;
  onVerifyMagicLink: (token: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, onSendMagicLink, onVerifyMagicLink }) => {
  const location = useLocation();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [method, setMethod] = useState<'password' | 'magic'>('password');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLinkToken, setMagicLinkToken] = useState('');
  const [magicLinkUrl, setMagicLinkUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const attemptedMagicTokenRef = useRef<string | null>(null);

  const verifyMagicLink = async (token: string) => {
    setLoading(true);
    setError('');

    try {
      await onVerifyMagicLink(token);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to verify that sign-in link.');
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('magicToken');

    if (!token || attemptedMagicTokenRef.current === token) {
      return;
    }

    attemptedMagicTokenRef.current = token;
    void verifyMagicLink(token);
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (authMode === 'signup') {
        await onRegister({
          name,
          companyName,
          email,
          password,
        });
        return;
      }

      if (method === 'password') {
        await onLogin(email, password);
      } else {
        const response = await onSendMagicLink(email);
        setMagicLinkToken(response.magicLinkToken);
        setMagicLinkUrl(response.magicLinkUrl || '');
        setSent(true);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Agently</h1>
          <p className="text-slate-500 mt-2">Sign in to manage your AI receptionists</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 overflow-hidden relative">
          {sent ? (
            <div className="text-center py-8 animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Sign-In Link Ready</h2>
              <p className="text-slate-500 mb-6">Your secure sign-in link is ready. Continue to your workspace when you are ready.</p>
              {error && (
                <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (magicLinkToken) {
                      void verifyMagicLink(magicLinkToken);
                    }
                  }}
                  disabled={loading || !magicLinkToken}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Continue to Workspace'
                  )}
                </button>
                {magicLinkUrl && (
                  <a
                    href={magicLinkUrl}
                    className="block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-indigo-200 hover:text-indigo-600"
                  >
                    Open Secure Link
                  </a>
                )}
                <button 
                  onClick={() => {
                    setSent(false);
                    setMethod('password');
                    setMagicLinkToken('');
                    setMagicLinkUrl('');
                    setError('');
                  }}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Try another method
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  onClick={() => {
                    setAuthMode('signin');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'signin' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setMethod('password');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'signup' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Create Account
                </button>
              </div>

              {authMode === 'signin' && (
                <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                  <button 
                    onClick={() => setMethod('password')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'password' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                  >
                    Password
                  </button>
                  <button 
                    onClick={() => setMethod('magic')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'magic' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                  >
                    Secure Link
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Bright Path Dental"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                {(authMode === 'signup' || method === 'password') && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm font-bold text-slate-700">Password</label>
                      {authMode === 'signin' && (
                        <button type="button" className="text-xs text-indigo-600 font-bold hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input 
                      type="password" 
                      required={authMode === 'signup' || method === 'password'}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    authMode === 'signup'
                      ? 'Create Account'
                      : method === 'password'
                        ? 'Sign In'
                        : 'Send Magic Link'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-sm">
          {authMode === 'signup' ? (
            <>Already have an account? <button onClick={() => setAuthMode('signin')} className="text-indigo-600 font-bold hover:underline">Sign in</button></>
          ) : (
            <>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-indigo-600 font-bold hover:underline">Create one</button></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
