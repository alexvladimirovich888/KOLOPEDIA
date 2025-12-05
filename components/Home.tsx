
import React from 'react';
import { KolData } from '../types';
import { RankingTable } from './RankingTable';
import { NEWS } from '../constants';

interface HomeProps {
  kols: KolData[];
  onKolClick: (id: string) => void;
  onTagClick: (tag: string) => void;
  featuredKol: KolData;
  categories: string[];
}

export const Home: React.FC<HomeProps> = ({ kols, onKolClick, onTagClick, featuredKol, categories }) => {
  return (
    <div className="space-y-8">
      {/* Intro Section */}
      <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm">
        <h2 className="text-2xl font-serif text-gray-800 mb-2 border-b border-gray-200 pb-2">
          Welcome to KOLOPEDIA
        </h2>
        <p className="text-gray-700 leading-relaxed">
          An encyclopedia of key opinion leaders in cryptocurrency trading. Here are collected biographies, statistics, and inspiring stories of top traders. Explore the legends of the Solana blockchain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Featured & Ranking */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Featured Article */}
          <section className="bg-green-50 border border-green-200 p-4 rounded-sm">
            <h3 className="text-xl font-serif text-green-900 mb-2 flex items-center gap-2">
              <span>★</span> Featured Article: {featuredKol.name}
            </h3>
            <div className="flex gap-4">
               <img src={featuredKol.avatarUrl} alt={featuredKol.name} className="w-24 h-24 object-cover border border-gray-300 bg-white p-1" />
               <div>
                  <p className="text-sm text-gray-800 mb-3 line-clamp-3">{featuredKol.intro}</p>
                  <button 
                    onClick={() => onKolClick(featuredKol.id)}
                    className="text-blue-600 hover:underline font-bold text-sm"
                  >
                    Read more...
                  </button>
               </div>
            </div>
          </section>

          {/* Top Ranking Preview */}
          <section>
            <h3 className="text-xl font-serif text-gray-800 mb-3 border-b border-gray-200 pb-1">Top Ranking</h3>
            <RankingTable data={kols} onKolClick={onKolClick} limit={10} />
            <div className="mt-2 text-right">
                <button 
                    onClick={() => onKolClick('ALL')} // Slight hack to trigger list view via parent if needed, handled in App
                    className="text-blue-600 hover:underline text-sm"
                >
                    View Full Ranking &rarr;
                </button>
            </div>
          </section>

        </div>

        {/* Right Column: Categories & News */}
        <div className="space-y-6">
          
          {/* Categories */}
          <div className="bg-gray-50 border border-gray-200 p-4">
             <h3 className="font-bold text-gray-700 mb-3 uppercase text-xs tracking-wider">Categories</h3>
             <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => onTagClick(cat)}
                        className="text-blue-600 text-sm hover:underline block w-full text-left py-1 border-b border-gray-200 last:border-0"
                    >
                        {cat}
                    </button>
                ))}
             </div>
          </div>

          {/* Crypto News */}
          <div className="bg-white border border-gray-200 p-4">
            <h3 className="font-bold text-gray-700 mb-3 uppercase text-xs tracking-wider">Crypto News</h3>
            <ul className="space-y-3">
                {NEWS.map(news => (
                    <li key={news.id} className="text-sm">
                        <a href="#" className="text-blue-600 hover:underline font-medium block">{news.title}</a>
                        <span className="text-xs text-gray-500">{news.date}</span>
                    </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
