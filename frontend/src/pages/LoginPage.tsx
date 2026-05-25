import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';
import { authApi } from '../api';
import { Clock } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAppStore();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = isLogin
        ? await authApi.login({ email, password })
        : await authApi.register({ email, password, name });

      setAuth(res.user, res.token);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-xl shadow-accent-500/25 mb-4">
            <Clock size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            TimeLedger
          </h1>
          <p className="text-dark-300 text-sm mt-1">
            Track your shifts, manage your earnings
          </p>
        </div>

        {/* Form card */}
        <div className="glass-card p-6 sm:p-8">
          {/* Toggle tabs */}
          <div className="flex gap-1 p-1 bg-dark-700 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                isLogin
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                id="login-name"
              />
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              id="login-email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              id="login-password"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-dark-400 mt-6">
          Manage shifts · Track earnings · Stay organized
        </p>
      </div>
    </div>
  );
}
