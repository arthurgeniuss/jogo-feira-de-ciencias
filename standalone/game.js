/* =========================================================
   Projeto Evidência — O Mistério da Galeria de Arte
   Lógica do jogo em JavaScript puro (sem frameworks).
   Culpada: Vitória Sampaio (código 102).
   ========================================================= */

/* ---------------------- DADOS ---------------------- */

const SUSPEITOS = [
  { codigo: "101", nome: "Helena Duarte",   genero: "Feminino",  papel: "Curadora da exposição",       altura: "1,62 m", calcado: 36, sangue: "O+",  cabelo: "Preto, liso",       iniciais: "HD", cor: "#d97a5a" },
  { codigo: "102", nome: "Vitória Sampaio", genero: "Feminino",  papel: "Sócia investidora da galeria",altura: "1,70 m", calcado: 38, sangue: "AB+", cabelo: "Loiro, ondulado",   iniciais: "VS", cor: "#e8c15a" },
  { codigo: "103", nome: "Marina Rocha",    genero: "Feminino",  papel: "Artista convidada",           altura: "1,58 m", calcado: 35, sangue: "A-",  cabelo: "Castanho, cacheado",iniciais: "MR", cor: "#63b98a" },
  { codigo: "201", nome: "Otávio Bran",     genero: "Masculino", papel: "Segurança do evento",         altura: "1,80 m", calcado: 41, sangue: "B+",  cabelo: "Preto, curto",      iniciais: "OB", cor: "#6d9be0" },
  { codigo: "202", nome: "Sérgio Almeida",  genero: "Masculino", papel: "Crítico de arte convidado",   altura: "1,85 m", calcado: 42, sangue: "O-",  cabelo: "Grisalho",          iniciais: "SA", cor: "#a9b2bf" },
  { codigo: "203", nome: "Diego Farias",    genero: "Masculino", papel: "Garçom do coquetel",          altura: "1,75 m", calcado: 40, sangue: "A+",  cabelo: "Castanho, curto",   iniciais: "DF", cor: "#c47ad0" }
];

const CULPADO = "102";

const DEPOIMENTOS = [
  { codigo: "101", texto: "Passei a noite inteira recebendo os convidados na entrada principal. Ouvi um barulho vindo dos fundos por volta das 22h10, mas achei que fosse o pessoal do bufê descarregando caixas. Só entendi o que tinha acontecido quando a polícia chegou." },
  { codigo: "102", texto: "Discuti com ele sim, sobre dinheiro — todo mundo viu. Mas saí para o pátio tomar ar e não cheguei nem perto da área de serviço. Nunca toquei naquela faca. Este corte na minha mão foi de uma taça que quebrou na cozinha.",
    contradicao: "O sangue da lâmina é AB+, mesmo tipo dela; a digital da faca coincide com sua ficha; e a pegada em sangue é de calçado feminino nº 38, com estatura estimada de 1,70 m — exatamente seus dados." },
  { codigo: "103", texto: "Estava montando a última tela na sala 2 com dois assistentes. Vi a Vitória discutindo com o proprietário perto do corredor de serviço, mas não escutei o que diziam. Depois disso fiquei na sala até os gritos." },
  { codigo: "201", texto: "Sou o segurança. Cheguei a agarrar o proprietário pelo braço mais cedo, porque ele estava alterado e quis expulsar um convidado. Foi um empurra-empurra, nada além disso. Depois voltei para o monitor das câmeras.",
    contradicao: "Ele admite contato físico com a vítima, mas a única pegada em sangue na cena é de um modelo feminino nº 38 — incompatível com seu calçado nº 41." },
  { codigo: "202", texto: "Sou crítico, vim escrever sobre a mostra. Falei com o proprietário no início da noite sobre o catálogo e nada mais. Passei o resto do tempo no salão principal, sempre acompanhado." },
  { codigo: "203", texto: "Circulei a noite toda servindo canapés. Entrei na área de serviço várias vezes para repor as bandejas, é o meu trabalho. Na última vez, por volta das 22h20, a porta dos fundos estava trancada por dentro, o que era estranho." }
];

const EVIDENCIAS = [
  { id: "faca", titulo: "Faca de caça (arma do crime)", icone: "🔪", resumo: "Encontrada ao lado do corpo, com sangue seco na lâmina.",
    descricao: "Faca de caça de lâmina fixa, 18 cm, abandonada a 40 cm do corpo. A lâmina apresenta sangue de duas origens e o cabo conserva impressões digitais latentes reveladas com pó preto.",
    conceito: "A arma deve ser fotografada e etiquetada antes de ser movida. Todo deslocamento é registrado na cadeia de custódia." },
  { id: "pegada", titulo: "Pegada em sangue", icone: "👠", resumo: "Marca de calçado feminino modelo nº 38.",
    descricao: "Pegada parcial em sangue no piso da área de serviço. Solado de modelo feminino, comprimento compatível com numeração 38. Pela tabela de proporção pé/estatura, a autora tem aproximadamente 1,70 m.",
    conceito: "O comprimento do pé equivale, em média, a 15% da estatura. Por isso a pegada permite estimar a altura de quem a deixou." },
  { id: "tipagem", titulo: "Bancada de tipagem sanguínea", icone: "🩸", resumo: "Vítima O-; sangue da lâmina AB+.",
    descricao: "Testes com soros Anti-A, Anti-B e Anti-D: a amostra da vítima não aglutinou com Anti-A nem Anti-B e não reagiu ao Anti-D (O-). A amostra da lâmina aglutinou com Anti-A, Anti-B e Anti-D (AB+). Logo, parte do sangue é do agressor, ferido durante a luta.",
    conceito: "Sistema ABO e fator Rh: a aglutinação indica quais antígenos existem nas hemácias." },
  { id: "cabelo", titulo: "Fio de cabelo na lâmina", icone: "🧬", resumo: "Fio loiro, ondulado, com bulbo preservado.",
    descricao: "Um fio loiro ondulado ficou preso entre o cabo e a lâmina. O bulbo está preservado, o que permitiria exame de DNA. A vítima tinha cabelo castanho e curto.",
    conceito: "Tricologia forense: cor, forma da secção e presença de bulbo ajudam a vincular uma pessoa à cena." },
  { id: "cartoes", titulo: "Cartões de referência de digitais", icone: "🫆", resumo: "Padrões arco, presilha e verticilo para comparação.",
    descricao: "Fichas datiloscópicas dos seis retidos, para comparação visual com a digital latente coletada no cabo da faca.",
    conceito: "Impressões digitais são únicas e imutáveis. A identificação exige coincidência de pontos característicos." },
  { id: "laudo", titulo: "Laudo datiloscópico da faca", icone: "📄", resumo: "Resultado completo da comparação das digitais.", bloqueada: true,
    descricao: "A digital latente do cabo apresenta padrão verticilo com 14 pontos característicos coincidentes com a ficha da suspeita de código 102. As demais fichas foram excluídas.",
    conceito: "Doze pontos coincidentes já são considerados suficientes para identificação positiva no Brasil." },
  { id: "celular", titulo: "Celular da vítima", icone: "📱", resumo: "Mensagens recuperadas da noite do crime.", bloqueada: true,
    descricao: "Às 21h47 a vítima escreveu: \"A Vitória vai ter que devolver o dinheiro da galeria hoje ou eu levo tudo pro advogado amanhã.\" Às 22h02 recebeu: \"Me encontra nos fundos, vamos resolver isso agora.\"",
    conceito: "Perícia digital: mensagens, metadados e horários integram a prova e também exigem cadeia de custódia." }
];

const TABELA_ESTATURA = [
  { calcado: 34, estatura: "1,52 m – 1,56 m" },
  { calcado: 35, estatura: "1,56 m – 1,60 m" },
  { calcado: 36, estatura: "1,60 m – 1,65 m" },
  { calcado: 37, estatura: "1,65 m – 1,68 m" },
  { calcado: 38, estatura: "1,68 m – 1,72 m" },
  { calcado: 39, estatura: "1,72 m – 1,76 m" },
  { calcado: 40, estatura: "1,74 m – 1,78 m" },
  { calcado: 41, estatura: "1,78 m – 1,82 m" },
  { calcado: 42, estatura: "1,82 m – 1,87 m" }
];

const QUIZ = [
  { pergunta: "Qual é o primeiro procedimento ao chegar a uma cena de crime?", opcoes: ["Recolher a arma para o laboratório", "Isolar o perímetro e registrar a cena por fotografia", "Interrogar os suspeitos", "Cobrir o corpo"], correta: 1, explicacao: "Isolar e fotografar preserva a cena antes de qualquer objeto ser movido." },
  { pergunta: "O que é cadeia de custódia?", opcoes: ["A ordem dos interrogatórios", "O registro documentado do caminho de cada prova, da coleta ao julgamento", "A hierarquia dos peritos", "O tempo entre o crime e a autópsia"], correta: 1, explicacao: "Sem cadeia de custódia íntegra, a prova pode ser anulada em juízo." },
  { pergunta: "Por que peritos usam luvas, máscara e jaleco na cena?", opcoes: ["Apenas por uniforme", "Para evitar contaminação da cena e proteger o próprio perito", "Para não sujar a roupa", "Exigência do fotógrafo"], correta: 1, explicacao: "A paramentação evita que DNA, digitais e fibras do perito contaminem as provas." },
  { pergunta: "Uma amostra aglutinou com Anti-A, Anti-B e Anti-D. Qual o tipo sanguíneo?", opcoes: ["O-", "A+", "B-", "AB+"], correta: 3, explicacao: "Aglutinação nos três soros indica antígenos A, B e fator Rh positivo: AB+." },
  { pergunta: "O sangue da vítima é O- e o da lâmina é AB+. O que isso indica?", opcoes: ["A amostra foi contaminada", "Parte do sangue pertence ao agressor", "A vítima mudou de tipo sanguíneo", "Nada de relevante"], correta: 1, explicacao: "Tipos diferentes na mesma lâmina indicam uma segunda pessoa ferida na luta." },
  { pergunta: "O comprimento do pé corresponde, em média, a qual porcentagem da estatura?", opcoes: ["5%", "15%", "25%", "40%"], correta: 1, explicacao: "Cerca de 15% — por isso a pegada permite estimar a altura do autor." },
  { pergunta: "Uma pegada de calçado feminino nº 38 sugere estatura aproximada de:", opcoes: ["1,50 m", "1,60 m", "1,70 m", "1,85 m"], correta: 2, explicacao: "Pela tabela de proporção, nº 38 corresponde a cerca de 1,68 m a 1,72 m." },
  { pergunta: "Quais são os três padrões datiloscópicos principais?", opcoes: ["Arco, presilha e verticilo", "Linha, curva e espiral", "Fino, médio e grosso", "A, B e AB"], correta: 0, explicacao: "Arco, presilha (laço) e verticilo (espiral) são os padrões básicos." },
  { pergunta: "Uma digital latente é revelada principalmente com:", opcoes: ["Água oxigenada", "Pó revelador e pincel", "Luz solar direta", "Álcool em gel"], correta: 1, explicacao: "Pó revelador adere ao suor e à gordura deixados pela crista papilar." },
  { pergunta: "Por que o bulbo de um fio de cabelo é tão valioso?", opcoes: ["Porque indica a idade", "Porque contém material genético para exame de DNA", "Porque mostra a cor natural", "Porque resiste ao fogo"], correta: 1, explicacao: "O bulbo tem células com núcleo, permitindo o perfil genético." },
  { pergunta: "Um depoimento que contraria uma prova física deve ser tratado como:", opcoes: ["Verdade, pois a testemunha estava lá", "Indício de contradição a ser investigado", "Prova definitiva de culpa", "Informação irrelevante"], correta: 1, explicacao: "A prova material prevalece; a contradição orienta a investigação." },
  { pergunta: "O que caracteriza uma prova digital?", opcoes: ["Qualquer prova impressa", "Informação armazenada eletronicamente usada como evidência", "Somente digitais coletadas por scanner", "Fotos tiradas por celular"], correta: 1, explicacao: "Logs, mensagens, metadados e arquivos são provas digitais." }
];

const PROVAS = [
  { id: "p1", rotulo: "Pegada de calçado feminino nº 38 compatível com 1,70 m", correta: true },
  { id: "p2", rotulo: "Sangue AB+ na lâmina, igual ao tipo da acusada", correta: true },
  { id: "p3", rotulo: "Digital do cabo da faca com 14 pontos coincidentes", correta: true },
  { id: "p4", rotulo: "Fio de cabelo loiro preso na lâmina", correta: true },
  { id: "p5", rotulo: "Mensagem da vítima cobrando dinheiro da galeria", correta: true },
  { id: "p6", rotulo: "Depoimento do segurança sobre o empurra-empurra", correta: false },
  { id: "p7", rotulo: "Porta dos fundos trancada por dentro às 22h20", correta: false },
  { id: "p8", rotulo: "Cabelo grisalho de um dos convidados", correta: false }
];

const PASSOS = [
  { icone: "🥼", titulo: "Paramentação", texto: "Vista jaleco, luvas e máscara antes de entrar na área isolada." },
  { icone: "🧪", titulo: "Bancada de tipagem", texto: "Teste as amostras com os soros Anti-A, Anti-B e Anti-D e anote os tipos." },
  { icone: "📏", titulo: "Análise da pegada", texto: "Meça a pegada com a régua e estime a estatura pela tabela de proporção." },
  { icone: "🔎", titulo: "Consulta no app", texto: "Digite os 6 códigos das placas para abrir as fichas e ler os depoimentos." },
  { icone: "🧠", titulo: "Quiz de perícia", texto: "Acerte as questões para liberar o laudo das digitais e o celular da vítima." },
  { icone: "⚖️", titulo: "Veredito", texto: "Elimine os incompatíveis e envie a acusação com as provas que a sustentam." }
];

const MENU = [
  { id: "roteiro",     rotulo: "Roteiro do perito",   icone: "🧭" },
  { id: "fichas",      rotulo: "Fichas por código",   icone: "🪪" },
  { id: "depoimentos", rotulo: "Depoimentos",         icone: "🗣️" },
  { id: "evidencias",  rotulo: "Laboratório",         icone: "🔬" },
  { id: "estatura",    rotulo: "Tabela de estatura",  icone: "📏" },
  { id: "quiz",        rotulo: "Quiz de perícia",     icone: "🧠" },
  { id: "acusacao",    rotulo: "Acusação",            icone: "⚖️" }
];

const RANKING_KEY = "galeria-ranking-v1";

/* ---------------------- ESTADO ---------------------- */

const estado = {
  tela: "intro",
  equipe: "",
  inicio: null,
  tempo: 0,
  tempoFinal: 0,
  codigo: "",
  erroCodigo: "",
  consultados: [],
  fichaAberta: null,
  respostas: {},
  quizConcluido: false,
  codigoAcusado: "",
  provasMarcadas: [],
  erroAcusacao: "",
  acertou: false,
  ranking: carregarRanking()
};

/* ---------------------- UTILITÁRIOS ---------------------- */

const app = document.getElementById("app");
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function formatarTempo(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  return m + ":" + String(s % 60).padStart(2, "0");
}

function carregarRanking() {
  try { return JSON.parse(localStorage.getItem(RANKING_KEY)) || []; } catch (e) { return []; }
}

function salvarRanking(lista) {
  try { localStorage.setItem(RANKING_KEY, JSON.stringify(lista)); } catch (e) { /* sem persistência */ }
}

// Som curto opcional (Web Audio API) — usado em acertos e no veredito
function beep(freq) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  } catch (e) { /* áudio indisponível */ }
}

function acertosQuiz() {
  return QUIZ.reduce((t, q, i) => (estado.respostas[i] === q.correta ? t + 1 : t), 0);
}

function pontosProvas() {
  let p = 0;
  PROVAS.forEach((pr) => {
    if (estado.provasMarcadas.indexOf(pr.id) !== -1) p += pr.correta ? 1 : -1;
  });
  return p;
}

function progresso() {
  const fichas = (estado.consultados.length / SUSPEITOS.length) * 40;
  const q = (Object.keys(estado.respostas).length / QUIZ.length) * 40;
  const fim = estado.tela === "resultado" ? 20 : 0;
  return Math.min(100, Math.round(fichas + q + fim));
}

function nivel() {
  if (!estado.acertou) return "Estagiário";
  const pts = acertosQuiz() + Math.max(0, pontosProvas());
  if (pts >= 15) return "Perito-chefe";
  if (pts >= 11) return "Perito Criminal";
  return "Assistente de perícia";
}

/* ---------------------- TEMPORIZADOR ---------------------- */

setInterval(() => {
  if (estado.inicio === null || estado.tela === "resultado" || estado.tela === "intro") return;
  estado.tempo = Math.floor((Date.now() - estado.inicio) / 1000);
  const el = document.getElementById("timer");
  if (el) el.textContent = formatarTempo(estado.tempo);
}, 1000);

/* ---------------------- TELAS ---------------------- */

function telaIntro() {
  return `
    <div class="intro">
      <p class="kicker">PROJETO EVIDÊNCIA</p>
      <h1>O Mistério da Galeria de Arte</h1>
      <div class="card">
        <p>Durante o coquetel VIP de inauguração de uma exposição no centro da cidade, o proprietário da galeria foi encontrado morto nos fundos do estabelecimento. A arma usada foi uma faca de caça deixada na cena.</p>
        <p>A polícia isolou o perímetro com <strong>6 pessoas retidas</strong> — 3 mulheres e 3 homens, entre convidados e funcionários. Sua equipe de perícia foi chamada para coletar as provas na sala, analisar os dados neste aplicativo e apontar a autoria.</p>
      </div>
      <label class="muted">Nome da equipe de perícia
        <input id="equipe" class="input" style="margin-top:8px" placeholder="Ex.: Equipe Alfa" value="${esc(estado.equipe)}" />
      </label>
      <button class="btn" data-acao="iniciar">Iniciar investigação</button>
    </div>`;
}

function sidebar() {
  return `
    <aside class="sidebar">
      <div class="card">
        <p class="kicker">CASO GALERIA</p>
        <p class="muted">${esc(estado.equipe || "Equipe sem nome")}</p>
        <div class="status-row"><span class="muted">Tempo</span><span class="timer" id="timer">${formatarTempo(estado.tempo)}</span></div>
        <div class="status-row"><span class="muted">Progresso</span><span>${progresso()}%</span></div>
        <div class="bar"><div style="width:${progresso()}%"></div></div>
      </div>
      <nav class="nav">
        ${MENU.map((m) => `<button data-tela="${m.id}" class="${estado.tela === m.id ? "active" : ""}">${m.icone} ${m.rotulo}</button>`).join("")}
      </nav>
    </aside>`;
}

function telaRoteiro() {
  return bloco("Roteiro do perito", "Siga a ordem dos procedimentos na sala.", `
    <div class="grid grid-2">
      ${PASSOS.map((p, i) => `
        <div class="tile">
          <span class="icon">${p.icone}</span>
          <p class="kicker">PASSO ${i + 1}</p>
          <h3>${p.titulo}</h3>
          <p class="muted">${p.texto}</p>
        </div>`).join("")}
    </div>`);
}

function telaFichas() {
  const s = SUSPEITOS.find((x) => x.codigo === estado.fichaAberta);
  const ficha = !s ? "" : `
    <div class="card" style="margin-top:16px">
      <div class="ficha-head">
        <div class="avatar" style="background:${s.cor}">${s.iniciais}</div>
        <div>
          <p class="kicker">CÓDIGO ${s.codigo}</p>
          <h3 style="font-size:22px">${s.nome}</h3>
          <p class="muted">${s.papel}</p>
        </div>
      </div>
      <div class="dados">
        <div class="dado"><span>Gênero</span>${s.genero}</div>
        <div class="dado"><span>Altura</span>${s.altura}</div>
        <div class="dado"><span>Número do calçado</span>${s.calcado}</div>
        <div class="dado"><span>Tipo sanguíneo</span>${s.sangue}</div>
        <div class="dado"><span>Cabelo</span>${s.cabelo}</div>
      </div>
    </div>`;

  return bloco("Fichas por código", "Digite o código da placa que o suspeito está segurando na sala.", `
    <div class="card">
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <input id="codigo" class="input input-code" inputmode="numeric" maxlength="3" placeholder="000" value="${esc(estado.codigo)}" />
        <button class="btn" style="width:auto" data-acao="consultar">Consultar ficha</button>
      </div>
      <div class="keys">
        ${["1", "2", "3", "0", "⌫"].map((t) => `<button data-tecla="${t}">${t}</button>`).join("")}
      </div>
      ${estado.erroCodigo ? `<p class="error">${esc(estado.erroCodigo)}</p>` : ""}
      <p class="muted" style="margin-top:12px">Fichas consultadas: ${estado.consultados.length}/${SUSPEITOS.length}${estado.consultados.length ? " — " + estado.consultados.join(", ") : ""}</p>
    </div>
    ${ficha}`);
}

function telaDepoimentos() {
  return bloco("Relatório de depoimentos", "Cada depoimento é liberado depois que a ficha do suspeito é consultada.", `
    <div class="grid">
      ${DEPOIMENTOS.map((d) => {
        const s = SUSPEITOS.find((x) => x.codigo === d.codigo);
        const liberado = estado.consultados.indexOf(d.codigo) !== -1;
        if (!liberado) {
          return `<div class="card"><h3>Depoimento reservado <span class="kicker">#${d.codigo}</span></h3>
            <p class="muted" style="margin-top:8px">🔒 Consulte o código ${d.codigo} na tela de fichas para liberar.</p></div>`;
        }
        let extra = "";
        if (d.contradicao) {
          extra = estado.quizConcluido
            ? `<p class="contradiction"><strong>Contradição:</strong> ${d.contradicao}</p>`
            : `<p class="lock-note">🔒 Há uma análise de contradição neste depoimento — conclua o quiz para liberar.</p>`;
        }
        return `<div class="card"><h3>${s.nome} <span class="kicker">#${d.codigo}</span></h3>
          <p class="quote">"${d.texto}"</p>${extra}</div>`;
      }).join("")}
    </div>`);
}

function telaEvidencias() {
  return bloco("Laboratório de evidências", "Toque em uma evidência para ver o laudo e o conceito forense.", `
    <div class="grid grid-2">
      ${EVIDENCIAS.map((ev) => {
        const travada = ev.bloqueada && !estado.quizConcluido;
        return `<button class="tile ${travada ? "locked" : ""}" data-evidencia="${ev.id}">
          <span class="icon">${travada ? "🔒" : ev.icone}</span>
          <h3>${ev.titulo}</h3>
          <p class="muted">${travada ? "Liberado após o quiz de perícia." : ev.resumo}</p>
        </button>`;
      }).join("")}
    </div>`);
}

function telaEstatura() {
  return bloco("Tabela de estatura por calçado", "O comprimento do pé equivale a cerca de 15% da altura da pessoa.", `
    <div class="card" style="padding:0;overflow:hidden">
      <table>
        <thead><tr><th>Número do calçado</th><th>Estatura estimada</th></tr></thead>
        <tbody>
          ${TABELA_ESTATURA.map((l) => `<tr class="${l.calcado === 38 ? "highlight" : ""}"><td>${l.calcado}</td><td>${l.estatura}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="margin-top:12px">A pegada em sangue medida na cena corresponde ao número 38 em modelo feminino.</p>`);
}

function telaQuiz() {
  const respondidas = Object.keys(estado.respostas).length;
  return bloco("Quiz de perícia", `Acertos: ${acertosQuiz()}/${QUIZ.length} — concluir libera o laudo das digitais e o celular da vítima.`, `
    <div class="grid">
      ${QUIZ.map((q, i) => {
        const r = estado.respostas[i];
        const revelar = r !== undefined;
        return `<div class="card">
          <p class="kicker">QUESTÃO ${i + 1}</p>
          <h3 style="font-size:18px">${q.pergunta}</h3>
          ${q.opcoes.map((o, oi) => {
            let cls = "opt";
            if (revelar && oi === q.correta) cls += " correct";
            else if (revelar && oi === r) cls += " wrong";
            return `<button class="${cls}" data-q="${i}" data-o="${oi}">${o}</button>`;
          }).join("")}
          ${revelar ? `<p class="muted" style="margin-top:10px">${q.explicacao}</p>` : ""}
        </div>`;
      }).join("")}
    </div>
    <button class="btn" style="margin-top:16px" data-acao="concluir-quiz" ${respondidas < QUIZ.length || estado.quizConcluido ? "disabled" : ""}>
      ${estado.quizConcluido ? "Laudos liberados ✔" : `Concluir quiz (${respondidas}/${QUIZ.length})`}
    </button>`);
}

function telaAcusacao() {
  return bloco("Tela de acusação", "Informe o código do suspeito e marque as provas que comprovam a autoria.", `
    <div class="card">
      <label class="muted">Código do acusado
        <input id="acusado" class="input input-code" style="margin-top:8px" inputmode="numeric" maxlength="3" placeholder="000" value="${esc(estado.codigoAcusado)}" />
      </label>
      <p class="muted" style="margin-top:20px">Provas que sustentam a acusação</p>
      <div class="grid" style="margin-top:8px">
        ${PROVAS.map((p) => {
          const on = estado.provasMarcadas.indexOf(p.id) !== -1;
          return `<button class="check ${on ? "on" : ""}" data-prova="${p.id}"><span>${on ? "☑" : "☐"}</span> ${p.rotulo}</button>`;
        }).join("")}
      </div>
      ${estado.erroAcusacao ? `<p class="error">${esc(estado.erroAcusacao)}</p>` : ""}
      <button class="btn btn-accent" style="margin-top:16px" data-acao="veredito">Enviar veredito</button>
    </div>`);
}

function telaResultado() {
  return bloco("Laudo final", "Resultado da investigação da sua equipe.", `
    <div class="card result ${estado.acertou ? "win" : "lose"}">
      <h3 style="font-size:22px">${estado.acertou ? "Caso solucionado! 🎉" : "Acusação incorreta"}</h3>
      <p class="muted" style="margin-top:8px">A autora do crime é <strong style="color:var(--fg)">Vitória Sampaio</strong> (código 102): calçado nº 38 e 1,70 m compatíveis com a pegada, sangue AB+ igual ao da lâmina, digital no cabo da faca e fio de cabelo loiro na arma.</p>
      <div class="grid grid-4" style="margin-top:20px">
        <div class="metric"><span>Quiz</span><strong>${acertosQuiz()}/${QUIZ.length}</strong></div>
        <div class="metric"><span>Aproveitamento</span><strong>${Math.round((acertosQuiz() / QUIZ.length) * 100)}%</strong></div>
        <div class="metric"><span>Tempo</span><strong>${formatarTempo(estado.tempoFinal)}</strong></div>
        <div class="metric"><span>Nível</span><strong>${nivel()}</strong></div>
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <h3 style="font-size:18px">Ranking local</h3>
      <div class="grid" style="margin-top:12px">
        ${estado.ranking.map((r, i) => `<div class="rank-item"><span>${i + 1}. ${esc(r.equipe)} ${r.acertou ? "✔" : "✘"}</span><span class="muted">${r.quizAcertos}/${QUIZ.length} · ${formatarTempo(r.tempo)} · ${r.nivel}</span></div>`).join("")}
      </div>
    </div>
    <button class="btn" style="margin-top:16px" data-acao="reiniciar">Nova investigação</button>`);
}

function bloco(titulo, subtitulo, conteudo) {
  return `<section class="screen"><h2>${titulo}</h2><p class="muted">${subtitulo}</p>${conteudo}</section>`;
}

/* ---------------------- RENDER ---------------------- */

function render() {
  if (estado.tela === "intro") {
    app.innerHTML = telaIntro();
    return;
  }
  const telas = {
    roteiro: telaRoteiro,
    fichas: telaFichas,
    depoimentos: telaDepoimentos,
    evidencias: telaEvidencias,
    estatura: telaEstatura,
    quiz: telaQuiz,
    acusacao: telaAcusacao,
    resultado: telaResultado
  };
  app.innerHTML = `<div class="layout">${sidebar()}<div>${telas[estado.tela]()}</div></div>`;
}

/* ---------------------- AÇÕES ---------------------- */

function consultarCodigo() {
  const campo = document.getElementById("codigo");
  const valor = (campo ? campo.value : estado.codigo).trim();
  const s = SUSPEITOS.find((x) => x.codigo === valor);
  if (!s) {
    estado.erroCodigo = "Código não consta no cadastro de retidos. Confira a placa.";
    estado.fichaAberta = null;
  } else {
    estado.erroCodigo = "";
    estado.fichaAberta = s.codigo;
    if (estado.consultados.indexOf(s.codigo) === -1) estado.consultados.push(s.codigo);
    estado.codigo = "";
    beep(660);
  }
  render();
}

function enviarVeredito() {
  const campo = document.getElementById("acusado");
  estado.codigoAcusado = campo ? campo.value.trim() : estado.codigoAcusado;
  const alvo = SUSPEITOS.find((x) => x.codigo === estado.codigoAcusado);
  if (!alvo) { estado.erroAcusacao = "Digite um código válido de suspeito (101 a 203)."; return render(); }
  if (estado.provasMarcadas.length === 0) { estado.erroAcusacao = "Marque ao menos uma prova que sustente a acusação."; return render(); }

  estado.erroAcusacao = "";
  estado.acertou = alvo.codigo === CULPADO;
  estado.tempoFinal = estado.inicio ? Math.floor((Date.now() - estado.inicio) / 1000) : 0;
  beep(estado.acertou ? 880 : 220);

  estado.ranking = estado.ranking.concat([{
    equipe: estado.equipe || "Equipe sem nome",
    acertou: estado.acertou,
    quizAcertos: acertosQuiz(),
    tempo: estado.tempoFinal,
    nivel: nivel()
  }]).sort((a, b) => (b.acertou - a.acertou) || (b.quizAcertos - a.quizAcertos) || (a.tempo - b.tempo)).slice(0, 10);
  salvarRanking(estado.ranking);

  estado.tela = "resultado";
  render();
}

function reiniciar() {
  estado.tela = "intro";
  estado.inicio = null;
  estado.tempo = 0;
  estado.consultados = [];
  estado.fichaAberta = null;
  estado.codigo = "";
  estado.erroCodigo = "";
  estado.respostas = {};
  estado.quizConcluido = false;
  estado.codigoAcusado = "";
  estado.provasMarcadas = [];
  estado.erroAcusacao = "";
  estado.acertou = false;
  render();
}

/* ---------------------- MODAL ---------------------- */

const modal = document.getElementById("modal");
function abrirEvidencia(id) {
  const ev = EVIDENCIAS.find((e) => e.id === id);
  if (!ev || (ev.bloqueada && !estado.quizConcluido)) return;
  document.getElementById("modal-icon").textContent = ev.icone;
  document.getElementById("modal-title").textContent = ev.titulo;
  document.getElementById("modal-desc").textContent = ev.descricao;
  document.getElementById("modal-concept").textContent = ev.conceito;
  modal.classList.remove("hidden");
}
function fecharModal() { modal.classList.add("hidden"); }
document.getElementById("modal-close").addEventListener("click", fecharModal);
document.getElementById("modal-backdrop").addEventListener("click", fecharModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharModal(); });

/* ---------------------- EVENTOS GLOBAIS ---------------------- */

app.addEventListener("click", (e) => {
  const alvo = e.target.closest("button");
  if (!alvo) return;

  if (alvo.dataset.tela) { estado.tela = alvo.dataset.tela; return render(); }
  if (alvo.dataset.evidencia) return abrirEvidencia(alvo.dataset.evidencia);

  if (alvo.dataset.tecla) {
    const campo = document.getElementById("codigo");
    const atual = campo ? campo.value : "";
    estado.codigo = alvo.dataset.tecla === "⌫" ? atual.slice(0, -1) : (atual + alvo.dataset.tecla).slice(0, 3);
    return render();
  }

  if (alvo.dataset.q !== undefined) {
    const i = Number(alvo.dataset.q);
    if (estado.respostas[i] !== undefined) return;
    const opcao = Number(alvo.dataset.o);
    estado.respostas[i] = opcao;
    beep(opcao === QUIZ[i].correta ? 780 : 240);
    return render();
  }

  if (alvo.dataset.prova) {
    const id = alvo.dataset.prova;
    const idx = estado.provasMarcadas.indexOf(id);
    if (idx === -1) estado.provasMarcadas.push(id); else estado.provasMarcadas.splice(idx, 1);
    const campo = document.getElementById("acusado");
    if (campo) estado.codigoAcusado = campo.value;
    return render();
  }

  switch (alvo.dataset.acao) {
    case "iniciar": {
      const campo = document.getElementById("equipe");
      estado.equipe = campo ? campo.value.trim() : "";
      estado.inicio = Date.now();
      estado.tela = "roteiro";
      return render();
    }
    case "consultar": return consultarCodigo();
    case "concluir-quiz": estado.quizConcluido = true; beep(880); return render();
    case "veredito": return enviarVeredito();
    case "reiniciar": return reiniciar();
  }
});

// Enter confirma o código digitado
app.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (e.target.id === "codigo") { e.preventDefault(); consultarCodigo(); }
  if (e.target.id === "acusado") { e.preventDefault(); enviarVeredito(); }
});

/* ---------------------- INÍCIO ---------------------- */
render();
