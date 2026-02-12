
import React from 'react';
import { X, Maximize2, RotateCcw, Share2 } from 'lucide-react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img src={game.thumbnail} className="w-8 h-8 rounded-lg object-cover" alt="" />
          <div>
            <h2 className="text-sm font-bold text-white leading-none">{game.title}</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{game.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleReload}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title="Reload Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title="Full Screen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button 
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-slate-800 mx-1"></div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 relative bg-black">
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          className="absolute inset-0 w-full h-full border-none"
          allow="autoplay; fullscreen; keyboard"
          title={game.title}
        />
      </div>

      {/* Footer / Mobile Hint */}
      <div className="md:hidden py-2 px-4 bg-slate-900 text-[10px] text-slate-500 text-center uppercase tracking-widest">
        Playing: {game.title} • Nexus Games
      </div>
    </div>
  );
};

export default GamePlayer;
