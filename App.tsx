
import React, { useState, useMemo } from 'react';
import { KOLS, CATEGORIES } from './constants';
import { ViewState, KolData } from './types';
import { Home } from './components/Home';
import { ArticleView } from './components/ArticleView';
import { RankingTable } from './components/RankingTable';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedKolId, setSelectedKolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featuredKol = useMemo(() => {
    // Always return Cented as the featured article
    return KOLS.find(k => k.id === 'cented') || KOLS[0];
  }, []);

  // Filter Data
  const filteredKols = useMemo(() => {
    let data = KOLS;
    if (activeTag) {
        data = data.filter(k => k.tags.some(t => t.toLowerCase() === activeTag.toLowerCase()) || k.tags.some(t => t.includes(activeTag)));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(k => 
        k.name.toLowerCase().includes(q) || 
        k.handle.toLowerCase().includes(q)
      );
    }
    return data;
  }, [searchQuery, activeTag]);

  // Navigation Handlers
  const goHome = () => {
    setCurrentView(ViewState.HOME);
    setActiveTag(null);
    setSearchQuery('');
    setSelectedKolId(null);
    window.scrollTo(0, 0);
  };

  const goToRanking = () => {
    setCurrentView(ViewState.RANKING);
    setActiveTag(null);
    window.scrollTo(0, 0);
  };

  const goToArticle = (id: string) => {
    if (id === 'ALL') {
        goToRanking();
        return;
    }
    setSelectedKolId(id);
    setCurrentView(ViewState.ARTICLE);
    window.scrollTo(0, 0);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setCurrentView(ViewState.RANKING);
    window.scrollTo(0, 0);
  };

  const activeKol = KOLS.find(k => k.id === selectedKolId);

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans text-[#202122]">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
            <img 
                src="https://i.postimg.cc/j5kZw2FP/Untitled-design-2025-12-06T000949-276.png" 
                alt="Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">KOLOPEDIA</span>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search KOLs..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value && currentView !== ViewState.RANKING) {
                            setCurrentView(ViewState.RANKING);
                        }
                    }}
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-6 px-4 gap-6 mb-12">
        
        {/* Sidebar */}
        <aside className="w-full md:w-48 shrink-0 space-y-6 hidden md:block">
          <nav>
            <ul className="space-y-2 text-sm">
                <li><button onClick={goHome} className="text-blue-600 hover:underline">Main Page</button></li>
                <li><button onClick={goToRanking} className="text-blue-600 hover:underline">Ranking</button></li>
                <li><button onClick={() => handleTagClick('Solana')} className="text-blue-600 hover:underline">Solana Specialists</button></li>
                <li><button onClick={() => handleTagClick('Meme Coins')} className="text-blue-600 hover:underline">Meme Coins</button></li>
                <li><button onClick={() => handleTagClick('High Win Rate')} className="text-blue-600 hover:underline">Top Win Rate</button></li>
            </ul>
          </nav>
          
          <div className="border-t border-gray-300 pt-4">
             <h4 className="font-bold text-gray-600 text-xs mb-2 uppercase">Project</h4>
             <ul className="space-y-2 text-sm">
                <li><span className="text-gray-500 cursor-not-allowed">About Kolopedia</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Community Portal</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Donate SOL</span></li>
             </ul>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white border border-gray-300 p-6 min-h-[600px] shadow-sm">
            {currentView === ViewState.HOME && (
                <Home 
                    kols={KOLS} 
                    onKolClick={goToArticle} 
                    featuredKol={featuredKol} 
                    onTagClick={handleTagClick}
                    categories={CATEGORIES}
                />
            )}

            {currentView === ViewState.RANKING && (
                <div>
                     <h1 className="text-2xl font-serif border-b border-wiki-border pb-2 mb-4">
                        {activeTag ? `Category: ${activeTag}` : (searchQuery ? `Search Results: "${searchQuery}"` : 'KOL Ranking')}
                     </h1>
                     {filteredKols.length > 0 ? (
                        <RankingTable data={filteredKols} onKolClick={goToArticle} />
                     ) : (
                        <p className="text-gray-600 italic mt-4">No KOLs found matching your criteria.</p>
                     )}
                </div>
            )}

            {currentView === ViewState.ARTICLE && activeKol && (
                <ArticleView kol={activeKol} onTagClick={handleTagClick} />
            )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
            <p className="mb-2">Text is available under the Creative Commons Attribution-ShareAlike License.</p>
            <p>KOLOPEDIA is a fictional project demonstrating React & Tailwind capabilities.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
