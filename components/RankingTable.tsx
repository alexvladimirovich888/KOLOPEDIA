
import React, { useState } from 'react';
import { KolData } from '../types';

interface RankingTableProps {
  data: KolData[];
  onKolClick: (id: string) => void;
  limit?: number;
}

export const RankingTable: React.FC<RankingTableProps> = ({ data, onKolClick, limit }) => {
  const [sortField, setSortField] = useState<keyof KolData['stats']>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof KolData['stats']) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Helper to parse value for sorting
  const parseValue = (kol: KolData, field: keyof KolData['stats']) => {
    const val = kol.stats[field];
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      if (field === 'winRate') return parseFloat(val.replace('%', ''));
      if (field === 'pnlSol') return parseFloat(val.replace(/[+ SOL]/g, ''));
    }
    return 0; // Default fallback
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = parseValue(a, sortField);
    const valB = parseValue(b, sortField);
    return sortDirection === 'asc' ? valA - valB : valB - valA;
  });

  const displayData = limit ? sortedData.slice(0, limit) : sortedData;

  return (
    <div className="overflow-x-auto shadow-sm border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
          <tr>
            <th 
                className="p-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('rank')}
            >
                Rank {sortField === 'rank' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="p-3">Name</th>
            <th 
                className="p-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('pnlSol')}
            >
                PNL (SOL) {sortField === 'pnlSol' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
                className="p-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('winRate')}
            >
                Win Rate {sortField === 'winRate' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="p-3 hidden md:table-cell">Positions (W/L)</th>
            <th className="p-3 hidden md:table-cell">Volume</th>
            <th className="p-3 hidden md:table-cell">Avg Hold</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {displayData.map((kol) => (
            <tr key={kol.id} className="hover:bg-blue-50 transition-colors">
              <td className="p-3 text-center font-mono text-gray-500">{kol.stats.rank}</td>
              <td className="p-3">
                <button 
                  onClick={() => onKolClick(kol.id)}
                  className="text-blue-600 hover:underline font-medium text-left flex items-center gap-2"
                >
                  <img src={kol.avatarUrl} className="w-6 h-6 rounded-full border border-gray-300 object-cover" alt="" />
                  {kol.name}
                </button>
              </td>
              <td className="p-3 text-green-700 font-medium">{kol.stats.pnlSol}</td>
              <td className="p-3">{kol.stats.winRate}</td>
              <td className="p-3 hidden md:table-cell text-gray-600">
                {kol.stats.positions.win}/{kol.stats.positions.loss}
              </td>
              <td className="p-3 hidden md:table-cell text-gray-600">{kol.stats.volume}</td>
              <td className="p-3 hidden md:table-cell text-gray-600">{kol.stats.avgHoldTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {limit && data.length > limit && (
          <div className="p-2 text-right bg-gray-50 border-t border-gray-200">
             <span className="text-gray-500 text-xs italic">Showing top {limit} of {data.length}</span>
          </div>
      )}
    </div>
  );
};
