
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">StackIt</h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Welcome back!' : 'Join our community'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  isLogin 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  !isLogin 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.name ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.password ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>{' '}
              and <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>

        {/* Team Credit */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">Built with ❤️ by <span className="font-semibold gradient-text">Team CodeFusion</span></p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
