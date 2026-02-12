
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { Game, Category } from './types';
import { gamesData } from './data/games';
import { Gamepad2, ChevronRight, Sparkles, Flame, LayoutGrid } from 'lucide-react';

const CATEGORIES: Category[] = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy'];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Filter games based on search and category
  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Featured game
  const featuredGame = gamesData.find(g => g.isHot) || gamesData[0];

  const handleHomeClick = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHomeClick={handleHomeClick}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:px-8">
        
        {/* Hero Section (Only visible when no search and on All category) */}
        {!searchQuery && selectedCategory === 'All' && featuredGame && (
          <section className="mb-12">
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-slate-800 shadow-2xl group cursor-pointer" onClick={() => setSelectedGame(featuredGame)}>
              <img 
                src={featuredGame.thumbnail} 
                alt="Featured" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured Today
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                    {featuredGame.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                  {featuredGame.title}
                </h1>
                <p className="text-slate-300 max-w-xl text-sm md:text-lg mb-8 line-clamp-2 md:line-clamp-none">
                  {featuredGame.description}
                </p>
                <button className="bg-white text-slate-950 hover:bg-indigo-50 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Play Now
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Categories Bar */}
        <div className="mb-10 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <LayoutGrid className="w-5 h-5" />
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        <div className="space-y-12">
          {/* Header for list */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {searchQuery ? `Search results for "${searchQuery}"` : (
                <>
                  <Flame className="w-6 h-6 text-orange-500" />
                  {selectedCategory === 'All' ? 'Trending Games' : `${selectedCategory} Games`}
                </>
              )}
            </h2>
            <div className="flex items-center text-indigo-400 text-sm font-semibold cursor-pointer hover:text-indigo-300 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-800/50 rounded-3xl border border-dashed border-slate-700">
              <div className="p-4 bg-slate-800 rounded-full mb-4">
                <Gamepad2 className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium text-lg">No games found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-indigo-400 hover:underline font-bold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NEXUS<span className="text-indigo-400">GAMES</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Your ultimate hub for unblocked high-performance web gaming. Fast, secure, and always free.
            </p>
            <div className="flex gap-4">
              {['Discord', 'Twitter', 'GitHub'].map(social => (
                <span key={social} className="text-xs font-bold text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors uppercase tracking-widest">
                  {social}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Popular Games</li>
              <li className="hover:text-white cursor-pointer transition-colors">New Releases</li>
              <li className="hover:text-white cursor-pointer transition-colors">Top Categories</li>
              <li className="hover:text-white cursor-pointer transition-colors">Game News</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Submit a Game</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Nexus Games Portal. All games are properties of their respective owners.
        </div>
      </footer>

      {/* Active Game Player Overlay */}
      {selectedGame && (
        <GamePlayer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default App;
