import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    const result =
      mode === 'signup'
        ? await signUp(email, password, displayName || 'Explorer')
        : await signIn(email, password);

    if (result.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent)' }} />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-float"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <Sparkles size={32} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            Leela
          </h1>
          <p className="text-sm mt-1 text-muted">Play the Past. Learn the Living.</p>
          <p className="text-xs mt-2 text-muted opacity-60">by Varahi's Heritage Arcade</p>
        </div>

        {/* Auth card */}
        <div className="surface p-8 ornament-border">
          {/* Mode toggle */}
          <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: 'var(--color-surface-alt)' }}>
            <button
              onClick={() => setMode('signup')}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                mode === 'signup'
                  ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
                  : { color: 'var(--color-text-muted)' }
              }
            >
              Create Account
            </button>
            <button
              onClick={() => setMode('signin')}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                mode === 'signin'
                  ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
                  : { color: 'var(--color-text-muted)' }
              }
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted">Display Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="What should Mitra call you?"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg text-sm animate-fade-in"
                style={{ background: 'var(--color-accent-soft)', color: 'var(--color-error)' }}>
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                mode === 'signup' ? 'Begin Your Journey' : 'Enter Leela'
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6 text-muted">
            {mode === 'signup'
              ? 'Mitra, your AI guide, is waiting to meet you.'
              : 'Welcome back to the world of Leela.'}
          </p>
        </div>
      </div>
    </div>
  );
}
