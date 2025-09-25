import { Brain, Sparkles, Lightbulb } from 'lucide-react';

const FloatingBrain = ({ className = '', size = 'lg' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Floating sparkles around the brain */}
      <div className="absolute -top-2 -left-2 animate-sparkle">
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </div>
      <div className="absolute -top-1 -right-3 animate-sparkle" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-3 h-3 text-pink-300" />
      </div>
      <div className="absolute -bottom-2 -left-1 animate-sparkle" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-3 h-3 text-blue-300" />
      </div>
      <div className="absolute -bottom-1 -right-2 animate-sparkle" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-4 h-4 text-purple-300" />
      </div>

      {/* Main floating brain */}
      <div className={`${sizeClasses[size]} animate-float relative`}>
        {/* Brain glow effect */}
        <div className="absolute inset-0 gradient-warm rounded-full opacity-20 blur-md animate-pulse-glow"></div>
        
        {/* Brain icon container */}
        <div className="relative z-10 w-full h-full gradient-accent rounded-full flex items-center justify-center shadow-magical">
          <Brain className={`${size === 'lg' ? 'w-16 h-16' : size === 'md' ? 'w-12 h-12' : 'w-8 h-8'} text-white drop-shadow-lg`} />
        </div>

        {/* Lightbulb inside brain for "bright idea" effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Lightbulb className={`${size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3'} text-yellow-200 animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

export default FloatingBrain;
