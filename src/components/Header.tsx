import meowflixLogo from "@/assets/meowflix-logo.png";

const Header = () => {
  return (
    <header className="header-ice py-4 px-6 shadow-md relative z-50">
      <div className="container mx-auto flex items-center gap-4">
        <img 
          src={meowflixLogo} 
          alt="MeowFlix Logo" 
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-3xl font-bold">
          <span className="text-header-foreground">Meow</span>
          <span className="netflix-red">Flix</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;