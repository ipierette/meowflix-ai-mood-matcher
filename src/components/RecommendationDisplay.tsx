import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar } from "lucide-react";
import meowflixLogo from "@/assets/logo.webp";

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
      <Card className="accessibility-card p-5 md:p-6 h-full rounded-2xl shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-56 md:h-64 bg-muted rounded-lg"></div>
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
      <Card className="accessibility-card p-6 h-full flex flex-col items-center justify-center text-center">
        <img 
          src={meowflixLogo} 
          alt="MeowFlix - Aguardando recomendação" 
          className="w-20 h-20 mb-4 opacity-60"
        />
        <h3 className="high-contrast-text text-xl font-semibold mb-2">
          Seu filme perfeito aparecerá aqui
        </h3>
        <p className="text-muted-foreground">
          Descreva como você está se sentindo e nossa IA felina encontrará o filme ideal para você! 🎬
        </p>
      </Card>
    );
  }

  return (
    <Card className="accessibility-card p-5 md:p-6 h-full lg:min-h-[560px] rounded-2xl shadow-lg overflow-y-auto">
      <div className="space-y-5">
        {/* Poster area (large) */}
        {recommendation.poster && (
          <div className="w-full rounded-lg overflow-hidden mb-4">
            <img src={recommendation.poster} alt={recommendation.title} className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg" />
          </div>
        )}
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={meowflixLogo} 
            alt="MeowFlix - Recomendação gerada" 
            className="w-7 h-7 rounded-md"
          />
          <h2 className="text-lg md:text-xl font-semibold text-accent">
            Seu filme perfeito
          </h2>
        </div>

        {/* Movie Title */}
        <div>
          <h3 className="high-contrast-text text-xl md:text-2xl font-bold mb-2">
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
          <h4 className="high-contrast-text font-semibold mb-2">Sinopse</h4>
          <p className="text-muted-foreground leading-relaxed">
            {recommendation.synopsis}
          </p>
        </div>

        {/* AI Reason */}
        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
            🤖 Por que este filme é perfeito para você
          </h4>
          <p className="high-contrast-text leading-relaxed">
            {recommendation.reason}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationDisplay;