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

// Função para fazer a requisição para a Netlify Function
export const getMovieRecommendation = async (userMessage: string): Promise<MovieRecommendation> => {
  try {
    // URL da função Netlify - será diferente em desenvolvimento vs produção
    const isProduction = window.location.hostname !== 'localhost';
    const baseUrl = isProduction 
      ? window.location.origin 
      : 'http://localhost:8888'; // URL padrão do Netlify Dev
    
    const response = await fetch(`${baseUrl}/.netlify/functions/recommend-movie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPrompt: userMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    const recommendation: MovieRecommendation = await response.json();
    
    // Validação básica da resposta
    if (!recommendation.title) {
      throw new Error('Resposta inválida da API');
    }

    return recommendation;

  } catch (error) {
    console.error('Erro ao buscar recomendação:', error);
    
    // Fallback para uma recomendação padrão em caso de erro
    return {
      title: "O Gato de Botas",
      genre: "Animação/Aventura",
      year: 2011,
      rating: 8.2,
      duration: "90 min",
      synopsis: "O carismático espadachim e sedutor Gato de Botas deve restaurar sua honra perdida e recuperar a confiança de sua cidade e da mulher que ama.",
      reason: "Desculpe, tivemos um problema ao processar sua solicitação. Aqui está uma recomendação clássica enquanto resolvemos o problema!",
      poster: "https://image.tmdb.org/t/p/w500/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg"
    };
  }
};