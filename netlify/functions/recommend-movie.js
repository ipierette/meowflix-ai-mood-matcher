const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userPrompt } = JSON.parse(event.body);

    if (!userPrompt || typeof userPrompt !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'userPrompt é obrigatório e deve ser uma string' }),
      };
    }

    // Inicializar Google Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt system para o Gemini em português BR
    const systemPrompt = `Você é um assistente especializado em indicar filmes reais e atuais para o público brasileiro.

Quando o usuário pedir uma recomendação, você deve buscar mentalmente 1 filme que exista de verdade e que se encaixe na categoria solicitada.

REGRAS IMPORTANTES:
- Use SEMPRE o título em português brasileiro do filme (como é conhecido no Brasil)
- Não invente nomes de filmes
- Priorize títulos populares, bem avaliados e conhecidos no Brasil
- Retorne somente 1 filme por vez
- Baseie a recomendação no humor/sentimento descrito pelo usuário
- Considere filmes nacionais e internacionais

EXEMPLOS DE TÍTULOS CORRETOS EM PT-BR:
- "Vingadores: Ultimato" (não "Avengers: Endgame")
- "O Rei Leão" (não "The Lion King")
- "Cidade de Deus" (filme nacional)
- "Parasita" (filme internacional)

FORMATO DE RESPOSTA OBRIGATÓRIO:
Responda SOMENTE com este JSON (sem texto adicional):
{"title": "TÍTULO EM PORTUGUÊS BRASILEIRO"}

REGRAS CRÍTICAS:
- SEM texto antes ou depois do JSON
- SEM explicações ou comentários
- SEM backticks ou markdown
- SEM a palavra "output"
- APENAS o JSON válido
- TÍTULO SEMPRE EM PORTUGUÊS DO BRASIL

Prompt do usuário: ${userPrompt}`;

    // Gerar recomendação com Gemini
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const geminiOutput = response.text().trim();

    console.log('Gemini output:', geminiOutput);

    // Parse da resposta do Gemini
    let movieTitle;
    try {
      const parsed = JSON.parse(geminiOutput);
      movieTitle = parsed.title;
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta do Gemini:', parseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Erro ao processar resposta da IA' }),
      };
    }

    if (!movieTitle) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'IA não retornou um título válido' }),
      };
    }

    // Buscar filme na API do TMDB com configuração para português BR
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&language=pt-BR&region=BR`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!tmdbResponse.ok) {
      console.error('Erro na API do TMDB:', tmdbResponse.status);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Erro ao buscar filme na base de dados' }),
      };
    }

    const tmdbData = await tmdbResponse.json();
    
    if (!tmdbData.results || tmdbData.results.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Filme não encontrado na base de dados' }),
      };
    }

    // Pegar o primeiro resultado (mais relevante)
    const movie = tmdbData.results[0];

    // Mapear IDs de gêneros para nomes em português
    const genreMap = {
      28: 'Ação', 12: 'Aventura', 16: 'Animação', 35: 'Comédia', 80: 'Crime',
      99: 'Documentário', 18: 'Drama', 10751: 'Família', 14: 'Fantasia',
      36: 'História', 27: 'Terror', 10402: 'Musical', 9648: 'Mistério',
      10749: 'Romance', 878: 'Ficção Científica', 10770: 'Filme para TV',
      53: 'Thriller', 10752: 'Guerra', 37: 'Faroeste'
    };

    // Buscar detalhes adicionais do filme para duração
    let movieDetails = null;
    try {
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=pt-BR`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (detailsResponse.ok) {
        movieDetails = await detailsResponse.json();
      }
    } catch (error) {
      console.log('Erro ao buscar detalhes do filme:', error.message);
    }

    // Obter gênero principal em português
    const primaryGenre = movie.genre_ids && movie.genre_ids.length > 0 
      ? genreMap[movie.genre_ids[0]] || 'Drama'
      : 'Geral';

    // Calcular duração
    const duration = movieDetails && movieDetails.runtime 
      ? `${movieDetails.runtime} min`
      : '120 min';

    // Gerar razão personalizada baseada no gênero e prompt original
    const generateReason = (genre, userPrompt) => {
      const reasons = {
        'Ação': 'A adrenalina e energia deste filme de ação são perfeitas para seu estado atual!',
        'Comédia': 'Este filme divertido vai alegrar seu dia e trazer boas risadas!',
        'Drama': 'Um drama tocante que vai resonar com seus sentimentos atuais.',
        'Romance': 'A história de amor deste filme é ideal para seu humor romântico.',
        'Terror': 'Se você quer algo intenso, este suspense vai te manter na ponta da cadeira!',
        'Animação': 'Uma animação encantadora que vai trazer leveza e magia para seu dia!'
      };
      return reasons[genre] || `Baseado no seu humor atual ("${userPrompt}"), este ${genre.toLowerCase()} foi selecionado para proporcionar a experiência perfeita!`;
    };

    // Formatar resposta no formato esperado pelo frontend
    const recommendation = {
      title: movie.title,
      genre: primaryGenre,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 2023,
      rating: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 7.5,
      duration: duration,
      synopsis: movie.overview || 'Sinopse não disponível.',
      reason: generateReason(primaryGenre, userPrompt),
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(recommendation),
    };

  } catch (error) {
    console.error('Erro na função:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.message 
      }),
    };
  }
};
