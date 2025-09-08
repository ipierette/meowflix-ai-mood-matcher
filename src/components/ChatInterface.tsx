import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Cat } from "lucide-react";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface = ({ onSendMessage, isLoading }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <Card className="accessibility-card p-5 md:p-6 h-full flex flex-col rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Cat className="w-6 h-6 text-accent" />
        <h2 className="high-contrast-text text-lg md:text-xl font-semibold">
          Como você está se sentindo hoje?
        </h2>
      </div>

      <div className="flex-1 mb-4">
        <p className="text-muted-foreground mb-4">
          Descreva seu humor, estado de espírito ou o tipo de filme que você gostaria de assistir. Nossa IA vai encontrar o filme perfeito para você! �
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mood-input" className="sr-only">
              Descreva seu humor para receber uma recomendação de filme
            </label>
            <Textarea
              id="mood-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Estou me sentindo nostálgico e quero algo que me faça chorar... ou talvez algo engraçado para melhorar meu humor!"
              className="improved-placeholder focus-enhanced min-h-[140px] md:min-h-[180px] resize-none bg-input/80 border-border text-foreground rounded-lg px-3 py-2"
              disabled={isLoading}
              aria-describedby="mood-description"
              aria-required="true"
            />
            <div id="mood-description" className="sr-only">
              Digite como você está se sentindo hoje para receber uma recomendação personalizada de filme
            </div>
          </div>

          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="focus-enhanced w-full font-semibold py-2 md:py-3 rounded-md"
            variant="netflix"
            aria-label={isLoading ? "Procurando filme..." : "Encontrar filme baseado no seu humor"}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procurando o filme perfeito...
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <Send className="w-4 h-4" />
                Encontrar meu filme
              </div>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;