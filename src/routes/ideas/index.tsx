import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchIdeas } from '@/api/ideas'
import IdeaCard from '@/components/IdeaCard'
import { Lightbulb, Grid, Sparkles, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const ideasQueryOptions = () => queryOptions({
  queryKey: ['ideas'],
  queryFn: () => fetchIdeas(),
})

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'IdeaDrop - Browse Brilliant Ideas',
      },
    ],
  }),
  component: IdeasPage,
  loader: async({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideasQueryOptions())
  }
})

function IdeasPage() {
  const {data: ideas} = useSuspenseQuery(ideasQueryOptions())
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter ideas based on search term
  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (idea.tags && idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  return (
    <div className='min-h-screen py-12 px-6'>
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Lightbulb className="w-12 h-12 text-yellow-300 animate-sparkle" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Brilliant Ideas
            </h1>
            <Sparkles className="w-12 h-12 text-pink-300 animate-sparkle" />
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover innovative concepts, creative solutions, and groundbreaking ideas from our community of visionaries
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="glass-effect p-6 rounded-2xl mb-12 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ideas, tags, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-dark rounded-xl border border-white/20 text-white placeholder-white/60 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/70">
                <Grid className="w-5 h-5" />
                <span className="font-medium">{filteredIdeas.length} Ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIdeas.map((idea, index) => (
              <div 
                key={idea._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IdeaCard idea={idea} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-effect p-12 rounded-3xl max-w-md mx-auto">
              <div className="mb-6">
                <Search className="w-16 h-16 text-white/50 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Ideas Found</h3>
              <p className="text-white/70 mb-6">
                We couldn't find any ideas matching "{searchTerm}". Try adjusting your search terms.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="gradient-accent text-white font-semibold px-6 py-3 rounded-full hover-lift transition-all"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{ideas.length}</div>
                <div className="text-white/70">Total Ideas</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/70">Possibilities</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">💡</div>
                <div className="text-white/70">Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
