import { useState } from "react";
import Header from "@/components/Header";
import MovieBackground from "@/components/MovieBackground";
import ChatInterface from "@/components/ChatInterface";
import RecommendationDisplay from "@/components/RecommendationDisplay";
import Footer from "@/components/Footer";
import { getMovieRecommendation } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

interface MovieRecommendation {
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  synopsis: string;
  reason: string;
}

const Index = () => {
  const [recommendation, setRecommendation] = useState<MovieRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    try {
      const movieRecommendation = await getMovieRecommendation(message);
      setRecommendation(movieRecommendation);
      
      toast({
        title: "Filme encontrado! 🎬",
        description: "Sua recomendação personalizada está pronta!",
      });
    } catch (error) {
      console.error('Erro ao buscar recomendação:', error);
      toast({
        title: "Ops! Algo deu errado 😿",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <MovieBackground />
      {/* Frosted glass layer to soften the background posters */}
      <div className="frosted-layer" />

      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 lg:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-10 items-start">
          {/* Left column: smaller, chat area */}
          <aside className="order-2 lg:order-1">
            <ChatInterface 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </aside>

          {/* Right column: larger, recommendation area */}
          <section className="order-1 lg:order-2">
            <RecommendationDisplay 
              recommendation={recommendation}
              isLoading={isLoading}
            />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
