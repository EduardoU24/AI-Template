import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Github, Chrome } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { MockSession } from '../../../data/_mockup.session';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    MockSession.setSession('u_1'); // Set mock session
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
           <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20">
              <Terminal className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400 mt-2">Sign in to OpenDND Framework</p>
        </div>

        <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Email" type="email" placeholder="admin@opendnd.dev" required />
            <Input label="Password" type="password" placeholder="••••••••" required />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-brand-500 focus:ring-brand-500" />
                Remember me
              </label>
              <a href="#" className="text-brand-400 hover:text-brand-300">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full h-11" isLoading={isLoading}>
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" className="w-full">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </Button>
              <Button variant="secondary" className="w-full">
                <Chrome className="w-4 h-4 mr-2" /> Google
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center mt-6 text-sm text-slate-500">
          Don't have an account? <a href="#" className="text-brand-400 hover:text-brand-300">Contact Sales</a>
        </p>
      </div>
    </div>
  );
}