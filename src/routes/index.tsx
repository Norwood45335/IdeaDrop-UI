import { createFileRoute } from '@tanstack/react-router'
import { fetchIdeas } from '../api/ideas'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import IdeaCard from '@/components/IdeaCard';
import HeroSection from '@/components/HeroSection';
import { ArrowRight, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const ideasQueryOptions = queryOptions({
  queryKey: ['ideas', { limit: 6 }],
  queryFn: () => fetchIdeas(6),
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(ideasQueryOptions)
})

function HomePage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Latest Ideas Section */}
      <section className="py-16 px-6 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-yellow-300" />
              <h2 className="text-4xl font-bold text-white">Latest Bright Ideas</h2>
              <TrendingUp className="w-8 h-8 text-pink-300" />
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the newest creative sparks from our community of innovators and dreamers
            </p>
          </div>

          {/* Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ideas.map((idea, index) => (
              <div 
                key={idea._id} 
                className="animate-slide-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IdeaCard idea={idea} button={false} />
              </div>
            ))}
          </div>

          {/* View All Ideas Button */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/ideas"
              className="gradient-primary text-white font-bold text-lg px-12 py-4 rounded-full shadow-magical hover-lift hover-glow inline-flex items-center space-x-3 transition-all duration-300"
            >
              <span>Explore All Ideas</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-6 border-t border-white/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-effect p-12 rounded-3xl animate-bounce-in">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-yellow-300 mx-auto animate-sparkle" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Share Your Brilliant Idea?
            </h3>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of creators and innovators. Your next big idea could change the world!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="gradient-warm text-white font-bold text-lg px-8 py-4 rounded-full shadow-magical hover-lift hover-glow transition-all duration-300"
              >
                Join the Community
              </Link>
              <Link
                to="/ideas"
                className="glass-dark text-white font-semibold text-lg px-8 py-4 rounded-full hover-lift hover:bg-white/20 transition-all duration-300"
              >
                Browse Ideas First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
