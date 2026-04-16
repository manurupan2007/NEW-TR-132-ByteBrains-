import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { Target, Activity, LayoutDashboard, HeartPulse, Cpu } from 'lucide-react';
import SummaryTab from './components/SummaryTab';
import AnalyzeTab from './components/AnalyzeTab';
import DashboardTab from './components/DashboardTab';
import ResourcesTab from './components/ResourcesTab';
import { AnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    const saved = localStorage.getItem('sentinel_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sentinel_history', JSON.stringify(history));
  }, [history]);

  const handleNewAnalysis = (result: AnalysisResult) => {
    setHistory(prev => [...prev, result]);
  };

  const resetHistory = () => {
    if (confirm('Are you sure you want to purge all mission signal history? This action cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem('sentinel_history');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('summary')}>
            <div className="p-1.5 rounded-lg bg-orange-600 group-hover:bg-orange-500 transition-colors">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tighter">Sentinel.<span className="text-orange-500">ai</span></span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:flex">
            <TabsList className="bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="summary" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-2">
                <Target className="w-4 h-4" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="analyze" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Analyze
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4" />
                Resources
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-500 border-l border-zinc-800 pl-4 h-8 uppercase tracking-widest">
              <Cpu className="w-3 h-3 text-orange-500" />
              Node: ALPHA-9
            </div>
            <div className="md:hidden">
              {/* Simple Mobile Nav Toggle could go here if needed, but tabs are usually okayish at small scales if short */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="summary" className="m-0 focus-visible:ring-0">
            <SummaryTab />
          </TabsContent>
          <TabsContent value="analyze" className="m-0 focus-visible:ring-0">
            <AnalyzeTab onAnalysisComplete={handleNewAnalysis} />
          </TabsContent>
          <TabsContent value="dashboard" className="m-0 focus-visible:ring-0">
            <DashboardTab history={history} onReset={resetHistory} />
          </TabsContent>
          <TabsContent value="resources" className="m-0 focus-visible:ring-0">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer System Status */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] uppercase font-mono tracking-widest">
            © 2026 Sentinel Neural Defense • Mission-PS49 Internal Node
          </p>
          <div className="flex items-center gap-4 text-zinc-600 text-[10px] uppercase font-mono tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Intelligence Online
            </span>
            <span className="hidden sm:inline border-l border-zinc-800 h-3" />
            <span className="cursor-help">Privacy Protocols</span>
            <span className="hidden sm:inline border-l border-zinc-800 h-3" />
            <span className="cursor-help text-orange-500/80">Support Node</span>
          </div>
        </div>
      </footer>

      <Toaster theme="dark" position="bottom-right" closeButton />
    </div>
  );
}
