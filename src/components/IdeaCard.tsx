import type { Idea } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Sparkles, Tag } from 'lucide-react';

const IdeaCard = ({ idea, button = true }: { idea: Idea, button?: boolean }) => {
  return (
    <div className='glass-effect p-6 rounded-2xl shadow-magical hover-lift transition-all duration-300 group border border-white/20'>
      <div className="flex flex-col h-full">
        {/* Header with sparkle */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">
              {idea.title}
            </h2>
            {idea.tags && idea.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-white/60" />
                <div className="flex flex-wrap gap-1">
                  {idea.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 glass-dark rounded-full text-white/80 border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                  {idea.tags.length > 3 && (
                    <span className="text-xs text-white/60">+{idea.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-sparkle ml-2 flex-shrink-0" />
        </div>

        {/* Content */}
        <div className="flex-1 mb-6">
          <p className="text-white/80 leading-relaxed overflow-hidden" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const
          }}>
            {idea.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/60">
            {idea.createdAt && (
              <span>
                {new Date(idea.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>

          <Link 
            to='/ideas/$ideaId' 
            params={{ ideaId: idea._id.toString() }} 
            className={
              button
                ? 'gradient-accent text-white font-semibold px-6 py-3 rounded-full hover-glow shadow-magical transition-all duration-300 flex items-center space-x-2 group-hover:shadow-glow'
                : 'text-yellow-300 hover:text-yellow-200 font-semibold transition-colors flex items-center space-x-1 group-hover:space-x-2'
            }
          >
            {button ? (
              <>
                <Eye className="w-4 h-4" />
                <span>View Idea</span>
              </>
            ) : (
              <>
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 transition-all duration-300" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;