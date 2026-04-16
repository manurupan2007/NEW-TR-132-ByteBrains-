import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AnalysisResult } from '../types';

interface DashboardTabProps {
  history: AnalysisResult[];
  onReset?: () => void;
}

export default function DashboardTab({ history, onReset }: DashboardTabProps) {
  // Derive historical data from history prop
  const trendData = history.map((res, index) => ({
    time: index + 1,
    riskScore: res.intensity,
    date: new Date(res.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  // Ensure fallback data matches the type { time: number; riskScore: number; date: string; }
  const defaultTrendData = [{ time: 0, riskScore: 0, date: '--:--' }];

  // Derive distribution
  const distribution = [
    { name: 'None', count: history.filter(h => h.riskLevel === 'None').length },
    { name: 'Mild', count: history.filter(h => h.riskLevel === 'Mild').length },
    { name: 'Moderate', count: history.filter(h => h.riskLevel === 'Moderate').length },
    { name: 'Crisis', count: history.filter(h => h.riskLevel === 'Crisis').length },
  ];

  const totalScans = history.length;
  const activeAlerts = history.filter(h => h.riskLevel === 'Crisis' || h.riskLevel === 'Moderate').length;
  const avgConfidence = history.length > 0 
    ? (history.reduce((acc, curr) => acc + curr.confidence, 0) / history.length * 100).toFixed(1)
    : '0.0';
  const interventions = history.filter(h => h.riskLevel !== 'None').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase">Sentinel Core Node: 2026.16.04</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-zinc-400 text-xs font-mono">LIVE FEED RECEPTOR ACTIVE</span>
          </div>
          {onReset && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-mono text-[10px] uppercase h-9"
            >
              Reset Mission Data
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Scans', value: totalScans.toString(), icon: Activity, trend: history.length > 0 ? '+1' : '0' },
          { label: 'Active Alerts', value: activeAlerts.toString(), icon: AlertTriangle, trend: activeAlerts > 0 ? '+1' : '0', color: 'text-orange-500' },
          { label: 'Avg Confidence', value: `${avgConfidence}%`, icon: CheckCircle2, trend: 'STABLE' },
          { label: 'Interventions', value: interventions.toString(), icon: TrendingUp, trend: interventions > 0 ? '+1' : '0' },
        ].map((stat, i) => (
          <Card key={i} className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <stat.icon className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider font-bold">{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-orange-500" />
              <CardTitle className="text-white text-lg font-mono">Historical Risk Aggregation</CardTitle>
            </div>
            <CardDescription className="text-zinc-500">Live signal intensity tracking per scan</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData.length > 0 ? trendData : defaultTrendData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f97316' }}
                  labelStyle={{ color: '#71717a', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="riskScore" 
                  stroke="#f97316" 
                  fillOpacity={1} 
                  fill="url(#colorRisk)" 
                  strokeWidth={2}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <CardTitle className="text-white text-lg font-mono">Risk Distribution</CardTitle>
            </div>
            <CardDescription className="text-zinc-500">Categorical frequency of mission signals</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  allowDecimals={false}
                />
                <Tooltip 
                   cursor={{ fill: '#18181b' }}
                   contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#f97316" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
