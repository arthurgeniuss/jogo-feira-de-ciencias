// Dados estáticos do jogo "Projeto Evidência: O Mistério da Galeria de Arte"
// Culpada: Vitória Sampaio (código 102) — calçado 38 / 1,70m, sangue AB+ na lâmina,
// digital na faca e fio de cabelo loiro.

export interface Suspect {
  codigo: string;
  nome: string;
  genero: "Feminino" | "Masculino";
  papel: string;
  altura: string;
  alturaM: number;
  calcado: number;
  tipoSanguineo: string;
  cabelo: string;
  iniciais: string;
  cor: string;
}

export const suspects: Suspect[] = [
  {
    codigo: "101",
    nome: "Helena Duarte",
    genero: "Feminino",
    papel: "Curadora da exposição",
    altura: "1,62 m",
    alturaM: 1.62,
    calcado: 36,
    tipoSanguineo: "O+",
    cabelo: "Preto, liso",
    iniciais: "HD",
    cor: "oklch(0.65 0.18 30)",
  },
  {
    codigo: "102",
    nome: "Vitória Sampaio",
    genero: "Feminino",
    papel: "Sócia investidora da galeria",
    altura: "1,70 m",
    alturaM: 1.7,
    calcado: 38,
    tipoSanguineo: "AB+",
    cabelo: "Loiro, ondulado",
    iniciais: "VS",
    cor: "oklch(0.78 0.15 85)",
  },
  {
    codigo: "103",
    nome: "Marina Rocha",
    genero: "Feminino",
    papel: "Artista convidada",
    altura: "1,58 m",
    alturaM: 1.58,
    calcado: 35,
    tipoSanguineo: "A-",
    cabelo: "Castanho, cacheado",
    iniciais: "MR",
    cor: "oklch(0.65 0.15 145)",
  },
  {
    codigo: "201",
    nome: "Otávio Bran",
    genero: "Masculino",
    papel: "Segurança do evento",
    altura: "1,80 m",
    alturaM: 1.8,
    calcado: 41,
    tipoSanguineo: "B+",
    cabelo: "Preto, curto",
    iniciais: "OB",
    cor: "oklch(0.6 0.18 250)",
  },
  {
    codigo: "202",
    nome: "Sérgio Almeida",
    genero: "Masculino",
    papel: "Crítico de arte convidado",
    altura: "1,85 m",
    alturaM: 1.85,
    calcado: 42,
    tipoSanguineo: "O-",
    cabelo: "Grisalho",
    iniciais: "SA",
    cor: "oklch(0.7 0.02 250)",
  },
  {
    codigo: "203",
    nome: "Diego Farias",
    genero: "Masculino",
    papel: "Garçom do coquetel",
    altura: "1,75 m",
    alturaM: 1.75,
    calcado: 40,
    tipoSanguineo: "A+",
    cabelo: "Castanho, curto",
    iniciais: "DF",
    cor: "oklch(0.65 0.18 320)",
  },
];

export const CULPADO_CODIGO = "102";

export interface Depoimento {
  codigo: string;
  texto: string;
  contradicao?: string;
}

export const depoimentos: Depoimento[] = [
  {
    codigo: "101",
    texto:
      "Passei a noite inteira recebendo os convidados na entrada principal. Ouvi um barulho vindo dos fundos por volta das 22h10, mas achei que fosse o pessoal do bufê descarregando caixas. Só entendi o que tinha acontecido quando a polícia chegou.",
  },
  {
    codigo: "102",
    texto:
      "Discuti com ele sim, sobre dinheiro — todo mundo viu. Mas saí para o pátio tomar ar e não cheguei nem perto da área de serviço. Nunca toquei naquela faca. Este corte na minha mão foi de uma taça que quebrou na cozinha.",
    contradicao:
      "O sangue da lâmina é AB+, mesmo tipo dela; a digital da faca coincide com sua ficha; e a pegada em sangue é de calçado feminino nº 38, com estatura estimada de 1,70 m — exatamente seus dados.",
  },
  {
    codigo: "103",
    texto:
      "Estava montando a última tela na sala 2 com dois assistentes. Vi a Vitória discutindo com o proprietário perto do corredor de serviço, mas não escutei o que diziam. Depois disso fiquei na sala até os gritos.",
  },
  {
    codigo: "201",
    texto:
      "Sou o segurança. Cheguei a agarrar o proprietário pelo braço mais cedo, porque ele estava alterado e quis expulsar um convidado. Foi um empurra-empurra, nada além disso. Depois voltei para o monitor das câmeras.",
    contradicao:
      "Ele admite contato físico com a vítima, mas a única pegada em sangue na cena é de um modelo feminino nº 38 — incompatível com seu calçado nº 41.",
  },
  {
    codigo: "202",
    texto:
      "Sou crítico, vim escrever sobre a mostra. Falei com o proprietário no início da noite sobre o catálogo e nada mais. Passei o resto do tempo no salão principal, sempre acompanhado.",
  },
  {
    codigo: "203",
    texto:
      "Circulei a noite toda servindo canapés. Entrei na área de serviço várias vezes para repor as bandejas, é o meu trabalho. Na última vez, por volta das 22h20, a porta dos fundos estava trancada por dentro, o que era estranho.",
  },
];

export interface Evidence {
  id: string;
  titulo: string;
  icone: string;
  resumo: string;
  descricao: string;
  conceito: string;
  bloqueada?: boolean;
}

export const evidencias: Evidence[] = [
  {
    id: "faca",
    titulo: "Faca de caça (arma do crime)",
    icone: "🔪",
    resumo: "Encontrada ao lado do corpo, com sangue seco na lâmina.",
    descricao:
      "Faca de caça de lâmina fixa, 18 cm, abandonada a 40 cm do corpo. A lâmina apresenta sangue de duas origens e o cabo conserva impressões digitais latentes reveladas com pó preto.",
    conceito:
      "A arma deve ser fotografada e etiquetada antes de ser movida. Todo deslocamento é registrado na cadeia de custódia.",
  },
  {
    id: "pegada",
    titulo: "Pegada em sangue",
    icone: "👠",
    resumo: "Marca de calçado feminino modelo nº 38.",
    descricao:
      "Pegada parcial em sangue no piso da área de serviço. Solado de modelo feminino, comprimento compatível com numeração 38. Pela tabela de proporção pé/estatura, a autora tem aproximadamente 1,70 m.",
    conceito:
      "O comprimento do pé equivale, em média, a 15% da estatura. Por isso a pegada permite estimar a altura de quem a deixou.",
  },
  {
    id: "tipagem",
    titulo: "Bancada de tipagem sanguínea",
    icone: "🩸",
    resumo: "Vítima O-; sangue da lâmina AB+.",
    descricao:
      "Testes com soros Anti-A, Anti-B e Anti-D: a amostra da vítima não aglutinou com Anti-A nem Anti-B e não reagiu ao Anti-D (O-). A amostra da lâmina aglutinou com Anti-A, Anti-B e Anti-D (AB+). Logo, parte do sangue é do agressor, ferido durante a luta.",
    conceito:
      "Sistema ABO e fator Rh: a aglutinação indica quais antígenos existem nas hemácias.",
  },
  {
    id: "cabelo",
    titulo: "Fio de cabelo na lâmina",
    icone: "🧬",
    resumo: "Fio loiro, ondulado, com bulbo preservado.",
    descricao:
      "Um fio loiro ondulado ficou preso entre o cabo e a lâmina. O bulbo está preservado, o que permitiria exame de DNA. A vítima tinha cabelo castanho e curto.",
    conceito:
      "Tricologia forense: cor, forma da secção e presença de bulbo ajudam a vincular uma pessoa à cena.",
  },
  {
    id: "cartoes",
    titulo: "Cartões de referência de digitais",
    icone: "🫆",
    resumo: "Padrões arco, presilha e verticilo para comparação.",
    descricao:
      "Fichas datiloscópicas dos seis retidos, para comparação visual com a digital latente coletada no cabo da faca.",
    conceito:
      "Impressões digitais são únicas e imutáveis. A identificação exige coincidência de pontos característicos.",
  },
  {
    id: "laudo",
    titulo: "Laudo datiloscópico da faca",
    icone: "📄",
    resumo: "Resultado completo da comparação das digitais.",
    descricao:
      "A digital latente do cabo apresenta padrão verticilo com 14 pontos característicos coincidentes com a ficha da suspeita de código 102. As demais fichas foram excluídas.",
    conceito:
      "Doze pontos coincidentes já são considerados suficientes para identificação positiva no Brasil.",
    bloqueada: true,
  },
  {
    id: "celular",
    titulo: "Celular da vítima",
    icone: "📱",
    resumo: "Mensagens recuperadas da noite do crime.",
    descricao:
      "Às 21h47 a vítima escreveu: \"A Vitória vai ter que devolver o dinheiro da galeria hoje ou eu levo tudo pro advogado amanhã.\" Às 22h02 recebeu: \"Me encontra nos fundos, vamos resolver isso agora.\"",
    conceito:
      "Perícia digital: mensagens, metadados e horários integram a prova e também exigem cadeia de custódia.",
    bloqueada: true,
  },
];

export interface EstaturaRef {
  calcado: number;
  estatura: string;
}

export const tabelaEstatura: EstaturaRef[] = [
  { calcado: 34, estatura: "1,52 m – 1,56 m" },
  { calcado: 35, estatura: "1,56 m – 1,60 m" },
  { calcado: 36, estatura: "1,60 m – 1,65 m" },
  { calcado: 37, estatura: "1,65 m – 1,68 m" },
  { calcado: 38, estatura: "1,68 m – 1,72 m" },
  { calcado: 39, estatura: "1,72 m – 1,76 m" },
  { calcado: 40, estatura: "1,74 m – 1,78 m" },
  { calcado: 41, estatura: "1,78 m – 1,82 m" },
  { calcado: 42, estatura: "1,82 m – 1,87 m" },
];

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const quiz: QuizQuestion[] = [
  {
    pergunta: "Qual é o primeiro procedimento ao chegar a uma cena de crime?",
    opcoes: [
      "Recolher a arma para o laboratório",
      "Isolar o perímetro e registrar a cena por fotografia",
      "Interrogar os suspeitos",
      "Cobrir o corpo",
    ],
    correta: 1,
    explicacao: "Isolar e fotografar preserva a cena antes de qualquer objeto ser movido.",
  },
  {
    pergunta: "O que é cadeia de custódia?",
    opcoes: [
      "A ordem dos interrogatórios",
      "O registro documentado do caminho de cada prova, da coleta ao julgamento",
      "A hierarquia dos peritos",
      "O tempo entre o crime e a autópsia",
    ],
    correta: 1,
    explicacao: "Sem cadeia de custódia íntegra, a prova pode ser anulada em juízo.",
  },
  {
    pergunta: "Por que peritos usam luvas, máscara e jaleco na cena?",
    opcoes: [
      "Apenas por uniforme",
      "Para evitar contaminação da cena e proteger o próprio perito",
      "Para não sujar a roupa",
      "Exigência do fotógrafo",
    ],
    correta: 1,
    explicacao: "A paramentação evita que DNA, digitais e fibras do perito contaminem as provas.",
  },
  {
    pergunta: "Uma amostra aglutinou com Anti-A, Anti-B e Anti-D. Qual o tipo sanguíneo?",
    opcoes: ["O-", "A+", "B-", "AB+"],
    correta: 3,
    explicacao: "Aglutinação nos três soros indica antígenos A, B e fator Rh positivo: AB+.",
  },
  {
    pergunta: "O sangue da vítima é O- e o da lâmina é AB+. O que isso indica?",
    opcoes: [
      "A amostra foi contaminada",
      "Parte do sangue pertence ao agressor",
      "A vítima mudou de tipo sanguíneo",
      "Nada de relevante",
    ],
    correta: 1,
    explicacao: "Tipos diferentes na mesma lâmina indicam uma segunda pessoa ferida na luta.",
  },
  {
    pergunta: "O comprimento do pé corresponde, em média, a qual porcentagem da estatura?",
    opcoes: ["5%", "15%", "25%", "40%"],
    correta: 1,
    explicacao: "Cerca de 15% — por isso a pegada permite estimar a altura do autor.",
  },
  {
    pergunta: "Uma pegada de calçado feminino nº 38 sugere estatura aproximada de:",
    opcoes: ["1,50 m", "1,60 m", "1,70 m", "1,85 m"],
    correta: 2,
    explicacao: "Pela tabela de proporção, nº 38 corresponde a cerca de 1,68 m a 1,72 m.",
  },
  {
    pergunta: "Quais são os três padrões datiloscópicos principais?",
    opcoes: [
      "Arco, presilha e verticilo",
      "Linha, curva e espiral",
      "Fino, médio e grosso",
      "A, B e AB",
    ],
    correta: 0,
    explicacao: "Arco, presilha (laço) e verticilo (espiral) são os padrões básicos.",
  },
  {
    pergunta: "Uma digital latente é revelada principalmente com:",
    opcoes: ["Água oxigenada", "Pó revelador e pincel", "Luz solar direta", "Álcool em gel"],
    correta: 1,
    explicacao: "Pó revelador adere ao suor e à gordura deixados pela crista papilar.",
  },
  {
    pergunta: "Por que o bulbo de um fio de cabelo é tão valioso?",
    opcoes: [
      "Porque indica a idade",
      "Porque contém material genético para exame de DNA",
      "Porque mostra a cor natural",
      "Porque resiste ao fogo",
    ],
    correta: 1,
    explicacao: "O bulbo tem células com núcleo, permitindo o perfil genético.",
  },
  {
    pergunta: "Um depoimento que contraria uma prova física deve ser tratado como:",
    opcoes: [
      "Verdade, pois a testemunha estava lá",
      "Indício de contradição a ser investigado",
      "Prova definitiva de culpa",
      "Informação irrelevante",
    ],
    correta: 1,
    explicacao: "A prova material prevalece; a contradição orienta a investigação.",
  },
  {
    pergunta: "O que caracteriza uma prova digital?",
    opcoes: [
      "Qualquer prova impressa",
      "Informação armazenada eletronicamente usada como evidência",
      "Somente digitais coletadas por scanner",
      "Fotos tiradas por celular",
    ],
    correta: 1,
    explicacao: "Logs, mensagens, metadados e arquivos são provas digitais.",
  },
];

export interface Prova {
  id: string;
  rotulo: string;
  correta: boolean;
}

export const provasAcusacao: Prova[] = [
  { id: "p1", rotulo: "Pegada de calçado feminino nº 38 compatível com 1,70 m", correta: true },
  { id: "p2", rotulo: "Sangue AB+ na lâmina, igual ao tipo da acusada", correta: true },
  { id: "p3", rotulo: "Digital do cabo da faca com 14 pontos coincidentes", correta: true },
  { id: "p4", rotulo: "Fio de cabelo loiro preso na lâmina", correta: true },
  { id: "p5", rotulo: "Mensagem da vítima cobrando dinheiro da galeria", correta: true },
  { id: "p6", rotulo: "Depoimento do segurança sobre o empurra-empurra", correta: false },
  { id: "p7", rotulo: "Porta dos fundos trancada por dentro às 22h20", correta: false },
  { id: "p8", rotulo: "Cabelo grisalho de um dos convidados", correta: false },
];

export const passosDoJogo = [
  {
    titulo: "Paramentação",
    texto: "Vista jaleco, luvas e máscara antes de entrar na área isolada.",
    icone: "🥼",
  },
  {
    titulo: "Bancada de tipagem",
    texto: "Teste as amostras com os soros Anti-A, Anti-B e Anti-D e anote os tipos.",
    icone: "🧪",
  },
  {
    titulo: "Análise da pegada",
    texto: "Meça a pegada com a régua e estime a estatura pela tabela de proporção.",
    icone: "📏",
  },
  {
    titulo: "Consulta no app",
    texto: "Digite os 6 códigos das placas para abrir as fichas e ler os depoimentos.",
    icone: "🔎",
  },
  {
    titulo: "Quiz de perícia",
    texto: "Acerte as questões para liberar o laudo das digitais e o celular da vítima.",
    icone: "🧠",
  },
  {
    titulo: "Veredito",
    texto: "Elimine os incompatíveis e envie a acusação com as provas que a sustentam.",
    icone: "⚖️",
  },
];
