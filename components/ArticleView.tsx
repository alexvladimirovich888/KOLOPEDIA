
import React from 'react';
import { KolData } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ArticleViewProps {
  kol: KolData;
  onTagClick: (tag: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ kol, onTagClick }) => {
  const chartData = [
    { name: 'Wins', value: kol.stats.positions.win, fill: '#4ade80' },
    { name: 'Losses', value: kol.stats.positions.loss, fill: '#f87171' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1 order-2 md:order-1">
        <h1 className="text-3xl font-serif border-b border-wiki-border pb-2 mb-4 flex items-center gap-2">
          {kol.name}
          <span className="text-sm font-sans text-gray-500 font-normal">({kol.handle})</span>
        </h1>

        <div className="wiki-content space-y-6 text-wiki-text leading-relaxed">
          <section>
            <p>{kol.intro}</p>
          </section>

          {/* Table of Contents (Simple) */}
          <div className="bg-wiki-panel border border-wiki-border p-3 inline-block min-w-[200px]">
            <strong className="block text-center mb-2">Contents</strong>
            <ul className="list-decimal pl-5 text-sm space-y-1">
              <li><a href="#career">Career & Strategy</a></li>
              <li><a href="#stats">Statistics</a></li>
              <li><a href="#unique">Description & Details</a></li>
              <li><a href="#fanfics">Fanfics</a></li>
            </ul>
          </div>

          <section id="career">
            <h2 className="text-xl font-serif border-b border-wiki-border pb-1 mb-3">Career & Strategy</h2>
            <p>{kol.career}</p>
          </section>

          <section id="stats">
            <h2 className="text-xl font-serif border-b border-wiki-border pb-1 mb-3">Statistics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse border border-gray-300 mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Metric</th>
                    <th className="border p-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Total Positions</td><td className="border p-2">{kol.stats.positions.total}</td></tr>
                  <tr><td className="border p-2">Trades</td><td className="border p-2">{kol.stats.trades.total}</td></tr>
                  <tr><td className="border p-2">Volume</td><td className="border p-2">{kol.stats.volume}</td></tr>
                  <tr><td className="border p-2">Avg Hold Time</td><td className="border p-2">{kol.stats.avgHoldTime}</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="h-64 w-full border border-gray-200 p-4 rounded bg-white mt-4">
                <h3 className="text-center text-sm font-bold mb-2">Win/Loss Ratio (Positions)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={60} />
                        <Tooltip />
                        <Bar dataKey="value" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </section>

          <section id="unique">
            <h2 className="text-xl font-serif border-b border-wiki-border pb-1 mb-3">Description & Details</h2>
            <p className="mb-2"><strong>Persona:</strong> {kol.uniqueDescription}</p>
            <p>{kol.details}</p>
          </section>

          <section id="fanfics">
            <h2 className="text-xl font-serif border-b border-wiki-border pb-1 mb-3">Fanfics</h2>
            <div className="space-y-4">
              {kol.fanfics.map((fic, idx) => (
                <div key={idx} className="bg-yellow-50 p-4 border border-yellow-200 rounded">
                  <h3 className="font-bold text-lg mb-2 italic">"{fic.title}"</h3>
                  <p className="italic text-gray-700">{fic.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="categories">
             <h2 className="text-xl font-serif border-b border-wiki-border pb-1 mb-3">Categories</h2>
             <div className="flex gap-2 flex-wrap">
                {kol.tags.map(tag => (
                    <button 
                        key={tag} 
                        onClick={() => onTagClick(tag)}
                        className="text-blue-600 hover:underline text-sm border-r border-gray-300 pr-2 last:border-0"
                    >
                        {tag}
                    </button>
                ))}
             </div>
          </section>
        </div>
      </div>

      {/* InfoBox (Sidebar) */}
      <div className="w-full md:w-80 order-1 md:order-2 shrink-0">
        <div className="border border-gray-300 bg-wiki-panel p-4 text-sm shadow-sm">
            <div className="text-center mb-4">
                <h2 className="font-bold text-lg bg-gray-200 p-1 mb-2">{kol.name}</h2>
                <img 
                    src={kol.avatarUrl}
                    alt={kol.name} 
                    className="mx-auto border border-gray-400 w-32 h-32 object-cover"
                />
                <p className="text-xs text-gray-500 mt-1">{kol.handle}</p>
            </div>
            
            <table className="w-full text-left">
                <tbody>
                    <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">Rank</th><td className="py-1">#{kol.stats.rank}</td></tr>
                    <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">PNL (SOL)</th><td className="py-1 font-bold text-green-700">{kol.stats.pnlSol}</td></tr>
                    {kol.stats.pnlUsd && <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">PNL (USD)</th><td className="py-1">{kol.stats.pnlUsd}</td></tr>}
                    <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">Win Rate</th><td className="py-1">{kol.stats.winRate}</td></tr>
                    <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">Joined</th><td className="py-1">{kol.joinDate}</td></tr>
                    {kol.location && <tr className="border-b border-gray-200"><th className="py-1 pr-2 align-top">Location</th><td className="py-1">{kol.location}</td></tr>}
                    <tr>
                        <th className="py-1 pr-2 align-top pt-2">Links</th>
                        <td className="py-1 pt-2">
                            <a href={kol.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                Twitter (X)
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
