import React from 'react';
import { motion } from 'framer-motion';
import { Target, Server, ShieldCheck, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function IntegrationTab() {
  const discordInviteUrl = "https://discord.com/oauth2/authorize?client_id=1494466348959400168&permissions=68672&integration_type=0&scope=bot";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-mono uppercase tracking-widest">
          <Server className="w-3 h-3" />
          Neural Server Integration
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tighter text-white uppercase">
          Deploy Sentinel To <span className="text-[#5865F2]">Discord</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs max-w-2xl mx-auto leading-relaxed">
          The Sentinel AI neural core has been packaged into a lightweight background daemon. 
          Deploy the bot to your community server to passively monitor public channels for distress signals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardContent className="p-6 space-y-4">
              <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-widest">Real-time Triage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                The bot reads messages silently in the background and processes them through the local zero-latency Naive Bayes classifier.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardContent className="p-6 space-y-4">
              <div className="w-10 h-10 rounded bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-widest">Privacy First</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Messages are never sent to external LLMs like Google or OpenAI. Processing runs 100% locally on the host node safeguarding user data.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardContent className="p-6 space-y-4">
              <div className="w-10 h-10 rounded bg-[#5865F2]/10 flex items-center justify-center border border-[#5865F2]/30">
                <Activity className="w-5 h-5 text-[#5865F2]" />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-widest">Auto Interventions</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Automatically issues private Direct Messages containing self-care resources or crisis lifelines based on calculated distress severity.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <a 
          href={discordInviteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold tracking-widest uppercase font-mono px-12 py-6 rounded-xl shadow-[0_0_40px_-10px_rgba(88,101,242,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(88,101,242,0.8)] hover:-translate-y-1 flex items-center gap-4"
        >
          <Server className="w-6 h-6 group-hover:scale-110 transition-transform" />
          Deploy Bot To Server
        </a>
      </motion.div>
      
      <div className="text-center pt-8 text-[10px] font-mono text-zinc-700">
        Requires SERVER MANAGEMENT permissions to install.
      </div>
    </div>
  );
}
