import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Film, 
  Layers, 
  User, 
  Mail, 
  ArrowRight, 
  Zap, 
  Maximize2,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  RotateCcw,
  Pause,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Video as VideoIcon,
  Upload,
  Loader2,
  Monitor,
  Cpu,
  Brain,
  Download,
  Trash2,
  Wand2,
  History,
  Dices,
  Ban,
  Clapperboard,
  Aperture,
  Palette
} from 'lucide-react';
import { 
  getGeminiResponse, 
  analyzeMedia, 
  generateImage, 
  animateImageToVideo 
} from './lib/gemini';
import { ThinkingLevel } from "@google/genai";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 p-6 md:px-12 flex justify-between items-center z-50 bg-gradient-to-b from-bg to-transparent">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
        <Camera className="text-black w-6 h-6" />
      </div>
      <span className="font-display text-2xl font-bold tracking-wider">VEFILM</span>
    </div>
    <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">
      <a href="#grey-house" className="hover:text-accent transition-colors">Grey House</a>
      <a href="#work" className="hover:text-accent transition-colors">Work</a>
      <a href="#tools" className="hover:text-accent transition-colors">Tools</a>
      <a href="#about" className="hover:text-accent transition-colors">About</a>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 relative overflow-hidden bg-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-tighter font-bold uppercase">
          AI-NATIVE<br />
          <span className="text-accent">PRODUCTION</span>
        </h1>
        <p className="mt-10 text-gray-500 max-w-md text-lg md:text-xl font-light leading-relaxed">
          Cinematic pre-visualization tools and AI workflows built by a working Director of Photography. From storyboard to screen.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a href="#work" className="px-10 py-5 bg-accent text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent-hover transition-all flex items-center gap-3">
            View Work <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#tools" className="px-10 py-5 border border-zinc-800 font-bold uppercase tracking-[0.3em] text-[10px] hover:border-accent transition-all">
            Try Tools
          </a>
        </div>
      </motion.div>
      
      {/* Background decorative element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-accent/40 to-transparent blur-[160px] rounded-full" />
      </div>
    </section>
  );
};

const KnockKnockSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleGlobalMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    } else {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="knock-knock" className="py-24 px-6 md:px-12 bg-bg">
      <div className="mb-16">
        <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Case Study</p>
        <h2 className="font-display text-5xl md:text-8xl font-bold">KNOCK KNOCK</h2>
        <p className="mt-6 text-gray-500 max-w-2xl text-lg font-light">
          1990s Bronx crime drama. Storyboard sketches transformed into photorealistic pre-visualization using a custom AI pipeline.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative aspect-video w-full max-w-6xl mx-auto overflow-hidden bg-bg-card border border-zinc-900 cursor-drag group select-none shadow-2xl"
        onMouseDown={handleMouseDown}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* Before Image (Storyboard) */}
        <img 
          src="https://picsum.photos/seed/storyboard/1920/1080?grayscale" 
          alt="Storyboard" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* After Image (AI Render) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img 
            src="https://picsum.photos/seed/cinematic/1920/1080" 
            alt="AI Render" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Handle */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-accent z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-2xl">
            <Maximize2 className="w-5 h-5 text-black rotate-45" />
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/50 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to compare
        </div>
      </div>
    </section>
  );
};

const Lookbook = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isGrainy, setIsGrainy] = useState(true);
  const [comparisonPos, setComparisonPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Video playback error:", error);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      const newTime = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(val);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleComparisonMove = (clientX: number) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setComparisonPos((x / rect.width) * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleComparisonMove(e.clientX);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleComparisonMove(e.clientX);
    }
  };

  const handleGlobalMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    } else {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="grey-house" className="py-24 bg-bg relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="px-6 md:px-12 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Featured Project</p>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] font-bold uppercase">THE GREY HOUSE<br /><span className="text-accent">INCIDENT</span></h2>
            <p className="mt-8 text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              1960s Scotland suspense. A complete visual bible and teaser built with MidJourney prompt engineering and Veo/Kling video generation.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">Status</p>
                <p className="text-accent text-[10px] uppercase tracking-[0.2em]">Pre-Production</p>
              </div>
              <div className="w-px h-12 bg-zinc-900 mx-4" />
              <div className="text-right">
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">Format</p>
                <p className="text-accent text-[10px] uppercase tracking-[0.2em]">Feature Film</p>
              </div>
            </div>
            <button 
              onClick={() => setIsGrainy(!isGrainy)}
              className={`flex items-center gap-2 px-6 py-3 border ${isGrainy ? 'border-accent text-accent' : 'border-zinc-800 text-zinc-600'} text-[9px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-accent/5`}
            >
              <Film className="w-3 h-3" /> {isGrainy ? 'Film Grain: ON' : 'Film Grain: OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="px-6 md:px-12 mb-24 relative z-10">
        <div 
          className="relative aspect-video w-full max-w-7xl mx-auto bg-black group overflow-hidden border border-zinc-900 shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Film Grain Overlay */}
          {isGrainy && (
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-pulse" />
          )}

          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://picsum.photos/seed/greyhouse/1920/1080"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Controls Bar */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg/40 to-transparent p-8 transition-all duration-500 z-20 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            {/* Scrubber */}
            <div className="group/scrub relative w-full h-1 bg-zinc-900 mb-8 cursor-pointer rounded-full">
              <input 
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleScrub}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-accent transition-all"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/scrub:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button onClick={togglePlay} className="text-white hover:text-accent transition-colors">
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                </button>
                
                <div className="flex items-center gap-4 group/vol">
                  <button onClick={toggleMute} className="text-white hover:text-accent transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 group-hover/vol:w-24 transition-all duration-300 accent-accent"
                  />
                </div>

                <div className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase">
                  {videoRef.current && !isNaN(videoRef.current.currentTime) ? Math.floor(videoRef.current.currentTime / 60) : 0}:
                  {videoRef.current && !isNaN(videoRef.current.currentTime) ? Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0') : '00'} 
                  <span className="mx-3 text-zinc-800">/</span>
                  {videoRef.current && !isNaN(videoRef.current.duration) ? Math.floor(videoRef.current.duration / 60) : 0}:
                  {videoRef.current && !isNaN(videoRef.current.duration) ? Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0') : '00'}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <button className="text-zinc-600 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => videoRef.current?.requestFullscreen()}
                  className="text-zinc-600 hover:text-white transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Initial Play Overlay */}
          {!isPlaying && progress === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
              <button 
                onClick={togglePlay}
                className="w-24 h-24 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group/play"
              >
                <Play className="w-10 h-10 text-black fill-current ml-1 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cinematic Comparison Slider */}
      <div className="px-6 md:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-px bg-accent" />
            <h3 className="font-display text-2xl tracking-[0.3em] uppercase font-bold">Visual Pipeline</h3>
          </div>
          
          <div 
            ref={comparisonRef}
            className="relative aspect-[2.39/1] w-full overflow-hidden bg-bg-card border border-zinc-900 cursor-drag group select-none shadow-2xl"
            onMouseDown={handleMouseDown}
          >
            {/* Before: Raw Output */}
            <img 
              src="https://picsum.photos/seed/rawscotland/1920/800?grayscale" 
              alt="Raw Output" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-10 left-10 bg-bg/80 backdrop-blur-xl px-5 py-3 border border-white/5 text-[9px] text-white/50 uppercase tracking-[0.4em] font-bold">
              RAW AI OUTPUT
            </div>

            {/* After: Final Grade */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - comparisonPos}% 0 0)` }}
            >
              <img 
                src="https://picsum.photos/seed/gradedscotland/1920/800" 
                alt="Final Grade" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-10 right-10 bg-accent/90 backdrop-blur-xl px-5 py-3 border border-white/5 text-[9px] text-black font-black uppercase tracking-[0.4em]">
                VEFILM GRADE
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-px bg-accent z-20 pointer-events-none"
              style={{ left: `${comparisonPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-accent rounded-full flex items-center justify-center bg-bg/60 backdrop-blur-md shadow-2xl">
                <Maximize2 className="w-5 h-5 text-accent rotate-45" />
              </div>
            </div>
          </div>
          <p className="mt-6 text-zinc-600 text-[10px] uppercase tracking-[0.3em] text-center font-bold">Drag to compare Raw Generation vs Cinematic Post-Processing</p>
        </div>
      </div>

      {/* Lookbook Grid */}
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          <div className="md:col-span-2 aspect-video overflow-hidden bg-zinc-950 border border-zinc-900 group relative">
            <img 
              src="/media/grey-house-macro-eye.jpg" 
              alt="Macro Ocular Study" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              onError={(e: any) => { e.target.src = "https://picsum.photos/seed/macroeye/1200/675" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 bg-accent/90 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-black">
              Macro Study 01
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="aspect-video overflow-hidden bg-zinc-950 border border-zinc-900 group">
            <img 
              src="/media/grey-house-lookbook-4.jpg" 
              alt="Lookbook 4" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              onError={(e: any) => { e.target.src = "https://picsum.photos/seed/scotland4/800/450" }}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-video overflow-hidden bg-zinc-950 border border-zinc-900 group">
            <img 
              src="/media/grey-house-lookbook-5.jpg" 
              alt="Lookbook 5" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              onError={(e: any) => { e.target.src = "https://picsum.photos/seed/scotland5/800/450" }}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-3 aspect-[21/9] overflow-hidden bg-zinc-950 border border-zinc-900 group relative">
             <img 
              src="https://picsum.photos/seed/scotland7/1920/822" 
              alt="Cinematic Landscape" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 text-right">
              <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">Shot 42</p>
              <p className="text-accent text-[10px] uppercase tracking-[0.2em]">Exterior Night</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'analyze' | 'think'>('image');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<{ type: string, url: string, prompt: string, timestamp: number, settings?: any }[]>([]);
  const [shotList, setShotList] = useState<{ id: string, url: string, prompt: string, scene: string }[]>([]);
  
  // Image Config
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageSize, setImageSize] = useState('1K');
  const [quality, setQuality] = useState<'standard' | 'pro'>('pro');
  
  // Style Presets
  const [dopStyle, setDopStyle] = useState('None');
  const [photoLook, setPhotoLook] = useState('None');
  const [filmLook, setFilmLook] = useState('None');
  const [lensType, setLensType] = useState('35mm');
  const [lightingType, setLightingType] = useState('None');

  const DOP_STYLES = [
    { name: 'None', desc: 'Default', img: 'https://picsum.photos/seed/dop0/100/100' },
    { name: 'Roger Deakins', desc: 'Soft, naturalistic, master of shadows', img: 'https://picsum.photos/seed/deakins/100/100' },
    { name: 'Hoyte van Hoytema', desc: 'Large format, high contrast, immersive', img: 'https://picsum.photos/seed/hoyte/100/100' },
    { name: 'Emmanuel Lubezki', desc: 'Natural light, wide angle, long takes', img: 'https://picsum.photos/seed/chivo/100/100' },
    { name: 'Robert Richardson', desc: 'Top lighting, high key, vibrant', img: 'https://picsum.photos/seed/richardson/100/100' },
    { name: 'Greig Fraser', desc: 'Textured, moody, soft contrast', img: 'https://picsum.photos/seed/fraser/100/100' }
  ];

  const PHOTO_LOOKS = [
    { name: 'None', desc: 'Default', img: 'https://picsum.photos/seed/photo0/100/100' },
    { name: 'Annie Leibovitz', desc: 'Painterly, dramatic, celebrity style', img: 'https://picsum.photos/seed/leibovitz/100/100' },
    { name: 'Gregory Crewdson', desc: 'Surreal, cinematic lighting, eerie', img: 'https://picsum.photos/seed/crewdson/100/100' },
    { name: 'Peter Lindbergh', desc: 'High contrast B&W, raw emotion', img: 'https://picsum.photos/seed/lindbergh/100/100' },
    { name: 'Steve McCurry', desc: 'Vibrant colors, National Geographic style', img: 'https://picsum.photos/seed/mccurry/100/100' },
    { name: 'Fan Ho', desc: 'Dramatic shadows, street geometry', img: 'https://picsum.photos/seed/fanho/100/100' }
  ];

  const FILM_LOOKS = [
    { name: 'None', desc: 'Default', img: 'https://picsum.photos/seed/film0/100/100' },
    { name: 'Kodak Portra 400', desc: 'Warm, fine grain, skin tones', img: 'https://picsum.photos/seed/portra/100/100' },
    { name: 'Fuji 400H', desc: 'Cool, pastel, airy', img: 'https://picsum.photos/seed/fuji/100/100' },
    { name: 'Technicolor', desc: 'Vibrant, vintage, 3-strip process', img: 'https://picsum.photos/seed/techni/100/100' },
    { name: 'Ektachrome', desc: 'High saturation, slide film, vivid', img: 'https://picsum.photos/seed/ekta/100/100' },
    { name: 'Kodachrome', desc: 'Iconic red tones, high contrast', img: 'https://picsum.photos/seed/koda/100/100' },
    { name: 'Ilford HP5', desc: 'Classic B&W, punchy grain', img: 'https://picsum.photos/seed/ilford/100/100' }
  ];

  const LENS_TYPES = [
    { name: '14mm', desc: 'Ultra Wide, deep focus' },
    { name: '35mm', desc: 'Classic cinematic field of view' },
    { name: '50mm', desc: 'Natural human eye perspective' },
    { name: '85mm', desc: 'Portrait, shallow depth of field' },
    { name: '200mm', desc: 'Telephoto, compressed space' },
    { name: 'Anamorphic', desc: 'Horizontal flares, oval bokeh' }
  ];

  const LIGHTING_TYPES = [
    { name: 'None', desc: 'Default' },
    { name: 'Rembrandt', desc: 'Classic triangle of light on cheek' },
    { name: 'High Key', desc: 'Bright, low contrast, optimistic' },
    { name: 'Low Key', desc: 'Dark, high contrast, mysterious' },
    { name: 'Volumetric', desc: 'Visible light beams, hazy' },
    { name: 'Golden Hour', desc: 'Warm, low sun, long shadows' },
    { name: 'Noir', desc: 'Hard shadows, dramatic B&W' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const enhancePrompt = async () => {
    if (!prompt) return;
    setEnhancing(true);
    try {
      const enhanced = await getGeminiResponse(
        `Expand this simple prompt into a detailed cinematic description for an AI image generator. 
        Focus on lighting, composition, camera lens, and atmosphere. 
        Keep it under 100 words. 
        Prompt: "${prompt}"`,
        "gemini-3.1-flash-lite-preview"
      );
      setPrompt(enhanced.replace(/["']/g, '').trim());
    } catch (error) {
      console.error(error);
    } finally {
      setEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      if (activeTab === 'image') {
        let finalPrompt = prompt;
        if (dopStyle !== 'None') finalPrompt += `, in the cinematography style of ${dopStyle}`;
        if (photoLook !== 'None') finalPrompt += `, in the photography style of ${photoLook}`;
        if (filmLook !== 'None') finalPrompt += `, shot on ${filmLook} film stock`;
        if (lensType !== 'None') finalPrompt += `, shot with a ${lensType} lens`;
        if (lightingType !== 'None') finalPrompt += `, with ${lightingType} lighting`;

        const imgUrl = await generateImage(finalPrompt, {
          aspectRatio,
          imageSize,
          negativePrompt,
          seed,
          model: quality === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-3.1-flash-image-preview'
        });
        setResult(imgUrl);
        const settings = { dopStyle, photoLook, filmLook, lensType, lightingType, aspectRatio, imageSize, seed };
        setHistory(prev => [{ type: 'image', url: imgUrl, prompt: finalPrompt, timestamp: Date.now(), settings }, ...prev].slice(0, 10));
      } else if (activeTab === 'video') {
        if (!preview) throw new Error("Please upload an image first.");
        const base64Data = preview.split(',')[1];
        const mimeType = preview.split(';')[0].split(':')[1];
        const videoUrl = await animateImageToVideo(base64Data, mimeType, prompt);
        setResult(videoUrl);
      } else if (activeTab === 'analyze') {
        if (!preview) throw new Error("Please upload a photo or video first.");
        const base64Data = preview.split(',')[1];
        const mimeType = preview.split(';')[0].split(':')[1];
        const analysis = await analyzeMedia(prompt || "Analyze this media for cinematic details.", base64Data, mimeType);
        setResult(analysis);
      } else if (activeTab === 'think') {
        const response = await getGeminiResponse(prompt, "gemini-3.1-pro-preview", {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        });
        setResult(response);
      }
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const addToShotList = () => {
    if (result) {
      setShotList(prev => [...prev, { 
        id: Math.random().toString(36).substr(2, 9), 
        url: result, 
        prompt: prompt,
        scene: `SCENE ${prev.length + 1}`
      }]);
    }
  };

  const removeFromShotList = (id: string) => {
    setShotList(prev => prev.filter(s => s.id !== id));
  };

  return (
    <section id="ai-studio" className="py-24 px-6 md:px-12 bg-zinc-950/50 border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Production Suite</p>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold">AI STUDIO <span className="text-zinc-800">BETA</span></h2>
          <p className="mt-6 text-gray-400 max-w-2xl text-lg">
            A unified interface for VEFILM's neural production tools. Generate, animate, and analyze with studio-grade models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {[
              { id: 'image', label: 'Image Gen', icon: ImageIcon, desc: 'Gemini 3 Pro Image' },
              { id: 'video', label: 'Animate', icon: VideoIcon, desc: 'Veo 3.1 Fast' },
              { id: 'analyze', label: 'Analyze', icon: Monitor, desc: 'Gemini 3.1 Pro' },
              { id: 'think', label: 'Deep Think', icon: Brain, desc: 'High Reasoning' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setResult(null); setPreview(null); setFile(null); }}
                className={`flex items-start gap-4 p-4 text-left transition-all border ${activeTab === tab.id ? 'bg-accent/10 border-accent text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
              >
                <tab.icon className={`w-5 h-5 mt-1 ${activeTab === tab.id ? 'text-accent' : ''}`} />
                <div>
                  <p className="font-bold text-sm uppercase tracking-widest">{tab.label}</p>
                  <p className="text-[10px] opacity-60 mt-1">{tab.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-9 bg-zinc-900 border border-zinc-800 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Cpu className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              {/* Input Area */}
              <div className="space-y-6">
                {(activeTab === 'video' || activeTab === 'analyze') && (
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Source Media</label>
                    <div className="flex gap-6">
                      <div className="relative w-48 aspect-video bg-zinc-950 border border-dashed border-zinc-800 flex items-center justify-center overflow-hidden group">
                        {preview ? (
                          <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="w-6 h-6 text-zinc-700 group-hover:text-accent transition-colors" />
                        )}
                        <input 
                          type="file" 
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept={activeTab === 'video' ? 'image/*' : 'image/*,video/*'}
                        />
                      </div>
                      <div className="flex-1 text-xs text-zinc-500 flex flex-col justify-center">
                        <p className="text-white font-bold mb-1">{activeTab === 'video' ? 'Upload Image' : 'Upload Media'}</p>
                        <p>{activeTab === 'video' ? 'Veo 3.1 will animate this frame based on your prompt.' : 'Gemini will analyze the content for cinematic insights.'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Prompt / Instructions</label>
                    <button 
                      onClick={enhancePrompt}
                      disabled={enhancing || !prompt}
                      className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-accent hover:text-white transition-colors disabled:opacity-50"
                    >
                      {enhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      Enhance Cinematic
                    </button>
                  </div>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTab === 'image' ? "A cinematic wide shot of a futuristic Glasgow at night, neon amber lights, 8k, kodachrome..." :
                      activeTab === 'video' ? "The camera slowly pans across the character's face as they look out the window..." :
                      activeTab === 'analyze' ? "Analyze the lighting and composition of this shot..." :
                      "Explain the complex narrative structure of 1960s suspense films..."
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white placeholder:text-zinc-700 focus:border-accent outline-none transition-colors min-h-[120px] font-mono text-sm"
                  />
                </div>

                {activeTab === 'image' && (
                  <div className="space-y-8">
                    {/* Visual Style Selector */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-zinc-500">
                          <div className="flex items-center gap-2">
                            <Clapperboard className="w-3 h-3" />
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Cinematography</label>
                          </div>
                          <div className="w-6 h-6 rounded overflow-hidden border border-zinc-800">
                            <img src={DOP_STYLES.find(s => s.name === dopStyle)?.img} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <select 
                          value={dopStyle}
                          onChange={(e) => setDopStyle(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent appearance-none"
                        >
                          {DOP_STYLES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <p className="text-[9px] text-zinc-600 italic">{DOP_STYLES.find(s => s.name === dopStyle)?.desc}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-zinc-500">
                          <div className="flex items-center gap-2">
                            <Aperture className="w-3 h-3" />
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Photographer</label>
                          </div>
                          <div className="w-6 h-6 rounded overflow-hidden border border-zinc-800">
                            <img src={PHOTO_LOOKS.find(s => s.name === photoLook)?.img} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <select 
                          value={photoLook}
                          onChange={(e) => setPhotoLook(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent appearance-none"
                        >
                          {PHOTO_LOOKS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <p className="text-[9px] text-zinc-600 italic">{PHOTO_LOOKS.find(s => s.name === photoLook)?.desc}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-zinc-500">
                          <div className="flex items-center gap-2">
                            <Palette className="w-3 h-3" />
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Film Stock</label>
                          </div>
                          <div className="w-6 h-6 rounded overflow-hidden border border-zinc-800">
                            <img src={FILM_LOOKS.find(s => s.name === filmLook)?.img} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <select 
                          value={filmLook}
                          onChange={(e) => setFilmLook(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent appearance-none"
                        >
                          {FILM_LOOKS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <p className="text-[9px] text-zinc-600 italic">{FILM_LOOKS.find(s => s.name === filmLook)?.desc}</p>
                      </div>
                    </div>

                    {/* Technical Camera Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-800/50">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Camera className="w-3 h-3" />
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Lens Selection</label>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {LENS_TYPES.map(l => (
                            <button
                              key={l.name}
                              onClick={() => setLensType(l.name)}
                              className={`py-2 text-[9px] border transition-all ${lensType === l.name ? 'bg-accent text-black border-accent' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                            >
                              {l.name}
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-zinc-600 italic">{LENS_TYPES.find(l => l.name === lensType)?.desc}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Zap className="w-3 h-3" />
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Lighting Setup</label>
                        </div>
                        <select 
                          value={lightingType}
                          onChange={(e) => setLightingType(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent appearance-none"
                        >
                          {LIGHTING_TYPES.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
                        </select>
                        <p className="text-[9px] text-zinc-600 italic">{LIGHTING_TYPES.find(l => l.name === lightingType)?.desc}</p>
                      </div>
                    </div>

                    {/* Advanced Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-800/50">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Ban className="w-3 h-3" />
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Negative Prompt</label>
                        </div>
                        <input 
                          type="text"
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder="What to avoid: blur, low res, distorted faces..."
                          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Dices className="w-3 h-3" />
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Seed</label>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="number"
                              value={seed || ''}
                              onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="Random"
                              className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent"
                            />
                            <button 
                              onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                              className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-accent transition-colors"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Maximize2 className="w-3 h-3" />
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Aspect Ratio</label>
                          </div>
                          <select 
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white outline-none focus:border-accent"
                          >
                            {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Resolution</label>
                        <div className="flex gap-2">
                          {['1K', '2K', '4K'].map(s => (
                            <button
                              key={s}
                              onClick={() => setImageSize(s)}
                              className={`flex-1 py-2 text-[10px] border ${imageSize === s ? 'bg-accent text-black border-accent' : 'border-zinc-800 text-zinc-500'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Engine</label>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setQuality('standard')}
                            className={`flex-1 py-2 text-[10px] border ${quality === 'standard' ? 'bg-accent text-black border-accent' : 'border-zinc-800 text-zinc-500'}`}
                          >
                            FLASH
                          </button>
                          <button 
                            onClick={() => setQuality('pro')}
                            className={`flex-1 py-2 text-[10px] border ${quality === 'pro' ? 'bg-accent text-black border-accent' : 'border-zinc-800 text-zinc-500'}`}
                          >
                            PRO
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleGenerate}
                  disabled={loading || (!prompt && activeTab !== 'analyze')}
                  className="w-full bg-accent hover:bg-accent/90 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold py-4 uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      Execute Generation
                    </>
                  )}
                </button>
              </div>

              {/* Result Area */}
              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-12 pt-12 border-t border-zinc-800"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Output Result</label>
                      <div className="flex gap-4">
                        <button className="text-zinc-500 hover:text-white transition-colors"><Download className="w-4 h-4" /></button>
                        <button onClick={() => setResult(null)} className="text-zinc-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-950 border border-zinc-800 p-1 relative shadow-2xl group/monitor">
                      {/* Director's Monitor UI Overlay */}
                      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 border-[20px] border-black/20">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <div className="bg-red-600 px-2 py-0.5 text-[8px] font-black text-white rounded-sm flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> REC
                            </div>
                            <div className="text-[8px] font-mono text-white/50">TC 01:02:57:00</div>
                          </div>
                          <div className="flex gap-4 text-[8px] font-mono text-white/50">
                            <div>FPS 23.976</div>
                            <div>SHUTTER 180°</div>
                            <div>ISO 800</div>
                          </div>
                        </div>
                        
                        {/* Center Crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/10 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-4 bg-white/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />

                        <div className="flex justify-between items-end">
                          <div className="flex gap-4 text-[8px] font-mono text-white/50">
                            <div>LENS {lensType}</div>
                            <div>LOOK {filmLook}</div>
                          </div>
                          <div className="w-16 h-8 border border-white/10 flex items-end gap-0.5 p-1">
                            {[40, 70, 50, 90, 60, 80, 40].map((h, i) => (
                              <div key={i} className="flex-1 bg-accent/30" style={{ height: `${h}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Neural Grading Animation */}
                      {loading && (
                        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            <p className="text-[8px] uppercase tracking-[0.4em] text-accent font-bold animate-pulse">Neural Grading in Progress...</p>
                          </div>
                        </div>
                      )}

                      <div className="min-h-[300px] flex items-center justify-center bg-zinc-900">
                        {activeTab === 'image' && result && result.startsWith('data:') ? (
                          <div className="relative w-full h-full">
                            <img src={result} className="max-w-full h-auto" alt="Generated" />
                            <button 
                              onClick={addToShotList}
                              className="absolute bottom-4 right-4 bg-accent/90 hover:bg-accent text-black px-4 py-2 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 pointer-events-auto"
                            >
                              <Layers className="w-3 h-3" /> Add to Shot List
                            </button>
                          </div>
                        ) : activeTab === 'video' && result && result.startsWith('blob:') ? (
                          <video src={result} controls className="max-w-full h-auto" />
                        ) : (
                          <div className="w-full text-zinc-400 font-mono text-sm leading-relaxed whitespace-pre-wrap p-6">
                            {result || "Awaiting neural input..."}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Shot List Sidebar (Floating) */}
              <AnimatePresence>
                {shotList.length > 0 && (
                  <motion.div 
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="fixed right-0 top-1/2 -translate-y-1/2 w-64 bg-zinc-950 border-l border-zinc-900 p-6 z-50 max-h-[80vh] overflow-y-auto hidden xl:block"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-accent" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Shot List</span>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono">{shotList.length}</span>
                    </div>
                    <div className="space-y-4">
                      {shotList.map((shot) => (
                        <div key={shot.id} className="group relative">
                          <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden">
                            <img src={shot.url} className="w-full h-full object-cover" />
                          </div>
                          <div className="mt-2 flex justify-between items-start">
                            <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">{shot.scene}</p>
                            <button 
                              onClick={() => removeFromShotList(shot.id)}
                              className="text-zinc-700 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-8 py-3 border border-accent/20 text-accent text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-accent/5 transition-all">
                      Export Storyboard
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoGrid = () => (
  <section id="work" className="py-24 px-6 md:px-12 bg-bg">
    <div className="mb-16">
      <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">AI Spec Work</p>
      <h2 className="font-display text-5xl md:text-8xl font-bold uppercase">GENERATED FILMS</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: "Arch Motorcycles", desc: "Spec commercial for Keanu Reeves' custom motorcycle company.", tag: "Veo 3 + MidJourney", seed: "moto" },
        { title: "Fly Away", desc: "Vertical story format. Atmospheric piece exploring movement.", tag: "AI Generated", seed: "fly" },
        { title: "Beauty Bar", desc: "Neon-lit atmosphere piece. Character study in late-night setting.", tag: "AI Generated", seed: "bar" }
      ].map((item, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -10 }}
          className="bg-bg-card border border-zinc-900 overflow-hidden group/card"
        >
          <div className="aspect-video bg-bg relative group overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${item.seed}/800/450`} 
              alt={item.title} 
              className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl">
                <Play className="w-8 h-8 text-black fill-current ml-1" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <h3 className="font-display text-2xl mb-3 tracking-tight font-bold">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed font-light">{item.desc}</p>
            <span className="inline-block px-4 py-1 bg-accent/5 text-accent text-[9px] font-bold uppercase tracking-[0.2em] border border-accent/20">
              {item.tag}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const AITool = ({ 
  number, 
  title, 
  desc, 
  placeholder, 
  accentColor = "accent", 
  type = "text",
  onGenerate 
}: any) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  // Image Config
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageSize, setImageSize] = useState('1K');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);
    try {
      let result;
      if (type === 'video' || type === 'analyze') {
        if (!preview) throw new Error("Please upload media first.");
        const base64Data = preview.split(',')[1];
        const mimeType = preview.split(';')[0].split(':')[1];
        result = await onGenerate(input, base64Data, mimeType);
      } else if (type === 'image') {
        result = await onGenerate(input, { aspectRatio, imageSize });
      } else {
        result = await onGenerate(input);
      }
      setOutput(result);
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-bg-card border border-zinc-900 p-8 hover:border-${accentColor}/50 transition-all group`}>
      <div className={`font-display text-6xl text-${accentColor} leading-none mb-6 opacity-20 group-hover:opacity-100 transition-opacity`}>{number}</div>
      <h3 className="font-display text-3xl mb-3 tracking-tight font-bold">{title}</h3>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light">{desc}</p>
      
      {(type === 'video' || type === 'analyze') && (
        <div className="mb-6">
          <div className="relative w-full aspect-video bg-bg border border-dashed border-zinc-800 flex items-center justify-center overflow-hidden group/upload">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-zinc-800 group-hover/upload:text-accent transition-colors" />
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Upload Media</span>
              </div>
            )}
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept={type === 'video' ? 'image/*' : 'image/*,video/*'}
            />
          </div>
        </div>
      )}

      {type === 'image' && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-zinc-600">Aspect Ratio</label>
            <select 
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full bg-bg border border-zinc-800 p-2 text-[10px] text-white outline-none focus:border-accent"
            >
              {['1:1', '3:2', '4:3', '16:9', '21:9'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-zinc-600">Resolution</label>
            <select 
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              className="w-full bg-bg border border-zinc-800 p-2 text-[10px] text-white outline-none focus:border-accent"
            >
              {['1K', '2K', '4K'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}
      
      <textarea 
        className="w-full bg-bg border border-zinc-900 p-5 text-sm text-white placeholder:text-zinc-800 focus:outline-none focus:border-accent min-h-[140px] mb-6 resize-none font-mono"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full py-5 bg-${accentColor} text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent-hover transition-all disabled:opacity-50 flex items-center justify-center gap-3`}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
        {loading ? 'Processing...' : 'Execute Tool'}
      </button>
      
      <AnimatePresence>
        {output && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-zinc-900 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Output Result</span>
              <div className="flex gap-3">
                <button className="text-zinc-600 hover:text-white transition-colors"><Download className="w-3 h-3" /></button>
                <button onClick={() => setOutput(null)} className="text-zinc-600 hover:text-white transition-colors"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="bg-bg border border-zinc-900 p-4 min-h-[100px] flex items-center justify-center">
              {output.startsWith('data:') ? (
                <img src={output} className="max-w-full h-auto shadow-xl" alt="Result" />
              ) : output.startsWith('blob:') ? (
                <video src={output} controls className="max-w-full h-auto shadow-xl" />
              ) : (
                <div className="w-full text-zinc-500 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                  {output}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tools = () => {
  const runCinematicEngine = async (input: string) => {
    const prompt = `You are a cinematography AI specializing in Veo 3 video generation prompts. Given this shot description, output a structured prompt optimized for Veo 3.
    Shot description: ${input}
    Output format:
    SHOT TITLE: [descriptive title]
    CAMERA: [movement type, lens, equipment]
    MARK A → VECTOR → MARK B: [start position, movement, end position]
    VEO 3 PROMPT: [detailed prompt with NO_MORPH token for character continuity, Kodachrome look, 2.39:1 aspect ratio, 24fps]`;
    return await getGeminiResponse(prompt);
  };

  const runImageGenerator = async (input: string, config: any) => {
    return await generateImage(input, {
      aspectRatio: config.aspectRatio,
      imageSize: config.imageSize,
      model: 'gemini-3-pro-image-preview'
    });
  };

  const runAnimateTool = async (input: string, base64: string, mime: string) => {
    return await animateImageToVideo(base64, mime, input);
  };

  const runShotAnalysis = async (input: string, base64: string, mime: string) => {
    const prompt = `Analyze this media for cinematic details. Focus on lighting, composition, and color palette.
    User context: ${input}`;
    return await analyzeMedia(prompt, base64, mime);
  };

  return (
    <section id="tools" className="py-24 px-6 md:px-12 bg-bg">
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Production Suite</p>
        </div>
        <h2 className="font-display text-6xl md:text-8xl font-bold">AI TOOLS</h2>
        <p className="mt-6 text-gray-500 max-w-2xl text-lg font-light">
          Studio-grade neural production tools integrated directly into your workflow. Generate, animate, and analyze with VEFILM's custom pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AITool 
          number="01"
          title="Cinematic Engine"
          desc="Transform shot descriptions into structured technical prompts for Veo 3 and traditional production."
          placeholder="Describe your shot: A slow dolly push into a dimly lit kitchen..."
          onGenerate={runCinematicEngine}
        />
        <AITool 
          number="02"
          title="Image Generator"
          type="image"
          desc="Scene description to cinematic still. Wraps your concept in VEFILM's signature Kodachrome look."
          placeholder="Describe your scene: Two detectives stand at the entrance of an old Scottish inn..."
          onGenerate={runImageGenerator}
        />
        <AITool 
          number="03"
          title="Animate Frame"
          type="video"
          accentColor="accent-teal"
          desc="Upload a storyboard or still and use Veo 3.1 Fast to animate it into a cinematic video sequence."
          placeholder="Describe the animation: The camera slowly pans across the character's face..."
          onGenerate={runAnimateTool}
        />
        <AITool 
          number="04"
          title="Media Analysis"
          type="analyze"
          accentColor="accent-teal"
          desc="Upload a frame or video. Get technical analysis on lighting, composition, and color grading manifests."
          placeholder="What specific cinematic elements should I focus on?"
          onGenerate={runShotAnalysis}
        />
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto bg-bg">
    <div className="mb-16">
      <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">About</p>
      <h2 className="font-display text-5xl md:text-8xl font-bold uppercase">PEDRO FERIA PINO</h2>
    </div>
    <div className="space-y-8 text-gray-500 text-lg md:text-2xl font-light leading-relaxed">
      <p>
        Director of Photography and Camera Operator based in Brooklyn, NY. SOC member with 20+ years shooting unscripted television, documentary, and narrative film for Netflix, Disney, VH1, TLC, MTV, VICE, and ABC.
      </p>
      <p>
        Now building AI-native production pipelines that bridge traditional cinematography with generative tools. These workflows power real pre-production, from storyboard visualization to location scouting to character design.
      </p>
    </div>
    <div className="mt-16">
      <a href="https://pedroferiapino.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 border border-zinc-800 font-bold uppercase tracking-[0.3em] text-[10px] hover:border-accent transition-all">
        Main Portfolio <Maximize2 className="w-4 h-4" />
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 px-6 md:px-12 border-t border-zinc-900 text-center text-zinc-600 text-[9px] tracking-[0.4em] uppercase bg-bg">
    <p>© 2026 VEFILM. Built by Pedro Feria Pino.</p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-bg min-h-screen selection:bg-accent selection:text-black">
      <div className="film-grain" />
      <Navbar />
      <Hero />
      <Lookbook />
      <KnockKnockSlider />
      <VideoGrid />
      <Tools />
      <About />
      <Footer />
    </div>
  );
}
