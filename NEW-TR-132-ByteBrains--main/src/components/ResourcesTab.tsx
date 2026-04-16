import React from 'react';
import { ExternalLink, Phone, Globe, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { RESOURCES } from '../lib/resources';

export default function ResourcesTab() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Intervention Library</h2>
        <p className="text-zinc-500">Global and regional support nodes prioritized by severity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((resource) => (
          <Card key={resource.id} className="bg-zinc-950 border-zinc-800 hover:border-orange-500/50 transition-colors group">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={
                  resource.category === 'Crisis' ? 'destructive' : 
                  resource.category === 'Support' ? 'secondary' : 'outline'
                } className="font-mono text-[10px] uppercase">
                  {resource.category}
                </Badge>
                <span className="text-zinc-600 font-mono text-[10px]">{resource.region}</span>
              </div>
              <CardTitle className="text-white group-hover:text-orange-500 transition-colors">{resource.title}</CardTitle>
              <CardDescription className="text-zinc-400 line-clamp-2">
                {resource.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resource.contact && (
                <div className="flex items-center justify-center gap-2 text-sm text-white font-mono bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span className="tracking-tighter font-bold">{resource.contact}</span>
                </div>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:text-white flex items-center justify-center gap-2"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Visit Site
                </Button>
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-orange-500">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-orange-500/5 border-orange-500/20 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-orange-500">Emergency Protocol</h3>
            <p className="text-sm text-zinc-400 max-w-md">
              If someone is in immediate danger, please contact local emergency services (911 in the USA/Canada, 999 in UK, 000 in Australia).
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
            onClick={() => window.open("https://findahelpline.com/", "_blank")}
          >
            Global Helpline Search
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
