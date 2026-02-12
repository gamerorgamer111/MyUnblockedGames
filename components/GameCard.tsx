
import React from 'react';
import { Play, TrendingUp } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-700/50"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Hot Badge */}
        {game.isHot && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
            <TrendingUp className="w-3 h-3" />
            Hot
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-100 truncate group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
