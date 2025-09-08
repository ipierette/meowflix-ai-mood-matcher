import meowflixLogo from "@/assets/logo.webp";

const Header = () => {
  return (
  <header className="bg-card/70 border-b border-border py-2 px-6 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={meowflixLogo} 
              alt="MeowFlix - Recomendador de filmes com IA" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg md:text-xl font-extrabold leading-tight">
                <span className="text-white drop-shadow-sm">Meow</span>
                <span className="netflix-red">Flix</span>
              </h1>
            </div>
          </div>

          {/* Version indicator with better contrast */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/80 md:text-sm font-medium bg-white/10 px-2 py-1 rounded-md">v1.0</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;