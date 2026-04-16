import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Upload, Image as ImageIcon, X, AlertCircle, FileText, Loader2, Sparkles, BrainCircuit, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { analyzePost } from '../lib/gemini';
import { AnalysisResult } from '../types';
import ReportModal from './ReportModal';

import { RESOURCES } from '../lib/resources';

interface AnalyzeTabProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export default function AnalyzeTab({ onAnalysisComplete }: AnalyzeTabProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const getRecommendedResource = (risk: string) => {
    if (risk === 'Crisis') return RESOURCES.find(r => r.category === 'Crisis');
    if (risk === 'Moderate' || risk === 'Mild') return RESOURCES.find(r => r.category === 'Support');
    return RESOURCES.find(r => r.category === 'Self-Help');
  };

  const handlesResourceClick = (url: string) => {
    window.open(url, '_blank');
  };
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAnalysis = useCallback(async (currentText: string, currentImage: string | null) => {
    if (!currentText.trim() && !currentImage) {
      setResult(null);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzePost(currentText, currentImage ? currentImage.split(',')[1] : undefined);
      setResult(analysis);
      if (onAnalysisComplete) {
        onAnalysisComplete(analysis);
      }
    } catch (err) {
      setError('Signal analysis failed. Please retry.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    if (!text.trim() && !image) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      handleAnalysis(text, image);
    }, 2000); // 2-second debounce

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, image, handleAnalysis]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Crisis': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Moderate': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'Mild': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                Signal Receptor
              </h3>
              <div className="flex items-center gap-2">
                 {isAnalyzing && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[10px] text-orange-500 font-mono"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    ANALYZING...
                  </motion.div>
                 )}
                 {!isAnalyzing && result && (
                  <div className="flex items-center gap-2 text-[10px] text-green-500 font-mono uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Synced
                  </div>
                 )}
              </div>
            </div>

            <Card className="bg-zinc-950 border-zinc-800 focus-within:border-orange-500/50 transition-colors">
              <CardContent className="p-0">
                <Textarea 
                  placeholder="Paste anonymized public post text (Reddit / CLPsych / CSSRS) for mission-level analysis..."
                  className="min-h-[220px] bg-transparent border-0 text-white placeholder:text-zinc-600 focus-visible:ring-0 resize-none p-4 font-sans leading-relaxed text-sm"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                
                <div className="p-2 border-t border-zinc-900 flex items-center justify-between bg-zinc-900/30">
                  <div className="flex items-center gap-2">
                    <input 
                      type="file" 
                      id="image-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label 
                      htmlFor="image-upload" 
                      className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Attach Screenshot
                    </label>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 italic">
                    Debounced monitoring active
                  </div>
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {image && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group w-40 aspect-video rounded-lg overflow-hidden border border-zinc-800"
                >
                  <img src={image} alt="Upload" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              Intelligence Layer (Gemini-3)
            </h3>
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 leading-relaxed font-mono italic">
              "The intelligence layer processes multimodal signals to identify latent distress markers. All analysis is local to this session under Mission-PS49 protocols."
            </div>
          </div>
        </div>

        {/* Right: Real-time Analysis Result */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-500" />
            Live Metrics
          </h3>

          {!result && !isAnalyzing && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Activity className="w-6 h-6 text-zinc-700" />
              </div>
              <p className="text-zinc-500 text-sm italic">"Awaiting signal input for risk assessment..."</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 border border-zinc-800 bg-zinc-950 rounded-xl space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-orange-500/20 flex items-center justify-center">
                   <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-orange-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-orange-500 font-mono text-sm uppercase tracking-widest animate-pulse">Scanning Neural Markers</p>
                <p className="text-zinc-500 text-[10px] font-mono">Mission-PS49 Protocol v3.0</p>
              </div>
            </div>
          )}

          <AnimatePresence>
            {result && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
                  <div className={`h-1.5 w-full ${result.riskLevel === 'Crisis' ? 'bg-red-500' : result.riskLevel === 'Moderate' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-zinc-500 text-[10px] font-mono uppercase">Risk Stratification</p>
                        <Badge className={`text-lg px-4 py-1.5 ${getRiskColor(result.riskLevel)}`}>
                          {result.riskLevel}
                        </Badge>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-zinc-500 text-[10px] font-mono uppercase">Confidence Index</p>
                        <p className="text-2xl font-bold font-mono text-white">{(result.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                        <span>Intensity Magnitude</span>
                        <span>{result.intensity}/100</span>
                      </div>
                      <Progress value={result.intensity} className="h-2 bg-zinc-900" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-500 text-[10px] font-mono uppercase">Thematic Markers</p>
                      <div className="flex flex-wrap gap-2">
                        {result.keyThemes.map((theme, i) => (
                          <span key={i} className="px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-400 font-mono">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded border border-orange-500/10 bg-orange-500/5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-orange-500">
                        <AlertCircle className="w-4 h-4" />
                        Intelligence Summary
                      </div>
                      <p className="text-xs text-zinc-300 italic leading-relaxed">
                        "{result.summary}"
                      </p>
                    </div>

                    {getRecommendedResource(result.riskLevel) && (
                      <div className="space-y-3 pt-4 border-t border-zinc-900">
                        <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Recommended Intervention</p>
                        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                           <div className="flex justify-between items-center">
                             <h4 className="text-xs font-bold text-white">{getRecommendedResource(result.riskLevel)?.title}</h4>
                             <Badge className="text-[8px] h-4 uppercase">{getRecommendedResource(result.riskLevel)?.category}</Badge>
                           </div>
                           <p className="text-[10px] text-zinc-400 line-clamp-1">{getRecommendedResource(result.riskLevel)?.description}</p>
                           <Button 
                             variant="outline" 
                             size="sm" 
                             className="w-full mt-2 bg-zinc-950 border-zinc-800 text-[10px] h-7 hover:bg-zinc-800"
                             onClick={() => handlesResourceClick(getRecommendedResource(result.riskLevel)?.url || '')}
                           >
                             Access Resource Node
                           </Button>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-tight"
                      onClick={() => setIsReportOpen(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Clinical Report
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </div>
      </div>

      <ReportModal 
        isOpen={isReportOpen} 
        onOpenChange={setIsReportOpen} 
        result={result}
      />
    </div>
  );
}
