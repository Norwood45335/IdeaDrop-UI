//When using the Loader, data is ready on mount
//the query config can be defined in a type safe reusable way with queryOptions
//useSuspenseQuery will suspend the response until the component finishes loading
//TanStack Query offers caching and background fetching

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { fetchIdea, deleteIdea } from '@/api/ideas'
import { useAuth } from '@/context/AuthContext'
import { ArrowLeft, Calendar, Tag, Edit, Trash2, User, Sparkles, AlertTriangle, Eye } from 'lucide-react'
import FloatingBrain from '@/components/FloatingBrain'

const ideaQueryOptions = (ideaId:string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
}) 

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({params, context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaDetailsPage() {
  const {ideaId} = Route.useParams()
  const {data:idea} = useSuspenseQuery(ideaQueryOptions(ideaId))
  const navigate = useNavigate()
  const {user} = useAuth()

  const { mutateAsync:deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({to: '/ideas'})
    }
  })

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this brilliant idea? This action cannot be undone!')
    if(confirmDelete){
      await deleteMutate()
    }
  }

  const isOwner = user && user.id === idea.user;
  
  return (
    <div className='min-h-screen py-12 px-6'>
      <div className="container mx-auto max-w-4xl">
        {/* Back Navigation */}
        <Link 
          to='/ideas' 
          className='inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-8 animate-slide-up'
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Ideas</span>
        </Link>

        {/* Main Content */}
        <div className="glass-effect p-8 rounded-3xl shadow-magical animate-bounce-in">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="gradient-accent p-3 rounded-2xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    {idea.title}
                  </h1>
                  {idea.createdAt && (
                    <div className="flex items-center space-x-2 text-white/60 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Created {new Date(idea.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-yellow-300 animate-sparkle flex-shrink-0" />
          </div>

          {/* Summary */}
          {idea.summary && (
            <div className="glass-dark p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                <div className="w-3 h-3 gradient-secondary rounded-full"></div>
                <span>Quick Overview</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {idea.summary}
              </p>
            </div>
          )}

          {/* Tags */}
          {idea.tags && idea.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 glass-dark rounded-full text-white/80 border border-white/20 hover:border-yellow-300 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <div className="w-4 h-4 gradient-warm rounded-full"></div>
              <span>The Big Picture</span>
            </h2>
            <div className="glass-dark p-6 rounded-2xl">
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
                {idea.description}
              </p>
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="border-t border-white/20 pt-8">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-white/70" />
                <span className="text-white/70 font-medium">You own this idea</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to='/ideas/$ideaId/edit' 
                  params={{ideaId}} 
                  className='gradient-accent text-white font-semibold px-6 py-3 rounded-xl hover-lift hover-glow transition-all duration-300 shadow-magical flex items-center justify-center space-x-2'
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Idea</span>
                </Link>
                
                <button 
                  onClick={handleDelete}
                  disabled={isPending} 
                  className="glass-dark border border-red-400/30 text-red-200 font-semibold px-6 py-3 rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isPending ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-red-200 border-t-transparent rounded-full"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Delete Idea</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Not Owner Message */}
          {!isOwner && (
            <div className="border-t border-white/20 pt-8">
              <div className="glass-dark p-6 rounded-2xl text-center">
                <FloatingBrain size="sm" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Love this idea?</h3>
                <p className="text-white/70 mb-4">
                  Get inspired and create your own brilliant ideas to share with the community!
                </p>
                <Link
                  to="/ideas/new"
                  className="gradient-warm text-white font-semibold px-6 py-3 rounded-xl hover-lift hover-glow transition-all duration-300 shadow-magical inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Share Your Idea</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
