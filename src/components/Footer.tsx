import { Github, Linkedin, ExternalLink, Coffee } from "lucide-react";

const Footer = () => {
  return (
  <footer className="accessibility-card border-t border-border py-4 px-6 mt-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="high-contrast-text text-sm text-left">
            © 2024 MeowFlix - Desenvolvido com 💜 por Izadora Pierette
          </div>

          {/* Right: social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-enhanced text-foreground hover:text-accent transition-colors p-2 rounded-md hover:bg-accent/5"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-enhanced text-foreground hover:text-accent transition-colors p-2 rounded-md hover:bg-accent/5"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://izadorapierette.com"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-enhanced text-foreground hover:text-accent transition-colors p-2 rounded-md hover:bg-accent/5"
              title="Portfólio"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="https://ko-fi.com/izadorapierette"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-enhanced text-foreground hover:text-accent transition-colors p-2 rounded-md hover:bg-accent/5"
              title="Apoie no Ko-fi"
            >
              <Coffee className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;