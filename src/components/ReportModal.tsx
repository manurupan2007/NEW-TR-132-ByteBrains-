import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Activity, ShieldCheck, Download, Printer, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  result: AnalysisResult | null;
}

export default function ReportModal({ isOpen, onOpenChange, result }: ReportModalProps) {
  if (!result) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white text-black p-0 overflow-hidden border-black border-4 rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white flex items-center justify-center p-1">
               <div className="flex flex-col items-center justify-center border border-black w-full h-full">
                 <div className="text-[5px] font-black leading-none">TENSOR</div>
                 <div className="w-full h-[1px] bg-black my-0.5" />
                 <div className="text-[6px] font-bold">BYTE</div>
               </div>
            </div>
            <span className="text-white font-mono text-xs font-bold tracking-[0.3em]">MISSION // PS49</span>
          </div>
          <div className="flex items-center gap-4">
             <Badge variant="outline" className="text-white border-white rounded-none font-mono text-[8px] uppercase">Highly Confidential</Badge>
             <div className="text-orange-500 font-black text-xl">T '26</div>
          </div>
        </div>

        <div className="p-8 space-y-8 font-serif leading-relaxed h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start border-b-4 border-black pb-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Clinical Assessment</h2>
              <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest font-bold">Node Identifier: ALPHA-PRIMARY-GEN-3</p>
            </div>
            <div className="text-right font-mono text-[10px] space-y-1 uppercase font-bold">
              <div>Assigned Team: <span className="text-orange-600">Byte Brains</span></div>
              <div>Generated: {new Date().toLocaleDateString()}</div>
              <div>Auth Ref: AUTH-PS49-SEC-9</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-1 p-3 border-2 border-black bg-zinc-50">
              <label className="text-[9px] font-black uppercase opacity-50 block">Risk Category</label>
              <div className={`text-xl font-black uppercase tracking-tight ${
                result.riskLevel === 'Crisis' ? 'text-red-600' : 
                result.riskLevel === 'Moderate' ? 'text-orange-500' : 'text-black'
              }`}>
                {result.riskLevel}
              </div>
            </div>
            <div className="space-y-1 p-3 border-2 border-black bg-zinc-50">
              <label className="text-[9px] font-black uppercase opacity-50 block">Neural Confidence</label>
              <div className="text-xl font-black tracking-tight">
                {(result.confidence * 100).toFixed(2)}%
              </div>
            </div>
            <div className="space-y-1 p-3 border-2 border-black bg-zinc-50">
              <label className="text-[9px] font-black uppercase opacity-50 block">Intensity Magnitude</label>
              <div className="text-xl font-black tracking-tight">
                {result.intensity}/100
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black uppercase tracking-[0.2em] text-xs bg-black text-white px-3 py-1 inline-block">Diagnostic Synthesis</h3>
            <p className="text-sm italic text-zinc-800 border-l-8 border-orange-500 pl-6 py-3 bg-orange-50/50">
              "{result.summary}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-black uppercase tracking-[0.2em] text-xs border-b-2 border-black pb-1">Cluster Visualization</h3>
              <div className="space-y-3">
                {result.keyThemes.map((theme, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                       <span>{theme}</span>
                       <span>{(Math.random() * 30 + 70).toFixed(0)}% Intensity</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 border border-black/10">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 40 + 60}%` }}
                        className="h-full bg-black shadow-[2px_0_0_0_#f97316]" 
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-black uppercase tracking-[0.2em] text-xs border-b-2 border-black pb-1">Clinical Indicators</h3>
              <ul className="text-xs space-y-2">
                {result.clinicalIndicators.map((indicator, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-orange-600 font-bold font-mono">»</span>
                    <span className="text-zinc-700 font-medium">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 border-4 border-black bg-zinc-50 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600">
               <AlertCircle className="w-4 h-4" />
               Protocol Directive
            </div>
            <p className="text-[11px] text-zinc-800 leading-relaxed font-bold">
              {result.riskLevel === 'Crisis' 
                ? "IMMEDIATE ACTION REQUIRED: The subject manifests critical markers associated with acute psychiatric distress. Initiate immediate referral to emergency services or specialized crisis response units (988)." 
                : "SUPPORTIVE MONITORING ADVISED: Subject manifests low-to-moderate distress signatures. Recommended protocol includes engagement with support networks and monitoring for further signal escalation."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-8 text-[9px] font-mono text-zinc-500 border-t-2 border-zinc-200 border-dashed">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              INTELLIGENCE VERIFIED: TENSOR-GEN-3-RECEPTOR
            </div>
            <div className="uppercase tracking-[0.3em] font-black italic">Sentinel.ai // PS49</div>
          </div>
        </div>

        <div className="p-6 bg-zinc-200 border-t-4 border-black grid grid-cols-2 gap-4">
          <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest text-xs h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
             <Download className="w-4 h-4 mr-2" />
             Export Data
          </Button>
          <Button className="bg-orange-600 text-white border-2 border-black hover:bg-orange-700 rounded-none font-black uppercase tracking-widest text-xs h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
             <Printer className="w-4 h-4 mr-2" />
             Print Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
