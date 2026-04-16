import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldAlert, Cpu, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

import { Button } from '../components/ui/button';

export default function SummaryTab({ onStart }: { onStart?: () => void }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
             <div className="w-16 h-16 bg-white flex items-center justify-center p-2">
                <div className="flex flex-col items-center justify-center border-2 border-black p-1 w-full h-full">
                  <div className="text-[8px] font-black leading-none">TENSOR</div>
                  <div className="w-full h-0.5 bg-black my-0.5" />
                  <div className="text-[10px] font-bold">BYTE</div>
                </div>
             </div>
             <div className="absolute -top-4 -right-4 bg-orange-600 text-black px-2 py-0.5 text-[8px] font-bold rotate-12">
               PS49
             </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-mono uppercase tracking-widest">
          <Activity className="w-3 h-3" />
          Mission Assignment: PS49
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-sans tracking-tighter text-white mb-2 uppercase">
          TENSOR '26: <span className="text-orange-500">Sentinel</span>.ai
        </h1>
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase">Assigned Team</p>
          <p className="text-orange-500 font-bold text-lg font-mono tracking-widest uppercase">Byte Brains</p>
        </div>

        <div className="pt-6 pb-2">
          <Button 
            onClick={onStart}
            size="lg"
            className="group relative overflow-hidden bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest uppercase font-mono px-12 py-6 rounded-full shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(234,88,12,0.8)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Activity className="w-5 h-5 group-hover:animate-pulse" />
              START ANALYSIS
            </span>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                <Target className="w-6 h-6 text-black" />
              </div>
              <CardTitle className="text-md font-bold uppercase text-white tracking-widest">Mission Directives</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400 text-xs leading-relaxed space-y-4">
              <p className="font-bold text-zinc-300">Passive Mental Health Distress Detection</p>
              <p>
                Build an NLP pipeline that monitors anonymized public social media posts and detects signals of crisis-level distress—such as self-harm ideation or acute depression.
              </p>
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                 <p className="text-[10px] uppercase font-bold text-orange-500">Input Parameters</p>
                 <ul className="grid grid-cols-1 gap-1 opacity-80">
                   <li>• Anonymized social text feed (Reddit API)</li>
                   <li>• Mental health domain seed list</li>
                   <li>• Regional intervention database</li>
                 </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded bg-orange-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-black" />
              </div>
              <CardTitle className="text-md font-bold uppercase text-white tracking-widest">Expected Outputs</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400 text-xs leading-relaxed space-y-4">
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-orange-500">01.</span> 
                  <span>Severity classification (None / Mild / Moderate / Crisis)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500">02.</span> 
                  <span>Flagged post clusters by theme (loneliness, hopelessness, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500">03.</span> 
                  <span>Automated resource suggestion matched to severity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500">04.</span> 
                  <span>Trend dashboard showing distress signal volume over time</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="space-y-1">
          <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Metrics: F1-Score</p>
          <p className="text-white font-mono text-xs">Crisis Recall focus</p>
        </div>
        <div className="space-y-1">
          <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Metrics: FP Rate</p>
          <p className="text-white font-mono text-xs">Avoid Over-flagging</p>
        </div>
        <div className="space-y-1">
          <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Metrics: Matching</p>
          <p className="text-white font-mono text-xs">Human-rated Relevance</p>
        </div>
        <div className="space-y-1">
          <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Metrics: Throughput</p>
          <p className="text-white font-mono text-xs">Real-time Latency (Gemini-3)</p>
        </div>
      </motion.div>

      <div className="text-center pt-8 text-[10px] font-mono text-zinc-700">
        WWW.TENSOR26.IN // GENERATED ON: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
