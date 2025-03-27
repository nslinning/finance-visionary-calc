
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

// The password hash (this is a simple hash, in production you would use a better hashing algorithm)
const CORRECT_PASSWORD_HASH = '8c71f3fbf6ac2b514ba1dcbbf4125d10'; // Hash of "Batactqav9-10A"

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simple hash function (not secure for production)
  const hashPassword = (password: string) => {
    let hash = 0;
    if (password.length === 0) return hash.toString(16);
    
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(16);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate delay to show loading state
    setTimeout(() => {
      const hashedPassword = hashPassword(password);
      
      if (hashedPassword === CORRECT_PASSWORD_HASH) {
        localStorage.setItem('calculator_authorized', 'true');
        navigate('/calculator');
      } else {
        toast({
          title: "Feil passord",
          description: "Passordet du har skrevet inn er ikke riktig.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">SYDERA.IO</h1>
          <p className="mt-2 text-blue-100">Revenue Calculator</p>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              This page is owned and Powered By STÖ
            </h2>
            <p className="mt-2 text-gray-600">Enter password to access the calculator.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-3"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sjekker...' : 'Logg inn'}
            </button>
          </form>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} STÖ. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
