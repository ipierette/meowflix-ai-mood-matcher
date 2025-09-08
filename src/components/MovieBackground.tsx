import spyCat from "@/assets/poster-spy-cat.jpg";
import princessCat from "@/assets/poster-princess-cat.jpg";
import actionCat from "@/assets/poster-action-cat.jpg";
import wizardCat from "@/assets/poster-wizard-cat.jpg";
import spaceCat from "@/assets/poster-space-cat.jpg";
import detectiveCat from "@/assets/poster-detective-cat.jpg";

const MovieBackground = () => {
  const posters = [
    spyCat, princessCat, actionCat, wizardCat, spaceCat, detectiveCat
  ];

  return (
    <div className="netflix-bg">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="grid grid-cols-6 lg:grid-cols-8 gap-4 p-4 transform -rotate-12 scale-110">
          {Array.from({ length: 48 }, (_, i) => (
            <div
              key={i}
              className="movie-poster relative"
              style={{
                animationDelay: `${(i * 0.1) % 3}s`,
              }}
            >
              <img
                src={posters[i % posters.length]}
                alt={`Cat movie poster ${i + 1}`}
                className="w-full h-32 lg:h-40 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieBackground;