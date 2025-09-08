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
      <div className="absolute inset-0 overflow-hidden opacity-12">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6 p-6 transform -rotate-8 scale-105">
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
                className="w-full h-24 sm:h-28 lg:h-36 object-cover rounded-lg shadow-md"
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