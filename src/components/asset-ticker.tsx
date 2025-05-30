
"use client";
import React from 'react';
import { Pyramid, Coffee, Briefcase } from 'lucide-react';

interface TickerAsset {
  id: string;
  symbol: string;
  description: string;
  icon: React.ReactNode;
}

const assets: TickerAsset[] = [
  {
    id: 'eurusd',
    symbol: 'EURUSD',
    description: 'Euro vs U.S. Dollar',
    icon: (
      <div className="flex -space-x-2">
        <div className="w-6 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-white text-[10px] font-bold ring-1 ring-blue-500">EU</div>
        <div className="w-6 h-4 bg-red-700 rounded-sm flex items-center justify-center text-white text-[10px] font-bold ring-1 ring-red-500">US</div>
      </div>
    ),
  },
  {
    id: 'us500',
    symbol: 'US500',
    description: 'S&P 500 (US500)',
    icon: <Briefcase className="w-6 h-6 text-sky-400" />,
  },
  {
    id: 'gold',
    symbol: 'GOLD',
    description: 'Gold',
    icon: <Pyramid className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 'coffee',
    symbol: 'COFFEE',
    description: 'US Coffee',
    icon: <Coffee className="w-6 h-6 text-orange-400" />,
  },
  {
    id: 'apple',
    symbol: 'Apple',
    description: 'Apple (AAPL.OQ)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400">
        <path d="M18.695 13.618c-.006.006-.956 2.938-.956 2.938s1.156.887 2.05.887a2.15 2.15 0 002.206-2.205c0-2.2-2.199-2.904-2.199-2.904s.044-1.395-.819-2.388c-.844-.965-2.131-1.236-2.603-1.254-.07-.006-1.67-.165-3.102 1.086-.143.12-.28.246-.413.372-.114.108-.225.222-.33.33-.818.899-1.455 2.274-1.455 3.685 0 2.728 1.94 4.164 3.691 4.164.944 0 1.98-.503 2.735-1.315zm-2.58-3.028c.044-.635.471-1.224.905-1.605.012-.006.018-.018.03-.024.081-.056.17-.107.26-.155a.63.63 0 01.26-.095c.54-.162 1.25-.048 1.722.311.437.33.665.899.593 1.456-.076.575-.497 1.12-.938 1.49-.012.012-.024.018-.036.03-.075.061-.155.12-.24.174a.619.619 0 01-.245.09c-.534.156-1.229.042-1.69-.311-.425-.324-.654-.876-.581-1.431z" />
      </svg>
    ),
  },
  // Add more assets like stocks, indices, forex, crypto, commodities
    { id: 'tsla', symbol: 'TESLA', description: 'Tesla Inc. (TSLA.OQ)', icon: <Briefcase className="w-6 h-6 text-red-500" /> },
    { id: 'btc', symbol: 'BTCUSD', description: 'Bitcoin vs U.S. Dollar', icon: <Pyramid className="w-6 h-6 text-orange-500" /> },
    { id: 'oil', symbol: 'OIL', description: 'Crude Oil', icon: <Pyramid className="w-6 h-6 text-gray-500" /> },
];

const AssetTicker: React.FC = () => {
  const duplicatedAssets = [...assets, ...assets, ...assets]; // Duplicate for smoother, longer scroll

  return (
    <div className="w-full py-6 bg-background overflow-hidden">
      <div className="text-center text-muted-foreground mb-6 text-sm">
        Easy Access to 1,400+ Global Assets
      </div>
      <div className="relative flex">
        <div className="flex animate-marquee-rtl">
          {duplicatedAssets.map((asset, index) => (
            <div
              key={`${asset.id}-${index}`}
              className="flex-shrink-0 w-auto mx-3 p-4 bg-card rounded-lg shadow-lg flex items-center space-x-3 hover:bg-primary/10 transition-colors cursor-pointer"
              style={{ minWidth: '220px' }} // Adjusted min-width
            >
              <div className="flex-shrink-0 p-2 bg-muted/30 rounded-md">{asset.icon}</div>
              <div>
                <p className="font-semibold text-sm text-foreground">{asset.symbol}</p>
                <p className="text-xs text-muted-foreground">{asset.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AssetTicker;
