
"use client";

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Search, ArrowUp, ArrowDown, Minus, Settings2, RefreshCw, LayoutGrid, BarChart2, Plus, Filter } from "lucide-react";
import Image from 'next/image';

interface StockData {
  id: string;
  logo: string;
  logoHint: string;
  symbol: string;
  name: string;
  price: number;
  currency: string;
  changePercent: number;
  volume: string;
  relVolume: number;
  marketCap: string;
  peRatio: number | null;
  epsTtm: number | null;
  epsDilGrowthYoy: number | null;
  divYieldTtm: number | null;
  sector: string;
  analystRating: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
}

const mockStockData: StockData[] = [
  {
    id: "msft",
    logo: "https://placehold.co/24x24/4A90E2/FFFFFF.png",
    logoHint: "microsoft logo",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 458.68,
    currency: "USD",
    changePercent: 0.29,
    volume: "13.94M",
    relVolume: 0.72,
    marketCap: "3.41T USD",
    peRatio: 35.45,
    epsTtm: 12.94,
    epsDilGrowthYoy: 12.13,
    divYieldTtm: 0.69,
    sector: "Technology services",
    analystRating: "Strong Buy",
  },
  {
    id: "nvda",
    logo: "https://placehold.co/24x24/7ED321/FFFFFF.png",
    logoHint: "nvidia logo",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 139.19,
    currency: "USD",
    changePercent: 3.25,
    volume: "367.89M",
    relVolume: 1.64,
    marketCap: "3.39T USD",
    peRatio: 44.83,
    epsTtm: 3.10,
    epsDilGrowthYoy: 81.60,
    divYieldTtm: 0.03,
    sector: "Electronic technology",
    analystRating: "Strong Buy",
  },
  {
    id: "aapl",
    logo: "https://placehold.co/24x24/B8B8B8/000000.png",
    logoHint: "apple logo",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 199.95,
    currency: "USD",
    changePercent: -0.23,
    volume: "51.23M",
    relVolume: 0.98,
    marketCap: "2.99T USD",
    peRatio: 31.20,
    epsTtm: 6.41,
    epsDilGrowthYoy: -0.36,
    divYieldTtm: 0.50,
    sector: "Electronic technology",
    analystRating: "Buy",
  },
  {
    id: "amzn",
    logo: "https://placehold.co/24x24/FF9900/FFFFFF.png",
    logoHint: "amazon logo",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 205.70,
    currency: "USD",
    changePercent: 0.48,
    volume: "34.56M",
    relVolume: 0.89,
    marketCap: "2.18T USD",
    peRatio: 33.55,
    epsTtm: 6.13,
    epsDilGrowthYoy: 72.20,
    divYieldTtm: 0.00,
    sector: "Retail trade",
    analystRating: "Strong Buy",
  },
  {
    id: "goog",
    logo: "https://placehold.co/24x24/EA4335/FFFFFF.png",
    logoHint: "google logo",
    symbol: "GOOG",
    name: "Alphabet Inc.",
    price: 172.96,
    currency: "USD",
    changePercent: -0.24,
    volume: "21.15M",
    relVolume: 0.68,
    marketCap: "2.09T USD",
    peRatio: 19.29,
    epsTtm: 8.97,
    epsDilGrowthYoy: 37.53,
    divYieldTtm: 0.46,
    sector: "Technology services",
    analystRating: "Strong Buy",
  },
  {
    id: "meta",
    logo: "https://placehold.co/24x24/0062E0/FFFFFF.png",
    logoHint: "meta logo",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 645.05,
    currency: "USD",
    changePercent: 0.23,
    volume: "8.83M",
    relVolume: 0.82,
    marketCap: "1.62T USD",
    peRatio: 25.16,
    epsTtm: 25.64,
    epsDilGrowthYoy: 47.26,
    divYieldTtm: 0.31,
    sector: "Technology services",
    analystRating: "Strong Buy",
  },
   {
    id: "tsla",
    logo: "https://placehold.co/24x24/E82127/FFFFFF.png",
    logoHint: "tesla logo",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 358.43,
    currency: "USD",
    changePercent: 0.43,
    volume: "87.47M",
    relVolume: 0.84,
    marketCap: "1.15T USD",
    peRatio: 197.11,
    epsTtm: 1.82,
    epsDilGrowthYoy: -53.53,
    divYieldTtm: 0.00,
    sector: "Consumer durables",
    analystRating: "Neutral",
  },
];

const FilterButton: React.FC<React.PropsWithChildren<{ label: string; defaultOpen?: boolean }>> = ({ label, children }) => (
  <Button variant="outline" size="sm" className="text-xs bg-card hover:bg-muted">
    {children || label} <ChevronDown className="ml-1 h-3 w-3" />
  </Button>
);

const StockScreener: React.FC = () => {
  const getAnalystRatingIcon = (rating: StockData["analystRating"]) => {
    switch (rating) {
      case "Strong Buy":
      case "Buy":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "Neutral":
        return <Minus className="h-4 w-4 text-gray-500" />;
      case "Sell":
      case "Strong Sell":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-xl my-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <Button variant="ghost" className="p-0 h-auto text-xl font-semibold text-foreground hover:bg-transparent">
              Stock Screener <ChevronDown className="ml-1 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">Find investment opportunities by filtering stocks.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" title="Layout Options"><LayoutGrid className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Button>
            <Button variant="ghost" size="icon" title="Chart View"><BarChart2 className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Button>
            <Button variant="ghost" size="icon" title="Refresh Data"><RefreshCw className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Button>
            <Button variant="ghost" size="icon" title="Settings"><Settings2 className="h-5 w-5 text-muted-foreground hover:text-foreground" /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 pb-4 border-b border-border flex flex-wrap items-center gap-2">
          <div className="relative grow sm:grow-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Ticker..." className="pl-9 pr-3 py-2 h-9 text-sm w-full sm:w-48 bg-card" />
          </div>
          <FilterButton label="Market">
            <span role="img" aria-label="US Flag" className="mr-1">🇺🇸</span> US
          </FilterButton>
          <FilterButton label="Market Cap" />
          <FilterButton label="P/E Ratio" />
          <FilterButton label="Volume" />
          <FilterButton label="RSI" />
          <FilterButton label="Sector" />
          <FilterButton label="Analyst Rating" />
          <FilterButton label="Dividend Yield" />
          <FilterButton label="Price" />
          <FilterButton label="EPS Growth" />
          <Button variant="outline" size="sm" className="text-xs bg-card hover:bg-muted p-2" title="Add Filter"><Filter className="h-4 w-4"/></Button>
        </div>

        <Tabs defaultValue="overview">
          <div className="flex justify-between items-center border-b border-border">
            <TabsList className="bg-transparent p-0 overflow-x-auto">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Performance</TabsTrigger>
              <TabsTrigger value="extended_hours" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Extended Hours</TabsTrigger>
              <TabsTrigger value="valuation" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Valuation</TabsTrigger>
              <TabsTrigger value="dividends" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Dividends</TabsTrigger>
              <TabsTrigger value="profitability" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Profitability</TabsTrigger>
              <TabsTrigger value="income_statement" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Income Statement</TabsTrigger>
              <TabsTrigger value="balance_sheet" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cash_flow" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Cash Flow</TabsTrigger>
              <TabsTrigger value="technicals" className="text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none px-3 py-1.5 whitespace-nowrap">Technicals</TabsTrigger>
            </TabsList>
             <div className="relative hidden md:block mr-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Symbol" className="pl-8 pr-2 py-1 h-7 text-xs w-28 bg-card" />
             </div>
          </div>

          <TabsContent value="overview" className="mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-full text-xs">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px] sticky left-0 bg-background z-10">Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change %</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Rel Volume</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Market cap <ArrowDown className="inline h-3 w-3" /></TableHead>
                    <TableHead className="text-right">P/E</TableHead>
                    <TableHead className="text-right whitespace-nowrap">EPS (TTM)</TableHead>
                    <TableHead className="text-right whitespace-nowrap">EPS Growth (YoY)</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Div Yield (TTM)</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Analyst Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStockData.map((stock) => (
                    <TableRow key={stock.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium sticky left-0 bg-background z-10">
                        <div className="flex items-center space-x-2">
                          <Image src={stock.logo} alt={`${stock.name} logo`} width={18} height={18} data-ai-hint={stock.logoHint} className="rounded-full" />
                          <div className="flex flex-col">
                            <span className="font-semibold">{stock.symbol}</span>
                            <span className="text-muted-foreground truncate max-w-[100px] hidden sm:inline">{stock.name}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{stock.price.toFixed(2)} {stock.currency}</TableCell>
                      <TableCell className={`text-right ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">{stock.volume}</TableCell>
                      <TableCell className="text-right">{stock.relVolume.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{stock.marketCap}</TableCell>
                      <TableCell className="text-right">{stock.peRatio?.toFixed(2) || '-'}</TableCell>
                      <TableCell className="text-right">{stock.epsTtm?.toFixed(2) || '-'} {stock.epsTtm ? stock.currency : ""}</TableCell>
                      <TableCell className={`text-right ${stock.epsDilGrowthYoy && stock.epsDilGrowthYoy >= 0 ? 'text-green-500' : stock.epsDilGrowthYoy && stock.epsDilGrowthYoy < 0 ? 'text-red-500' : ''}`}>
                        {stock.epsDilGrowthYoy ? (stock.epsDilGrowthYoy >= 0 ? '+' : '') + stock.epsDilGrowthYoy.toFixed(2) + '%' : '-'}
                      </TableCell>
                      <TableCell className="text-right">{stock.divYieldTtm?.toFixed(2) || '0.00'}%</TableCell>
                      <TableCell className="text-blue-500 hover:underline cursor-pointer whitespace-nowrap">{stock.sector}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 whitespace-nowrap">
                          {getAnalystRatingIcon(stock.analystRating)}
                          <span>{stock.analystRating}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="performance"><p className="p-4 text-center text-muted-foreground">Performance data will be shown here.</p></TabsContent>
          <TabsContent value="extended_hours"><p className="p-4 text-center text-muted-foreground">Extended Hours data will be shown here.</p></TabsContent>
          <TabsContent value="valuation"><p className="p-4 text-center text-muted-foreground">Valuation metrics will be shown here.</p></TabsContent>
          <TabsContent value="dividends"><p className="p-4 text-center text-muted-foreground">Dividend information will be shown here.</p></TabsContent>
          <TabsContent value="profitability"><p className="p-4 text-center text-muted-foreground">Profitability ratios will be shown here.</p></TabsContent>
          <TabsContent value="income_statement"><p className="p-4 text-center text-muted-foreground">Income Statement data will be shown here.</p></TabsContent>
          <TabsContent value="balance_sheet"><p className="p-4 text-center text-muted-foreground">Balance Sheet data will be shown here.</p></TabsContent>
          <TabsContent value="cash_flow"><p className="p-4 text-center text-muted-foreground">Cash Flow data will be shown here.</p></TabsContent>
          <TabsContent value="technicals"><p className="p-4 text-center text-muted-foreground">Technical indicators will be shown here.</p></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StockScreener;

