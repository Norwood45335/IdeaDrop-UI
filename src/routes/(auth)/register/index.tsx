import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { User, Mail, Lock, UserPlus, Sparkles, AlertCircle, Star } from 'lucide-react'
import FloatingBrain from '@/components/FloatingBrain'

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const {setAccessToken, setUser} = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {mutateAsync, isPending} = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigate({to: '/ideas'})
    },
    onError: (err: any) => {
      setError(err.message)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await mutateAsync({name, email, password})
    }catch(err: any){
      console.log(err.message)
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-6'>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 animate-float" style={{ animationDelay: '0s' }}>
          <Star className="w-8 h-8 text-yellow-300" />
        </div>
        <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-10 h-10 text-pink-300" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="flex justify-center mb-6">
            <FloatingBrain size="md" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent mb-3">
            Join the Community!
          </h1>
          <p className="text-white/80 text-lg">
            Start sharing your brilliant ideas with the world
          </p>
        </div>

        {/* Register Form */}
        <div className="glass-effect p-8 rounded-3xl shadow-magical animate-slide-up">
          {error && (
            <div className="glass-dark border border-red-400/30 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-white font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all" 
                  placeholder='Enter your full name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  autoComplete='off' 
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all" 
                  placeholder='Enter your email address' 
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
                  placeholder='Create a secure password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete='off' 
                  required
                  minLength={6}
                />
              </div>
              <p className="text-white/60 text-sm mt-1">Password must be at least 6 characters long</p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full gradient-warm text-white font-bold py-4 rounded-xl shadow-magical hover-lift hover-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2" 
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Already have an account?{' '}
              <Link 
                to='/login' 
                className='text-yellow-300 hover:text-yellow-200 font-semibold transition-colors inline-flex items-center space-x-1'
              >
                <span>Sign In</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 glass-effect p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-white font-bold text-center mb-4">Why Join IdeaDrop?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-6 h-6 gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span>Share your creative ideas with a global community</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-6 h-6 gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span>Get feedback and collaborate with like-minded innovators</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-white" />
              </div>
              <span>Build your portfolio of creative projects and concepts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
