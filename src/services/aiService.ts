interface MovieRecommendation {
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  synopsis: string;
  reason: string;
}

// Simulação de base de dados de filmes com recomendações baseadas em humor
const movieDatabase: Record<string, MovieRecommendation[]> = {
  happy: [
    {
      title: "O Gato de Botas",
      genre: "Animação/Aventura",
      year: 2011,
      rating: 8.2,
      duration: "90 min",
      synopsis: "O carismático espadachim e sedutor Gato de Botas deve restaurar sua honra perdida e recuperar a confiança de sua cidade e da mulher que ama.",
      reason: "Perfeito para quem está feliz! Esta animação charmosa com um protagonista felino carismático vai manter seu bom humor com aventuras divertidas e muito charme."
    },
    {
      title: "Mamma Mia!",
      genre: "Musical/Comédia",
      year: 2008,
      rating: 6.5,
      duration: "108 min",
      synopsis: "Uma jovem noiva convida três homens para seu casamento, cada um podendo ser seu pai, em uma ilha grega ao som das músicas do ABBA.",
      reason: "Sua energia positiva combina perfeitamente com este musical alegre e colorido! As músicas contagiantes do ABBA vão amplificar sua felicidade."
    }
  ],
  sad: [
    {
      title: "A Vida é Bela",
      genre: "Drama/Guerra",
      year: 1997,
      rating: 8.6,
      duration: "116 min",
      synopsis: "Um pai usa sua imaginação para proteger seu filho dos horrores de um campo de concentração nazista, transformando a experiência em um jogo.",
      reason: "Mesmo triste, este filme vai te emocionar de forma positiva. É uma história sobre amor, esperança e como encontrar beleza mesmo nos momentos mais difíceis."
    },
    {
      title: "Her",
      genre: "Drama/Romance",
      year: 2013,
      rating: 8.0,
      duration: "126 min",
      synopsis: "Um escritor solitário desenvolve uma relação improvável com um sistema operacional projetado para atender todas as suas necessidades.",
      reason: "Este filme reflexivo e sensível vai resonar com sua melancolia atual, oferecendo uma perspectiva única sobre conexão humana e solidão."
    }
  ],
  nostalgic: [
    {
      title: "De Volta para o Futuro",
      genre: "Ficção Científica/Comédia",
      year: 1985,
      rating: 8.5,
      duration: "116 min",
      synopsis: "Um adolescente acidentalmente viaja no tempo para 1955 e deve garantir que seus pais se apaixonem para assegurar sua própria existência.",
      reason: "Perfeito para momentos nostálgicos! Este clássico dos anos 80 vai te transportar para uma época mais simples, cheia de aventura e possibilidades."
    },
    {
      title: "O Estranho Mundo de Jack",
      genre: "Animação/Musical",
      year: 1993,
      rating: 7.9,
      duration: "76 min",
      synopsis: "Jack Skellington, o Rei Abóbora da Cidade do Halloween, descobre a Cidade do Natal e decide trazer o Natal para sua cidade sombria.",
      reason: "Esta obra-prima de Tim Burton captura perfeitamente a nostalgia com sua estética única e trilha sonora marcante, ideal para quem busca algo familiar mas mágico."
    }
  ],
  anxious: [
    {
      title: "O Hobbit: Uma Jornada Inesperada",
      genre: "Fantasia/Aventura",
      year: 2012,
      rating: 7.8,
      duration: "169 min",
      synopsis: "Bilbo Bolseiro se junta a um grupo de anões em uma jornada épica para recuperar o reino perdido de Erebor do dragão Smaug.",
      reason: "Esta aventura épica vai canalizar sua ansiedade em uma jornada emocionante. A jornada de crescimento do Bilbo pode inspirar coragem em momentos de incerteza."
    },
    {
      title: "O Jardim Secreto",
      genre: "Drama/Família",
      year: 2020,
      rating: 5.6,
      duration: "99 min",
      synopsis: "Uma menina órfã descobre um jardim mágico escondido na propriedade de seu tio recluso e trabalha para restaurá-lo com a ajuda de novos amigos.",
      reason: "Um filme tranquilo e terapêutico que pode ajudar a acalmar a ansiedade. A transformação do jardim simboliza renovação e esperança."
    }
  ],
  romantic: [
    {
      title: "Aristogatos",
      genre: "Animação/Romance",
      year: 1970,
      rating: 7.1,
      duration: "78 min",
      synopsis: "Uma família de gatos aristocráticos enfrenta aventuras em Paris após serem abandonados por seu motorista ganancioso.",
      reason: "Romance clássico da Disney com protagonistas felinos! A história de amor entre Duchess e O'Malley é doce e nostálgica, perfeita para um mood romântico."
    },
    {
      title: "Orgulho e Preconceito",
      genre: "Romance/Drama",
      year: 2005,
      rating: 7.8,
      duration: "129 min",
      synopsis: "Elizabeth Bennet enfrenta questões familiares, de classe e amor quando conhece o orgulhoso Sr. Darcy.",
      reason: "Um dos romances mais belos do cinema! A química entre os protagonistas e a cinematografia deslumbrante criarão o ambiente perfeito para seu humor romântico."
    }
  ]
};

export const getMovieRecommendation = async (userMessage: string): Promise<MovieRecommendation> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const message = userMessage.toLowerCase();
  
  // Análise simples de sentimento baseada em palavras-chave
  let mood = 'happy'; // default
  
  if (message.includes('triste') || message.includes('melancolia') || message.includes('chorar') || 
      message.includes('deprimido') || message.includes('down') || message.includes('pra baixo')) {
    mood = 'sad';
  } else if (message.includes('nostalgia') || message.includes('nostálgico') || message.includes('saudade') ||
             message.includes('infância') || message.includes('memórias') || message.includes('passado')) {
    mood = 'nostalgic';
  } else if (message.includes('ansioso') || message.includes('ansiedade') || message.includes('nervoso') ||
             message.includes('estressado') || message.includes('preocupado') || message.includes('tenso')) {
    mood = 'anxious';
  } else if (message.includes('amor') || message.includes('romântico') || message.includes('romance') ||
             message.includes('paixão') || message.includes('namorar') || message.includes('casal')) {
    mood = 'romantic';
  }
  
  const recommendations = movieDatabase[mood] || movieDatabase.happy;
  const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  
  return randomRecommendation;
};