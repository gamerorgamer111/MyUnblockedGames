
import React from 'react';
import { Gamepad2, Search, Bell } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            NEXUS<span className="text-indigo-400">GAMES</span>
          </span>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
