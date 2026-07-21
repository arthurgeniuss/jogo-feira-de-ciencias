// Dados estáticos do jogo "Projeto Evidência: Descubra o Culpado"
// Culpado: Carla Oliveira (sangue A+, última a ver a vítima, contradição no depoimento)

export type SuspectId = "ana" | "pedro" | "carla" | "rafael";

export interface Suspect {
  id: SuspectId;
  nome: string;
  idade: number;
  relacao: string;
  motivo: string;
  alibi: string;
  tipoSanguineo: string;
  foto: string; // emoji/inicial
  cor: string;
}

export const suspects: Suspect[] = [
  {
    id: "ana",
    nome: "Ana Ferreira",
    idade: 17,
    relacao: "Colega de turma da vítima",
    motivo: "Discussão recente com Lucas sobre um trabalho em grupo.",
    alibi: "Afirma estar na biblioteca com duas colegas entre 14h e 15h.",
    tipoSanguineo: "O+",
    foto: "AF",
    cor: "oklch(0.65 0.18 30)",
  },
  {
    id: "pedro",
    nome: "Pedro Santos",
    idade: 18,
    relacao: "Amigo próximo da vítima",
    motivo: "Ciúmes de uma bolsa de estudos concedida a Lucas.",
    alibi: "Diz ter saído da escola às 14h05 para ir ao dentista.",
    tipoSanguineo: "B+",
    foto: "PS",
    cor: "oklch(0.6 0.18 250)",
  },
  {
    id: "carla",
    nome: "Carla Oliveira",
    idade: 24,
    relacao: "Monitora do laboratório",
    motivo: "Lucas descobriu que ela desviava reagentes da escola.",
    alibi: "Afirma não ter entrado no laboratório após 14h.",
    tipoSanguineo: "A+",
    foto: "CO",
    cor: "oklch(0.65 0.15 145)",
  },
  {
    id: "rafael",
    nome: "Rafael Costa",
    idade: 20,
    relacao: "Ex-aluno da escola",
    motivo: "Ressentimento após ter sido reprovado e denunciado por Lucas.",
    alibi: "Estava no pátio esperando um amigo, viu movimentação no corredor.",
    tipoSanguineo: "O-",
    foto: "RC",
    cor: "oklch(0.65 0.18 320)",
  },
];

export interface Evidence {
  id: number;
  titulo: string;
  icone: string;
  descricaoCurta: string;
  descricao: string;
  conceito: string;
}

export const evidencias: Evidence[] = [
  {
    id: 1,
    titulo: "Fotografia da cena do crime",
    icone: "📷",
    descricaoCurta: "Registro fotográfico do laboratório.",
    descricao:
      "A vítima foi encontrada caída próxima à bancada central. Uma cadeira tombada e um frasco de reagente quebrado indicam luta corporal. A porta de acesso restrito estava destrancada — apenas monitores possuem chave.",
    conceito:
      "Cadeia de custódia: toda cena deve ser fotografada antes que qualquer objeto seja movido, preservando a integridade da prova.",
  },
  {
    id: 2,
    titulo: "Mancha de sangue A+",
    icone: "🩸",
    descricaoCurta: "Sangue encontrado sobre a bancada.",
    descricao:
      "Análise laboratorial confirmou tipagem sanguínea A+. A vítima possui sangue tipo O-. Portanto, o sangue pertence ao agressor, que provavelmente se feriu durante a luta.",
    conceito:
      "Tipagem sanguínea ABO: os antígenos A e B nas hemácias determinam o tipo. A+ significa antígeno A presente + fator Rh positivo.",
  },
  {
    id: 3,
    titulo: "Impressão digital em frasco",
    icone: "🫆",
    descricaoCurta: "Digital latente revelada com pó preto.",
    descricao:
      "Impressão digital do tipo presilha interna foi coletada em um frasco de ácido. O padrão coincide com a ficha biométrica de uma das monitoras cadastradas na escola.",
    conceito:
      "Impressões digitais são únicas e imutáveis. Os três padrões principais são arco, presilha e verticilo.",
  },
  {
    id: 4,
    titulo: "Bilhete rasgado com ameaça",
    icone: "📝",
    descricaoCurta: "\"Se você contar, eu acabo com você.\"",
    descricao:
      "Fragmentos de papel foram remontados. A caligrafia foi comparada com amostras de escrita dos suspeitos, apresentando forte compatibilidade com uma escrita feminina de traços firmes.",
    conceito:
      "Documentoscopia: perícia grafotécnica compara pressão, inclinação e formato das letras para identificar autoria.",
  },
  {
    id: 5,
    titulo: "Registro eletrônico de acesso",
    icone: "🔐",
    descricaoCurta: "Log da fechadura eletrônica do laboratório.",
    descricao:
      "O sistema registrou entrada às 14h15 utilizando o cartão da monitora Carla Oliveira — apesar de seu depoimento afirmar que ela não entrou no laboratório naquele horário.",
    conceito:
      "Provas digitais também compõem a cadeia de custódia. Logs eletrônicos são admissíveis quando íntegros e datados.",
  },
  {
    id: 6,
    titulo: "Mensagens do celular da vítima",
    icone: "📱",
    descricaoCurta: "Última conversa recuperada.",
    descricao:
      "Última mensagem enviada por Lucas às 13h58: \"Vou falar com a Carla agora, ela precisa parar com isso ou vou contar pra diretora.\" Nenhuma resposta foi registrada.",
    conceito:
      "Perícia digital: mesmo mensagens apagadas podem ser recuperadas via análise forense de memória flash.",
  },
];

export interface Depoimento {
  suspeitoId: SuspectId;
  texto: string;
  contradicao?: string;
}

export const depoimentos: Depoimento[] = [
  {
    suspeitoId: "ana",
    texto:
      "Sim, discuti com o Lucas semana passada, mas foi bobagem. Naquela tarde eu estava na biblioteca com a Júlia e a Marina revisando o trabalho de História. Saímos de lá só depois das 15h, quando começou a confusão.",
  },
  {
    suspeitoId: "pedro",
    texto:
      "Fui embora cedo, tinha consulta no dentista às 14h30. Nem passei perto do laboratório. Lucas era meu amigo, jamais faria mal a ele — só fiquei chateado com a bolsa, mas conversamos.",
  },
  {
    suspeitoId: "carla",
    texto:
      "Fui a última a ver o Lucas, mas foi só um oi no corredor por volta das 13h50. Depois disso eu fui para a sala dos professores e não voltei ao laboratório. Não tenho ideia do que aconteceu.",
    contradicao:
      "O registro eletrônico mostra seu cartão acessando o laboratório às 14h15 — e sua tipagem sanguínea coincide com o sangue encontrado na bancada.",
  },
  {
    suspeitoId: "rafael",
    texto:
      "Eu estava no pátio esperando um amigo. Vi gente entrando e saindo do bloco do laboratório, mas não subi. Sim, o Lucas me denunciou uma vez, mas isso já ficou pra trás.",
  },
];

export interface TimelineEvent {
  hora: string;
  descricao: string;
}

export const timeline: TimelineEvent[] = [
  { hora: "13:58", descricao: "Lucas envia mensagem dizendo que iria confrontar Carla." },
  { hora: "14:00", descricao: "Vítima entra no laboratório." },
  { hora: "14:05", descricao: "Pedro Santos é registrado saindo da escola." },
  { hora: "14:10", descricao: "Ana Ferreira é vista no corredor da biblioteca." },
  { hora: "14:15", descricao: "Cartão de Carla Oliveira acessa o laboratório." },
  { hora: "14:20", descricao: "Testemunha relata gritos e discussão vindos do laboratório." },
  { hora: "14:30", descricao: "Horário estimado do crime (perícia)." },
  { hora: "14:45", descricao: "Rafael Costa é visto atravessando o pátio." },
  { hora: "15:00", descricao: "Corpo é encontrado por funcionário da limpeza." },
];

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export const quiz: QuizQuestion[] = [
  {
    pergunta: "Qual foi o tipo sanguíneo encontrado na bancada do laboratório?",
    opcoes: ["O-", "A+", "B+", "AB-"],
    correta: 1,
    explicacao: "Análise laboratorial identificou sangue A+, incompatível com o da vítima (O-).",
  },
  {
    pergunta: "Quem foi a última pessoa a ver Lucas com vida, segundo os depoimentos?",
    opcoes: ["Ana Ferreira", "Pedro Santos", "Carla Oliveira", "Rafael Costa"],
    correta: 2,
    explicacao: "Carla admite ter falado com Lucas no corredor pouco antes das 14h.",
  },
  {
    pergunta: "Qual evidência contradiz diretamente o depoimento de Carla?",
    opcoes: [
      "Bilhete rasgado",
      "Registro eletrônico de acesso",
      "Mensagens do celular",
      "Fotografia da cena",
    ],
    correta: 1,
    explicacao: "O log da fechadura mostra o cartão dela acessando o laboratório às 14h15.",
  },
  {
    pergunta: "O que define a cadeia de custódia?",
    opcoes: [
      "A ordem em que os suspeitos são interrogados",
      "O caminho documentado de cada evidência desde a coleta até o julgamento",
      "A hierarquia dos peritos",
      "O tempo entre o crime e a autópsia",
    ],
    correta: 1,
    explicacao: "Cadeia de custódia é o rastreio íntegro e documentado da prova.",
  },
  {
    pergunta: "Impressões digitais são classificadas em três padrões principais. Quais?",
    opcoes: [
      "Arco, presilha e verticilo",
      "Linha, curva e espiral",
      "Fino, médio e grosso",
      "A, B e AB",
    ],
    correta: 0,
    explicacao: "Padrões dactiloscópicos: arco, presilha (laço) e verticilo (espiral).",
  },
  {
    pergunta: "O sangue A+ significa que:",
    opcoes: [
      "Não possui antígenos nas hemácias",
      "Possui antígeno A e fator Rh positivo",
      "Possui antígenos A e B",
      "Só pode doar para tipo O",
    ],
    correta: 1,
    explicacao: "Tipo A+ = antígeno A nas hemácias + fator Rh positivo.",
  },
  {
    pergunta: "Qual suspeito tinha ACESSO oficial ao laboratório?",
    opcoes: ["Ana", "Pedro", "Carla", "Rafael"],
    correta: 2,
    explicacao: "Como monitora, Carla possuía cartão de acesso.",
  },
  {
    pergunta: "Qual foi o provável motivo do crime?",
    opcoes: [
      "Vingança por reprovação",
      "Ciúme por bolsa de estudos",
      "Silenciar denúncia sobre desvio de reagentes",
      "Discussão sobre trabalho de História",
    ],
    correta: 2,
    explicacao: "Lucas iria denunciar Carla por desviar reagentes.",
  },
  {
    pergunta: "O que é uma prova digital em investigação criminal?",
    opcoes: [
      "Uma prova impressa em papel",
      "Qualquer informação armazenada eletronicamente que possa ser usada como evidência",
      "Uma digital coletada com scanner",
      "Fotos tiradas por celular",
    ],
    correta: 1,
    explicacao: "Provas digitais incluem logs, mensagens, e-mails, arquivos, metadados.",
  },
  {
    pergunta: "Por que o sangue encontrado NÃO pertence à vítima?",
    opcoes: [
      "Porque a vítima não sangrou",
      "Porque tem tipagem diferente da vítima (O-)",
      "Porque estava seco",
      "Porque foi analisado tarde demais",
    ],
    correta: 1,
    explicacao: "Vítima é O-; o sangue da cena é A+. Pertence ao agressor.",
  },
  {
    pergunta: "Qual conceito estuda a comparação de escrita manual?",
    opcoes: ["Balística", "Documentoscopia", "Toxicologia", "Entomologia forense"],
    correta: 1,
    explicacao: "Documentoscopia/grafotécnica analisa autoria e autenticidade de escritos.",
  },
  {
    pergunta: "O que é um álibi?",
    opcoes: [
      "Uma prova biológica",
      "Justificativa de onde a pessoa estava no momento do crime",
      "Um tipo de digital",
      "Um documento oficial",
    ],
    correta: 1,
    explicacao: "Álibi é a comprovação de estar em outro local no momento do fato.",
  },
  {
    pergunta: "Qual suspeito teve OPORTUNIDADE + MEIO + MOTIVO?",
    opcoes: ["Ana", "Pedro", "Carla", "Rafael"],
    correta: 2,
    explicacao:
      "Carla tinha acesso (meio), estava no local no horário (oportunidade) e temia ser denunciada (motivo).",
  },
];

export const CULPADO: SuspectId = "carla";
