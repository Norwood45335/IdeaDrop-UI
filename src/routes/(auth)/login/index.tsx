import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react'
import FloatingBrain from '@/components/FloatingBrain'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const {setAccessToken, setUser} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {mutateAsync, isPending} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigate({to: '/ideas'})
    },
    onError: (err: any) => {
      setError(err.message)
    }
  })

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setError('')
    await mutateAsync({email, password})
  }

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-6'>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="flex justify-center mb-6">
            <FloatingBrain size="md" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent mb-3">
            Welcome Back!
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to continue sharing your brilliant ideas
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-effect p-8 rounded-3xl shadow-magical animate-slide-up">
          {error && (
            <div className="glass-dark border border-red-400/30 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all" 
                  placeholder='Enter your email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete='off' 
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all" 
                  placeholder='Enter your password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete='off' 
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full gradient-accent text-white font-bold py-4 rounded-xl shadow-magical hover-lift hover-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2" 
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link 
                to='/register' 
                className='text-yellow-300 hover:text-yellow-200 font-semibold transition-colors inline-flex items-center space-x-1'
              >
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}