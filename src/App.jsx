import { useState, useEffect } from 'react';
import { Moon, Sun, Play, Pause, RotateCcw, ChevronDown, Box, Zap, Target } from 'lucide-react';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const [showTrails, setShowTrails] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderTrails = () => {
    if (!showTrails) return null;
    
    return Array.from({ length: 5 }).map((_, index) => (
      <div 
        key={index}
        className={`
          absolute w-20 h-20 
          bg-yellow-500/30 
          rounded-lg
          transition-all duration-[2000ms] ease-in-out
          ${getAnimationClass()}
        `}
        style={{
          borderRadius: animationStep > 0 ? '50%' : '0.5rem',
          transitionDelay: `${index * 100}ms`,
          opacity: 1 - (index * 0.15)
        }}
      />
    ));
  };
  
  const getAnimationClass = () => {
    switch(animationStep) {
      case 0: return 'translate-x-0 translate-y-0 scale-100';
      case 1: return 'translate-x-[250px] rotate-[360deg]';
      case 2: return 'translate-x-[250px] translate-y-[200px] scale-150 rotate-[720deg]';
      case 3: return 'translate-x-[400px] translate-y-[200px] scale-200 rotate-[1080deg]';
      default: return '';
    }
  };

  return (
    <div className={`transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20" 
               style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <h1 className={`text-6xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              style={{ transform: `translateY(${-scrollY * 0.3}px)` }}>
            Interactive Animations
          </h1>
          <p className={`text-xl mb-8 text-center max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
             style={{ transform: `translateY(${-scrollY * 0.2}px)` }}>
            Explore the power of modern web animations with this interactive playground
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
            </button>
          </div>
        </div>

        <ChevronDown 
          className={`absolute bottom-8 animate-bounce ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          size={32}
        />
      </section>

      {/* Animation Section */}
      <section className="min-h-screen py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Control Panel */}
            <div className="flex gap-4 mb-12"
                 style={{ transform: `translateX(${-scrollY * 0.1}px)`, opacity: Math.max(0, 1 - scrollY * 0.002) }}>
              <button 
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg
                  ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                  text-white font-medium transition-colors
                `}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button 
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg
                  ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
                  ${isDarkMode ? 'text-white' : 'text-gray-800'}
                  font-medium transition-colors
                `}
                onClick={() => setAnimationStep(0)}
              >
                <RotateCcw size={20} />
                Reset
              </button>

              <button 
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg
                  ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
                  ${isDarkMode ? 'text-white' : 'text-gray-800'}
                  font-medium transition-colors
                `}
                onClick={() => setShowTrails(!showTrails)}
              >
                {showTrails ? 'Hide' : 'Show'} Trails
              </button>
            </div>

            {/* Animation Container */}
            <div className="relative h-[600px] rounded-xl overflow-hidden border border-gray-700 bg-grid-pattern"
                 style={{ transform: `translateY(${(scrollY - 500) * 0.2}px)` }}>
              {renderTrails()}
              <div 
                className={`
                  relative w-20 h-20 
                  bg-yellow-500
                  rounded-lg
                  transition-all duration-[2000ms] ease-in-out
                  shadow-lg
                  ${getAnimationClass()}
                `}
                style={{
                  borderRadius: animationStep > 0 ? '50%' : '0.5rem'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-16 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Box className="mb-4" size={32} />,
                title: "Smooth Animations",
                description: "Fluid and responsive animations that bring your interface to life"
              },
              {
                icon: <Zap className="mb-4" size={32} />,
                title: "Interactive Controls",
                description: "Full control over animation playback and visual effects"
              },
              {
                icon: <Target className="mb-4" size={32} />,
                title: "Visual Trails",
                description: "Beautiful motion trails that enhance the animation experience"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`
                  p-6 rounded-lg text-center
                  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                  transform transition-all duration-500
                `}
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1000) * 0.2)}px)`,
                  opacity: Math.max(0, Math.min(1, (scrollY - 1000) / 400))
                }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation Info Section */}
      <section className="min-h-screen py-20 relative">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
               style={{
                 transform: `translateY(${Math.max(0, (scrollY - 1500) * 0.1)}px)`,
                 opacity: Math.max(0, Math.min(1, (scrollY - 1500) / 400))
               }}>
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Animation Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="mb-2">Current Step: {animationStep + 1}/4</p>
                <p className="mb-2">Status: {isPlaying ? 'Playing' : 'Paused'}</p>
                <p className="mb-2">Trails: {showTrails ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="mb-2">Theme: {isDarkMode ? 'Dark' : 'Light'}</p>
                <p className="mb-2">Transition Duration: 2000ms</p>
                <p className="mb-2">Animation Type: Continuous</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;