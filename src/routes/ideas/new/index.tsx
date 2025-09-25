import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createIdea } from '@/api/ideas'
import { Lightbulb, Plus, Tag, FileText, Type, Sparkles, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import FloatingBrain from '@/components/FloatingBrain'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const {mutateAsync, isPending} = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      setSuccessMessage('Your brilliant idea has been shared!')
      setTimeout(() => {
        navigate({to: '/ideas'})
      }, 1500)
    },
    onError: (err: any) => {
      setError(err.message || 'Something went wrong while creating your idea')
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!title.trim() || !summary.trim() || !description.trim()) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ''),
      })
    } catch (error) {
      console.error('Failed to create idea:', error)
    }
  }

  return (
    <div className='min-h-screen py-12 px-6'>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/ideas" 
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Ideas</span>
          </Link>
          
          <div className="text-center animate-bounce-in">
            <div className="flex justify-center mb-6">
              <FloatingBrain size="md" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent mb-4">
              Share Your Bright Idea
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transform your creative spark into something amazing. Share your vision with the world!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-effect p-8 rounded-3xl shadow-magical animate-slide-up">
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="glass-dark border border-green-400/30 text-green-200 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="glass-dark border border-red-400/30 text-red-200 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor='title' className='flex items-center space-x-2 text-white font-semibold mb-3'>
                <Type className="w-5 h-5" />
                <span>Idea Title *</span>
              </label>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-6 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all text-lg'
                placeholder='What would you call your brilliant idea?'
                required
              />
            </div>

            {/* Summary field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor='summary' className='flex items-center space-x-2 text-white font-semibold mb-3'>
                <Lightbulb className="w-5 h-5" />
                <span>Quick Summary *</span>
              </label>
              <input
                id='summary'
                type='text'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className='w-full px-6 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all text-lg'
                placeholder='Describe your idea in one compelling sentence'
                required
              />
            </div>

            {/* Description field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <label htmlFor='body' className='flex items-center space-x-2 text-white font-semibold mb-3'>
                <FileText className="w-5 h-5" />
                <span>Detailed Description *</span>
              </label>
              <textarea
                id='body'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className='w-full px-6 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all text-lg resize-none'
                placeholder='Tell us more about your idea. What problem does it solve? How would it work? What makes it special?'
                required
              />
              <p className="text-white/60 text-sm mt-2">
                {description.length}/500 characters (optional limit for better readability)
              </p>
            </div>

            {/* Tags field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <label htmlFor='tags' className='flex items-center space-x-2 text-white font-semibold mb-3'>
                <Tag className="w-5 h-5" />
                <span>Tags (Optional)</span>
              </label>
              <input
                id='tags'
                type='text'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className='w-full px-6 py-4 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all text-lg'
                placeholder='startup, tech, mobile, ai, social (comma separated)'
              />
              <p className="text-white/60 text-sm mt-2">
                Add relevant tags to help others discover your idea
              </p>
            </div>

            {/* Submit button */}
            <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <button
                type='submit'
                disabled={isPending || !!successMessage}
                className='w-full gradient-warm text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-magical hover-lift hover-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3'
              >
                {isPending ? (
                  <>
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Creating Your Idea...</span>
                  </>
                ) : successMessage ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Idea Created!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    <span>Share My Brilliant Idea</span>
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-12 glass-effect p-8 rounded-2xl animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span>Tips for a Great Idea Post</span>
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="gradient-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Type className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Catchy Title</h4>
              <p className="text-white/70 text-sm">Make it memorable and descriptive</p>
            </div>
            <div className="text-center">
              <div className="gradient-secondary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Clear Description</h4>
              <p className="text-white/70 text-sm">Explain the problem and your solution</p>
            </div>
            <div className="text-center">
              <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Relevant Tags</h4>
              <p className="text-white/70 text-sm">Help others find your idea easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}