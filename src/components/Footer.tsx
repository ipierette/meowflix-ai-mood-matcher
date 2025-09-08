import { Github, Linkedin, ExternalLink, Coffee } from "lucide-react";
import meowflixLogo from "@/assets/meowflix-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8 px-6 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Version */}
          <div className="flex items-center gap-3">
            <img 
              src={meowflixLogo} 
              alt="MeowFlix Logo" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-center md:text-left">
              <span className="text-sm font-semibold">
                <span className="text-foreground">Meow</span>
                <span className="netflix-red">Flix</span>
              </span>
              <div className="text-xs text-muted-foreground">v1.0</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center">
            © 2024 MeowFlix - Desenvolvido com 💜 por Izadora Pierette
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://izadorapierette.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
              title="Portfólio"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://ko-fi.com/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
              title="Apoie no Ko-fi"
            >
              <Coffee className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;