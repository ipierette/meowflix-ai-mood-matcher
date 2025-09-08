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
    <Card className="p-6 h-full flex flex-col bg-card/90 backdrop-blur-sm border-border">
      <div className="flex items-center gap-3 mb-6">
        <Cat className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-semibold text-foreground">
          Como você está se sentindo hoje?
        </h2>
      </div>
      
      <div className="flex-1 mb-6">
        <p className="text-muted-foreground mb-4">
          Descreva seu humor, estado de espírito ou o tipo de filme que você gostaria de assistir. 
          Nossa IA vai encontrar o filme perfeito para você! 🐱
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex: Estou me sentindo nostálgico e quero algo que me faça chorar... ou talvez algo engraçado para melhorar meu humor!"
            className="min-h-[120px] resize-none bg-input/50 border-border text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="w-full font-semibold py-3"
            variant="netflix"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procurando o filme perfeito...
              </div>
            ) : (
              <div className="flex items-center gap-2">
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