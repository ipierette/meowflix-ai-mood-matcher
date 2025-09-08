import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar } from "lucide-react";
import meowflixLogo from "@/assets/meowflix-logo.png";

interface MovieRecommendation {
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  synopsis: string;
  reason: string;
  poster?: string;
}

interface RecommendationDisplayProps {
  recommendation: MovieRecommendation | null;
  isLoading: boolean;
}

const RecommendationDisplay = ({ recommendation, isLoading }: RecommendationDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 h-full bg-card/90 backdrop-blur-sm border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!recommendation) {
    return (
      <Card className="p-6 h-full bg-card/90 backdrop-blur-sm border-border flex flex-col items-center justify-center text-center">
        <img 
          src={meowflixLogo} 
          alt="MeowFlix" 
          className="w-20 h-20 mb-4 opacity-60"
        />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          Seu filme perfeito aparecerá aqui
        </h3>
        <p className="text-muted-foreground">
          Descreva como você está se sentindo e nossa IA felina encontrará o filme ideal para você! 🎬
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full bg-card/90 backdrop-blur-sm border-border overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={meowflixLogo} 
            alt="MeowFlix" 
            className="w-8 h-8"
          />
          <h2 className="text-xl font-semibold text-accent">
            Seu filme perfeito
          </h2>
        </div>

        {/* Movie Title */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {recommendation.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {recommendation.year}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recommendation.duration}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent" />
              {recommendation.rating}/10
            </div>
          </div>
        </div>

        {/* Genre Badge */}
        <Badge variant="secondary" className="w-fit">
          {recommendation.genre}
        </Badge>

        {/* Synopsis */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Sinopse</h4>
          <p className="text-muted-foreground leading-relaxed">
            {recommendation.synopsis}
          </p>
        </div>

        {/* AI Reason */}
        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
            🤖 Por que este filme é perfeito para você
          </h4>
          <p className="text-foreground leading-relaxed">
            {recommendation.reason}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationDisplay;