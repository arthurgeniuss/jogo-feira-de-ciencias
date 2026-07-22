/**
 * Projeto Evidência: Descubra o Culpado
 * Jogo educativo em HTML/CSS/JS puro para Feira de Ciências.
 *
 * Conceitos abordados: tipagem sanguínea, impressões digitais, DNA (simulado),
 * cadeia de custódia, documentoscopia, perícia digital e raciocínio lógico.
 */

// ============================================
// DADOS DO JOGO
// ============================================

const CULPADO = "carla";

const suspects = [
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

const evidencias = [
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

const depoimentos = [
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

const timeline = [
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

const quiz = [
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
    opcoes: ["Bilhete rasgado", "Registro eletrônico de acesso", "Mensagens do celular", "Fotografia da cena"],
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
    opcoes: ["Arco, presilha e verticilo", "Linha, curva e espiral", "Fino, médio e grosso", "A, B e AB"],
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

// ============================================
// ESTADO DO JOGO
// ============================================

const state = {
  screen: "intro",
  started: false,
  elapsed: 0,
  visited: new Set(),
  quizAnswers: {},
  quizSubmitted: false,
  acusado: null,
  nomeJogador: "",
  ranking: [],
  timerId: null,
  startTime: 0,
};

// Elementos do DOM
const app = document.getElementById("app");
const modal = document.getElementById("evidence-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function formatTempo(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function nivelInvestigador(pct) {
  if (pct <= 40) return "Investigador Iniciante";
  if (pct <= 70) return "Investigador Experiente";
  if (pct <= 90) return "Perito Forense";
  return "Especialista Criminal";
}

function beep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 440;
    g.gain.value = 0.05;
    o.start();
    setTimeout(() => {
      o.stop();
      ctx.close();
    }, 80);
  } catch (e) {
    // Som opcional — silenciosamente ignorar erro
  }
}

function loadRanking() {
  try {
    const r = localStorage.getItem("evidencia_ranking");
    if (r) state.ranking = JSON.parse(r);
  } catch (e) {
    state.ranking = [];
  }
}

function saveRanking() {
  try {
    localStorage.setItem("evidencia_ranking", JSON.stringify(state.ranking));
  } catch (e) {
    // Ignora restrições de armazenamento
  }
}

function getAcertos() {
  return quiz.reduce((acc, q, i) => (state.quizAnswers[i] === q.correta ? acc + 1 : acc), 0);
}

function getProgresso() {
  const telasChave = ["suspeitos", "evidencias", "depoimentos", "timeline", "quiz"];
  const telasVisitadas = telasChave.filter((t) => state.visited.has(t)).length;
  const pctTelas = (telasVisitadas / telasChave.length) * 30;
  const pctAcertos = (getAcertos() / quiz.length) * 50;
  const pctAcusacao = state.acusado === CULPADO ? 20 : 0;
  return Math.round(pctTelas + pctAcertos + pctAcusacao);
}

function navigateTo(screen) {
  state.screen = screen;
  state.visited.add(screen);
  render();
}

// ============================================
// RENDERIZAÇÃO DAS TELAS
// ============================================

function render() {
  app.innerHTML = "";

  if (state.screen === "intro" && !state.started) {
    renderIntro();
  } else if (state.screen === "resultado") {
    renderResultado();
  } else {
    renderDashboard();
  }
}

function renderIntro() {
  const rankingHtml = state.ranking.length
    ? `
      <div class="evidence-card ranking-box">
        <h4 class="font-display text-primary" style="margin-bottom:0.75rem;">🏆 Ranking Local (Top 5)</h4>
        <ol class="ranking-list">
          ${state.ranking
            .slice(0, 5)
            .map(
              (r, i) => `
            <li>
              <span>${i + 1}. ${r.nome} ${r.culpadoCorreto ? "✅" : "❌"}</span>
              <span class="text-muted">${r.acertos}/${r.total} · ${formatTempo(r.tempo)}</span>
            </li>
          `,
            )
            .join("")}
        </ol>
      </div>
    `
    : "";

  app.innerHTML = `
    <div class="intro-screen">
      <div class="intro-bg"></div>
      <div class="intro-scanline"></div>
      <div class="police-tape py-2">⚠ CENA DE CRIME · NÃO ULTRAPASSE · PERÍCIA EM ANDAMENTO ⚠</div>

      <div class="intro-content">
        <div class="case-header">
          <div class="case-logo">PE</div>
          <div>
            <div class="case-meta">Departamento de Perícia Escolar</div>
            <div class="case-file">Arquivo Confidencial #007</div>
          </div>
        </div>

        <h1 class="intro-title font-display">Projeto Evidência</h1>
        <h2 class="intro-subtitle font-display">Descubra o Culpado</h2>

        <div class="evidence-card" style="padding:1.5rem; margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem;">
            <span style="font-size:1.25rem;">🔍</span>
            <h3 class="font-display" style="font-size:1.125rem;">Sobre o Caso</h3>
          </div>
          <p class="text-muted" style="font-size:0.95rem; line-height:1.6;">
            O aluno <strong class="text-primary">Lucas Andrade</strong> foi encontrado sem vida no laboratório da escola
            após o término das aulas. Quatro suspeitos foram identificados. Como perito(a) forense, você deve analisar
            evidências, ouvir depoimentos, cruzar a linha do tempo e apontar o culpado. Utilize conceitos de
            <span class="text-primary">Biologia Forense</span>, <span class="text-primary">Perícia Criminal</span> e
            <span class="text-primary">raciocínio lógico</span>.
          </p>
        </div>

        <div class="topics-grid">
          <div class="evidence-card topic-card">
            <div class="icon">🩸</div>
            <div class="text-muted">Tipagem sanguínea</div>
          </div>
          <div class="evidence-card topic-card">
            <div class="icon">🫆</div>
            <div class="text-muted">Impressões digitais</div>
          </div>
          <div class="evidence-card topic-card">
            <div class="icon">🧬</div>
            <div class="text-muted">DNA (simulado)</div>
          </div>
          <div class="evidence-card topic-card">
            <div class="icon">🔐</div>
            <div class="text-muted">Cadeia de custódia</div>
          </div>
        </div>

        <div>
          <label class="input-label" for="nome-jogador">Nome do(a) Perito(a)</label>
          <input
            id="nome-jogador"
            type="text"
            class="text-input"
            placeholder="Digite seu nome"
            value="${state.nomeJogador}"
            maxlength="30"
          />
        </div>

        <button class="btn-primary" id="btn-iniciar">Iniciar Investigação →</button>

        ${rankingHtml}
      </div>
    </div>
  `;

  document.getElementById("nome-jogador").addEventListener("input", (e) => {
    state.nomeJogador = e.target.value;
  });

  document.getElementById("btn-iniciar").addEventListener("click", () => {
    beep();
    iniciarInvestigacao();
  });
}

function iniciarInvestigacao() {
  state.started = true;
  state.elapsed = 0;
  state.visited = new Set();
  state.quizAnswers = {};
  state.quizSubmitted = false;
  state.acusado = null;
  state.startTime = Date.now();

  if (state.timerId) clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    updateDashboardStats();
  }, 1000);

  navigateTo("suspeitos");
}

function renderDashboard() {
  const menu = [
    { id: "suspeitos", label: "Suspeitos", icone: "👥" },
    { id: "evidencias", label: "Evidências", icone: "🔬" },
    { id: "depoimentos", label: "Depoimentos", icone: "💬" },
    { id: "timeline", label: "Linha do Tempo", icone: "⏱" },
    { id: "quiz", label: "Quiz", icone: "❓" },
    { id: "acusar", label: "Acusar", icone: "⚖️" },
  ];

  const progresso = getProgresso();

  app.innerHTML = `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="sidebar-brand-logo">PE</div>
            <div style="min-width:0;">
              <div class="sidebar-brand-title">Projeto Evidência</div>
              <div class="sidebar-brand-subtitle">Perito(a): ${state.nomeJogador || "Anônimo"}</div>
            </div>
          </div>
          <div class="sidebar-stats">
            <div class="sidebar-stat">
              <div class="sidebar-stat-label">Tempo</div>
              <div class="sidebar-stat-value" id="timer">${formatTempo(state.elapsed)}</div>
            </div>
            <div class="sidebar-stat">
              <div class="sidebar-stat-label">Progresso</div>
              <div class="sidebar-stat-value" id="progress">${progresso}%</div>
            </div>
          </div>
          <div class="sidebar-progress">
            <div class="sidebar-progress-bar" id="progress-bar" style="width:${progresso}%"></div>
          </div>
        </div>

        <nav class="sidebar-nav">
          ${menu
            .map(
              (m) => `
            <button class="nav-button ${state.screen === m.id ? "active" : ""}" data-screen="${m.id}">
              <span>${m.icone}</span>
              <span>${m.label}</span>
            </button>
          `,
            )
            .join("")}
        </nav>
      </aside>

      <main class="main-content">
        <div class="police-tape py-1">⚠ INVESTIGAÇÃO CONFIDENCIAL · ACESSO RESTRITO ⚠</div>
        <div class="main-inner" id="main-inner">
          <!-- Conteúdo da tela ativa será injetado aqui -->
        </div>
      </main>
    </div>
  `;

  app.querySelectorAll(".nav-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      beep();
      navigateTo(btn.dataset.screen);
    });
  });

  renderDashboardContent();
}

function updateDashboardStats() {
  const timer = document.getElementById("timer");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progress-bar");
  if (timer) timer.textContent = formatTempo(state.elapsed);
  if (progress) progress.textContent = `${getProgresso()}%`;
  if (progressBar) progressBar.style.width = `${getProgresso()}%`;
}

function renderDashboardContent() {
  const main = document.getElementById("main-inner");
  if (!main) return;

  switch (state.screen) {
    case "suspeitos":
      renderSuspeitos(main);
      break;
    case "evidencias":
      renderEvidencias(main);
      break;
    case "depoimentos":
      renderDepoimentos(main);
      break;
    case "timeline":
      renderTimeline(main);
      break;
    case "quiz":
      renderQuiz(main);
      break;
    case "acusar":
      renderAcusar(main);
      break;
  }
}

function sectionHeader(titulo, subtitulo, icone) {
  return `
    <header class="section-header">
      <div class="section-header-row">
        <span class="section-icon">${icone}</span>
        <div>
          <h2 class="section-title font-display">${titulo}</h2>
          <p class="section-subtitle">${subtitulo}</p>
        </div>
      </div>
      <div class="section-divider"></div>
    </header>
  `;
}

function renderSuspeitos(container) {
  const cards = suspects
    .map(
      (s) => `
      <article class="evidence-card suspect-card">
        <div class="suspect-header">
          <div class="suspect-avatar" style="background:${s.cor}">${s.foto}</div>
          <div style="min-width:0;">
            <h3 class="suspect-name font-display">${s.nome}</h3>
            <p class="suspect-info">${s.idade} anos · ${s.relacao}</p>
          </div>
        </div>
        <dl class="fields-list">
          <div class="field-row">
            <dt class="field-label">Motivo</dt>
            <dd>${s.motivo}</dd>
          </div>
          <div class="field-row">
            <dt class="field-label">Álibi</dt>
            <dd>${s.alibi}</dd>
          </div>
          <div class="field-row">
            <dt class="field-label">Tipo Sanguíneo</dt>
            <dd><span class="badge">${s.tipoSanguineo}</span></dd>
          </div>
        </dl>
      </article>
    `,
    )
    .join("");

  container.innerHTML = `
    <section>
      ${sectionHeader("Suspeitos", "Perfis completos das quatro pessoas de interesse.", "👥")}
      <div class="suspects-grid">${cards}</div>
      <div class="concept-box">
        <strong>Tipagem sanguínea:</strong> compare o tipo de cada suspeito com o sangue encontrado na cena.
        O grupo ABO é determinado pela presença dos antígenos A e B; o fator Rh (+/−) completa a classificação.
      </div>
    </section>
  `;
}

function renderEvidencias(container) {
  const cards = evidencias
    .map(
      (e) => `
      <button class="evidence-card evidence-button" data-id="${e.id}">
        <div class="evidence-top">
          <span class="evidence-icon">${e.icone}</span>
          <span class="evidence-id">EV-${String(e.id).padStart(3, "0")}</span>
        </div>
        <h3 class="evidence-title font-display">${e.titulo}</h3>
        <p class="evidence-short">${e.descricaoCurta}</p>
      </button>
    `,
    )
    .join("");

  container.innerHTML = `
    <section>
      ${sectionHeader("Evidências", "Materiais coletados na cena — clique para analisar.", "🔬")}
      <div class="evidence-grid">${cards}</div>
    </section>
  `;

  container.querySelectorAll(".evidence-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      beep();
      abrirEvidencia(Number(btn.dataset.id));
    });
  });
}

function abrirEvidencia(id) {
  const ev = evidencias.find((e) => e.id === id);
  if (!ev) return;

  document.getElementById("modal-icon").textContent = ev.icone;
  document.getElementById("modal-id").textContent = `EVIDÊNCIA #${String(ev.id).padStart(3, "0")}`;
  document.getElementById("modal-title").textContent = ev.titulo;
  document.getElementById("modal-desc").textContent = ev.descricao;
  document.getElementById("modal-concept").textContent = ev.conceito;

  modal.classList.remove("hidden");
  modalClose.focus();
}

function fecharModal() {
  modal.classList.add("hidden");
}

function renderDepoimentos(container) {
  const cards = depoimentos
    .map((d) => {
      const s = suspects.find((x) => x.id === d.suspeitoId);
      const contradicao = d.contradicao
        ? `<div class="testimony-contradiction"><strong>⚠ Contradição:</strong> ${d.contradicao}</div>`
        : "";
      return `
        <article class="evidence-card testimony-card">
          <div class="testimony-header">
            <div class="testimony-avatar" style="background:${s.cor}">${s.foto}</div>
            <div>
              <h3 class="testimony-name font-display">${s.nome}</h3>
              <p class="testimony-role">Depoimento formal</p>
            </div>
          </div>
          <blockquote class="testimony-quote">"${d.texto}"</blockquote>
          ${contradicao}
        </article>
      `;
    })
    .join("");

  container.innerHTML = `
    <section>
      ${sectionHeader("Depoimentos", "Escute atentamente — mentiras deixam pistas.", "💬")}
      <div class="testimony-list">${cards}</div>
      <div class="concept-box">
        <strong>Dica do perito:</strong> confronte cada afirmação com evidências e registros.
        Uma contradição entre um álibi e um dado objetivo (log, digital, sangue) é um forte indício.
      </div>
    </section>
  `;
}

function renderTimeline(container) {
  const items = timeline
    .map(
      (t) => `
      <li class="timeline-item">
        <span class="timeline-dot"></span>
        <div class="evidence-card timeline-card">
          <div class="timeline-time font-display">${t.hora}</div>
          <div class="timeline-desc">${t.descricao}</div>
        </div>
      </li>
    `,
    )
    .join("");

  container.innerHTML = `
    <section>
      ${sectionHeader("Linha do Tempo", "Sequência dos fatos registrados no dia do crime.", "⏱")}
      <ol class="timeline">${items}</ol>
    </section>
  `;
}

function renderQuiz(container) {
  const respondidas = Object.keys(state.quizAnswers).length;
  const podeEnviar = respondidas === quiz.length;
  const acertos = getAcertos();

  const questions = quiz
    .map((q, i) => {
      const options = q.opcoes
        .map((op, j) => {
          const selected = state.quizAnswers[i] === j;
          const isCorrect = state.quizSubmitted && j === q.correta;
          const isWrong = state.quizSubmitted && selected && j !== q.correta;
          const classes = ["quiz-option"];
          if (isCorrect) classes.push("correct");
          else if (isWrong) classes.push("wrong");
          else if (selected) classes.push("selected");

          return `
            <button
              class="${classes.join(" ")}"
              data-q="${i}" data-opt="${j}"
              ${state.quizSubmitted ? "disabled" : ""}
            >
              ${String.fromCharCode(65 + j)}. ${op}
            </button>
          `;
        })
        .join("");

      const explanation = state.quizSubmitted
        ? `<div class="quiz-explanation">${q.explicacao}</div>`
        : "";

      return `
        <article class="evidence-card quiz-question">
          <div class="quiz-header">
            <span class="quiz-number">${String(i + 1).padStart(2, "0")}</span>
            <h3 class="quiz-text">${q.pergunta}</h3>
          </div>
          <div class="quiz-options">${options}</div>
          ${explanation}
        </article>
      `;
    })
    .join("");

  const footer = !state.quizSubmitted
    ? `
      <button class="btn-primary" id="btn-enviar-quiz" ${!podeEnviar ? "disabled" : ""}>
        ${podeEnviar ? "Enviar Respostas" : `Responda todas (${respondidas}/${quiz.length})`}
      </button>
    `
    : `
      <div class="evidence-card quiz-result">
        <div class="concept-label">Resultado do Quiz</div>
        <div class="quiz-result-score font-display">${acertos}/${quiz.length}</div>
      </div>
    `;

  container.innerHTML = `
    <section>
      ${sectionHeader("Quiz Investigativo", `${respondidas}/${quiz.length} respondidas`, "❓")}
      <div class="quiz-list">${questions}</div>
      ${footer}
    </section>
  `;

  container.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      beep();
      state.quizAnswers[Number(btn.dataset.q)] = Number(btn.dataset.opt);
      renderDashboardContent();
      updateDashboardStats();
    });
  });

  const btnEnviar = document.getElementById("btn-enviar-quiz");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", () => {
      state.quizSubmitted = true;
      renderDashboardContent();
      updateDashboardStats();
    });
  }
}

function renderAcusar(container) {
  const cards = suspects
    .map(
      (s) => `
      <button class="evidence-card accuse-card ${state.acusado === s.id ? "selected" : ""}" data-id="${s.id}">
        <div class="accuse-card-inner">
          <div class="suspect-avatar" style="background:${s.cor}; width:3rem; height:3rem;">${s.foto}</div>
          <div style="min-width:0;">
            <div class="font-display text-primary" style="font-size:1rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.nome}</div>
            <div class="text-muted" style="font-size:0.75rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.relacao}</div>
          </div>
        </div>
      </button>
    `,
    )
    .join("");

  container.innerHTML = `
    <section>
      ${sectionHeader("Acusação Formal", "Aponte o(a) responsável pelo crime. Esta decisão é final.", "⚖️")}
      <div class="accuse-grid">${cards}</div>
      <button class="btn-danger" id="btn-finalizar" ${!state.acusado ? "disabled" : ""}>
        ${state.acusado ? "Confirmar Acusação e Encerrar Caso" : "Selecione um suspeito"}
      </button>
    </section>
  `;

  container.querySelectorAll(".accuse-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      beep();
      state.acusado = btn.dataset.id;
      renderDashboardContent();
      updateDashboardStats();
    });
  });

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    if (!state.acusado) return;
    finalizarInvestigacao();
  });
}

function finalizarInvestigacao() {
  clearInterval(state.timerId);
  state.timerId = null;

  const entry = {
    nome: state.nomeJogador.trim() || "Anônimo",
    acertos: getAcertos(),
    total: quiz.length,
    tempo: state.elapsed,
    nivel: nivelInvestigador(getProgresso()),
    culpadoCorreto: state.acusado === CULPADO,
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const next = [...state.ranking, entry]
    .sort((a, b) => {
      if (a.culpadoCorreto !== b.culpadoCorreto) return a.culpadoCorreto ? -1 : 1;
      if (b.acertos !== a.acertos) return b.acertos - a.acertos;
      return a.tempo - b.tempo;
    })
    .slice(0, 10);

  state.ranking = next;
  saveRanking();

  navigateTo("resultado");
}

function renderResultado() {
  const acertos = getAcertos();
  const total = quiz.length;
  const progresso = getProgresso();
  const nivel = nivelInvestigador(progresso);
  const acertouCulpado = state.acusado === CULPADO;
  const culpado = suspects.find((s) => s.id === CULPADO);

  const rankingHtml = state.ranking.length
    ? `
      <article class="evidence-card result-section">
        <h3 class="font-display">🏆 Ranking</h3>
        <ol class="ranking-list" style="font-size:0.875rem;">
          ${state.ranking
            .map(
              (r, i) => `
            <li>
              <span class="truncate">${i + 1}. ${r.nome} ${r.culpadoCorreto ? "✅" : "❌"}</span>
              <span class="text-muted" style="flex-shrink:0; margin-left:0.5rem;">
                ${r.acertos}/${r.total} · ${formatTempo(r.tempo)} · ${r.nivel}
              </span>
            </li>
          `,
            )
            .join("")}
        </ol>
      </article>
    `
    : "";

  app.innerHTML = `
    <div class="result-screen">
      <div class="police-tape py-2">⚠ CASO ENCERRADO · RELATÓRIO FINAL ⚠</div>
      <div class="result-content">
        <h1 class="result-title font-display">Relatório Final</h1>
        <p class="result-subtitle">Análise completa do caso #007 · Lucas Andrade</p>

        <div class="result-verdict ${acertouCulpado ? "success" : "error"}">
          <div class="result-verdict-title font-display">
            ${acertouCulpado ? "✅ Culpado identificado corretamente!" : "❌ Suspeito errado."}
          </div>
          <p style="font-size:0.9rem;">
            O(a) verdadeiro(a) responsável era
            <strong class="text-primary">${culpado.nome}</strong>.
          </p>
        </div>

        <div class="result-stats">
          <div class="evidence-card stat-card">
            <div class="stat-label">Acertos</div>
            <div class="stat-value font-display">${acertos}/${total}</div>
          </div>
          <div class="evidence-card stat-card">
            <div class="stat-label">Investigação</div>
            <div class="stat-value font-display">${progresso}%</div>
          </div>
          <div class="evidence-card stat-card">
            <div class="stat-label">Tempo</div>
            <div class="stat-value font-display">${formatTempo(state.elapsed)}</div>
          </div>
          <div class="evidence-card stat-card">
            <div class="stat-label">Nível</div>
            <div class="stat-value font-display small">${nivel}</div>
          </div>
        </div>

        <article class="evidence-card result-section">
          <h3 class="font-display">🔎 Como chegamos até aqui</h3>
          <ul class="result-list">
            <li>O sangue encontrado (A+) coincide com o tipo sanguíneo de <strong>Carla Oliveira</strong>, sugerindo que ela se feriu durante a luta.</li>
            <li>O registro eletrônico do laboratório mostra o cartão de Carla acessando o local às 14h15 — contradizendo diretamente seu depoimento.</li>
            <li>A última mensagem da vítima revela que iria confrontá-la sobre o desvio de reagentes: <strong>motivo</strong> claro.</li>
            <li>A digital no frasco e a caligrafia do bilhete de ameaça reforçam a autoria.</li>
          </ul>
        </article>

        <article class="evidence-card result-section">
          <h3 class="font-display">📚 Conceitos aplicados</h3>
          <div class="concepts-grid">
            <div class="concept-item">
              <strong>Tipagem sanguínea (ABO/Rh)</strong>
              <span>Comparação entre sangue da cena e dos suspeitos.</span>
            </div>
            <div class="concept-item">
              <strong>Impressões digitais</strong>
              <span>Identificação individual por padrões papilares.</span>
            </div>
            <div class="concept-item">
              <strong>DNA (simulado)</strong>
              <span>Material biológico como prova de contato.</span>
            </div>
            <div class="concept-item">
              <strong>Cadeia de custódia</strong>
              <span>Preservação e rastreio das provas.</span>
            </div>
            <div class="concept-item">
              <strong>Documentoscopia</strong>
              <span>Análise grafotécnica do bilhete.</span>
            </div>
            <div class="concept-item">
              <strong>Perícia digital</strong>
              <span>Recuperação de mensagens e leitura de logs.</span>
            </div>
          </div>
        </article>

        ${rankingHtml}

        <button class="btn-primary" id="btn-reiniciar">🔄 Novo Caso</button>
      </div>
    </div>
  `;

  document.getElementById("btn-reiniciar").addEventListener("click", () => {
    reiniciar();
  });
}

function reiniciar() {
  state.screen = "intro";
  state.started = false;
  state.elapsed = 0;
  state.visited = new Set();
  state.quizAnswers = {};
  state.quizSubmitted = false;
  state.acusado = null;
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
  render();
}

// ============================================
// EVENTOS GLOBAIS
// ============================================

modalBackdrop.addEventListener("click", fecharModal);
modalClose.addEventListener("click", fecharModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    fecharModal();
  }
});

// Inicialização
loadRanking();
render();
