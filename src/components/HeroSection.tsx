import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import FloatingBrain from './FloatingBrain';
import { useAuth } from '@/context/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '0s' }}>
          <Star className="w-8 h-8 text-yellow-300" />
        </div>
        <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Zap className="w-6 h-6 text-pink-300" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-10 h-10 text-blue-300" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
          <Star className="w-7 h-7 text-purple-300" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8 animate-bounce-in">
          {/* Floating Brain Hero */}
          <div className="flex justify-center mb-8">
            <FloatingBrain size="lg" className="animate-bounce-in" />
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Drop Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent animate-sparkle">
                Brightest Ideas
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium">
              Transform your creative sparks into reality. Share, discover, and build upon the most innovative ideas from creators worldwide.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="gradient-warm text-white font-bold text-lg px-8 py-4 rounded-full shadow-magical hover-lift hover-glow flex items-center space-x-3 transition-all duration-300"
                >
                  <span>Start Creating</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/ideas"
                  className="glass-effect text-white font-semibold text-lg px-8 py-4 rounded-full hover-lift hover:bg-white/30 flex items-center space-x-3 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Explore Ideas</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/ideas/new"
                  className="gradient-warm text-white font-bold text-lg px-8 py-4 rounded-full shadow-magical hover-lift hover-glow flex items-center space-x-3 transition-all duration-300"
                >
                  <span>Share Your Idea</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/ideas"
                  className="glass-effect text-white font-semibold text-lg px-8 py-4 rounded-full hover-lift hover:bg-white/30 flex items-center space-x-3 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Browse Ideas</span>
                </Link>
              </>
            )}
          </div>

          {/* Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="glass-effect p-6 rounded-2xl text-center hover-lift">
              <div className="gradient-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Creative Sparks</h3>
              <p className="text-white/70">Share your most innovative ideas and get feedback from the community</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl text-center hover-lift">
              <div className="gradient-secondary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Discover Gems</h3>
              <p className="text-white/70">Explore brilliant ideas from creators and entrepreneurs worldwide</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl text-center hover-lift">
              <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Build Together</h3>
              <p className="text-white/70">Collaborate and turn concepts into reality with like-minded innovators</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
