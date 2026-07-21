import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  suspects,
  evidencias,
  depoimentos,
  timeline,
  quiz,
  CULPADO,
  type SuspectId,
} from "../lib/game-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto Evidência: Descubra o Culpado" },
      {
        name: "description",
        content:
          "Jogo investigativo educacional de perícia criminal e biologia forense para feira de ciências. Analise evidências, interrogue suspeitos e descubra o culpado.",
      },
      { property: "og:title", content: "Projeto Evidência: Descubra o Culpado" },
      {
        property: "og:description",
        content:
          "Assuma o papel de perito forense e resolva um crime fictício em uma escola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Special+Elite&family=Inter:wght@400;500;600;700;900&display=swap",
      },
    ],
  }),
  component: Game,
});

type Screen =
  | "intro"
  | "suspeitos"
  | "evidencias"
  | "depoimentos"
  | "timeline"
  | "quiz"
  | "acusar"
  | "resultado";

interface RankingEntry {
  nome: string;
  acertos: number;
  total: number;
  tempo: number;
  nivel: string;
  culpadoCorreto: boolean;
  data: string;
}

function formatTempo(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function nivelInvestigador(pct: number) {
  if (pct <= 40) return "Investigador Iniciante";
  if (pct <= 70) return "Investigador Experiente";
  if (pct <= 90) return "Perito Forense";
  return "Especialista Criminal";
}

function Game() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [visited, setVisited] = useState<Set<Screen>>(new Set());

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Acusação
  const [acusado, setAcusado] = useState<SuspectId | null>(null);
  const [finalizado, setFinalizado] = useState(false);

  // Nome jogador (para ranking)
  const [nomeJogador, setNomeJogador] = useState("");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  // Timer
  const startRef = useRef<number>(0);
  useEffect(() => {
    if (!started || finalizado) return;
    startRef.current = Date.now() - elapsed * 1000;
    const iv = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finalizado]);

  // Load ranking
  useEffect(() => {
    try {
      const r = localStorage.getItem("evidencia_ranking");
      if (r) setRanking(JSON.parse(r));
    } catch {}
  }, []);

  const acertos = useMemo(
    () =>
      quiz.reduce(
        (acc, q, i) => (quizAnswers[i] === q.correta ? acc + 1 : acc),
        0,
      ),
    [quizAnswers],
  );
  const totalQuiz = quiz.length;
  const pctQuiz = Math.round((acertos / totalQuiz) * 100);

  // Percentual de investigação: baseia-se em telas visitadas + acertos + acusação correta
  const pctInvestigacao = useMemo(() => {
    const telasChave: Screen[] = [
      "suspeitos",
      "evidencias",
      "depoimentos",
      "timeline",
      "quiz",
    ];
    const telasVisitadas = telasChave.filter((t) => visited.has(t)).length;
    const pctTelas = (telasVisitadas / telasChave.length) * 30;
    const pctAcertos = (acertos / totalQuiz) * 50;
    const pctAcusacao = acusado === CULPADO ? 20 : 0;
    return Math.round(pctTelas + pctAcertos + pctAcusacao);
  }, [visited, acertos, acusado, totalQuiz]);

  const nivel = nivelInvestigador(pctInvestigacao);

  function navigate(s: Screen) {
    setScreen(s);
    setVisited((v) => new Set(v).add(s));
  }

  function iniciar() {
    setStarted(true);
    setElapsed(0);
    setVisited(new Set());
    navigate("suspeitos");
  }

  function finalizarInvestigacao() {
    if (!acusado) return;
    setFinalizado(true);
    setScreen("resultado");
    // salvar ranking
    const entry: RankingEntry = {
      nome: nomeJogador.trim() || "Anônimo",
      acertos,
      total: totalQuiz,
      tempo: elapsed,
      nivel,
      culpadoCorreto: acusado === CULPADO,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    const next = [...ranking, entry]
      .sort((a, b) => {
        if (a.culpadoCorreto !== b.culpadoCorreto) return a.culpadoCorreto ? -1 : 1;
        if (b.acertos !== a.acertos) return b.acertos - a.acertos;
        return a.tempo - b.tempo;
      })
      .slice(0, 10);
    setRanking(next);
    try {
      localStorage.setItem("evidencia_ranking", JSON.stringify(next));
    } catch {}
  }

  function reiniciar() {
    setScreen("intro");
    setStarted(false);
    setFinalizado(false);
    setElapsed(0);
    setVisited(new Set());
    setQuizAnswers({});
    setQuizSubmitted(false);
    setAcusado(null);
  }

  // Sound (beep opcional)
  function beep() {
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
    } catch {}
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {screen === "intro" && !started ? (
        <IntroScreen onStart={iniciar} nome={nomeJogador} setNome={setNomeJogador} ranking={ranking} />
      ) : screen === "resultado" ? (
        <ResultadoScreen
          acertos={acertos}
          total={totalQuiz}
          pctInvestigacao={pctInvestigacao}
          tempo={elapsed}
          nivel={nivel}
          acusado={acusado}
          ranking={ranking}
          onReiniciar={reiniciar}
        />
      ) : (
        <Dashboard
          screen={screen}
          navigate={(s) => {
            beep();
            navigate(s);
          }}
          elapsed={elapsed}
          progresso={pctInvestigacao}
          quizAnswers={quizAnswers}
          setQuizAnswers={setQuizAnswers}
          quizSubmitted={quizSubmitted}
          setQuizSubmitted={setQuizSubmitted}
          acusado={acusado}
          setAcusado={setAcusado}
          onFinalizar={finalizarInvestigacao}
          nomeJogador={nomeJogador}
        />
      )}
    </div>
  );
}

/* ============================ INTRO ============================ */
function IntroScreen({
  onStart,
  nome,
  setNome,
  ranking,
}: {
  onStart: () => void;
  nome: string;
  setNome: (s: string) => void;
  ranking: RankingEntry[];
}) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, oklch(0.55 0.2 25 / 0.3), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.4 0.15 250 / 0.4), transparent 50%)",
        }}
      />
      <div className="scanline absolute inset-0 pointer-events-none opacity-40" />

      <div className="police-tape py-2 text-center text-xs sm:text-sm relative z-10">
        ⚠ CENA DE CRIME · NÃO ULTRAPASSE · PERÍCIA EM ANDAMENTO ⚠
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 sm:py-16 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded border-2 border-primary grid place-items-center text-primary font-display text-2xl">
            PE
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Departamento de Perícia Escolar
            </div>
            <div className="font-display text-lg text-primary">Arquivo Confidencial #007</div>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl leading-tight mb-2">
          Projeto Evidência
        </h1>
        <h2 className="font-display text-xl sm:text-2xl text-primary mb-8">
          Descubra o Culpado
        </h2>

        <div className="evidence-card rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔍</span>
            <h3 className="font-display text-lg">Sobre o Caso</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            O aluno <span className="text-foreground font-semibold">Lucas Andrade</span>{" "}
            foi encontrado sem vida no laboratório da escola após o término das aulas.
            Quatro suspeitos foram identificados. Como perito(a) forense, você deve
            analisar evidências, ouvir depoimentos, cruzar a linha do tempo e apontar o
            culpado. Utilize conceitos de{" "}
            <span className="text-primary">Biologia Forense</span>,{" "}
            <span className="text-primary">Perícia Criminal</span> e{" "}
            <span className="text-primary">raciocínio lógico</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icone: "🩸", label: "Tipagem sanguínea" },
            { icone: "🫆", label: "Impressões digitais" },
            { icone: "🧬", label: "DNA (simulado)" },
            { icone: "🔐", label: "Cadeia de custódia" },
          ].map((c) => (
            <div
              key={c.label}
              className="evidence-card rounded p-3 text-center text-xs"
            >
              <div className="text-2xl mb-1">{c.icone}</div>
              <div className="text-muted-foreground">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Nome do(a) Perito(a)
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full bg-input border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99]"
        >
          Iniciar Investigação →
        </button>

        {ranking.length > 0 && (
          <div className="mt-8 evidence-card rounded-lg p-4">
            <h4 className="font-display text-sm text-primary mb-3">
              🏆 Ranking Local (Top 5)
            </h4>
            <ol className="space-y-1 text-xs">
              {ranking.slice(0, 5).map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-border/50 pb-1"
                >
                  <span>
                    {i + 1}. {r.nome} {r.culpadoCorreto ? "✅" : "❌"}
                  </span>
                  <span className="text-muted-foreground">
                    {r.acertos}/{r.total} · {formatTempo(r.tempo)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ DASHBOARD ============================ */
function Dashboard({
  screen,
  navigate,
  elapsed,
  progresso,
  quizAnswers,
  setQuizAnswers,
  quizSubmitted,
  setQuizSubmitted,
  acusado,
  setAcusado,
  onFinalizar,
  nomeJogador,
}: {
  screen: Screen;
  navigate: (s: Screen) => void;
  elapsed: number;
  progresso: number;
  quizAnswers: Record<number, number>;
  setQuizAnswers: (u: Record<number, number>) => void;
  quizSubmitted: boolean;
  setQuizSubmitted: (b: boolean) => void;
  acusado: SuspectId | null;
  setAcusado: (s: SuspectId) => void;
  onFinalizar: () => void;
  nomeJogador: string;
}) {
  const menu: { id: Screen; label: string; icone: string }[] = [
    { id: "suspeitos", label: "Suspeitos", icone: "👥" },
    { id: "evidencias", label: "Evidências", icone: "🔬" },
    { id: "depoimentos", label: "Depoimentos", icone: "💬" },
    { id: "timeline", label: "Linha do Tempo", icone: "⏱" },
    { id: "quiz", label: "Quiz", icone: "❓" },
    { id: "acusar", label: "Acusar", icone: "⚖️" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-72 bg-sidebar border-b lg:border-b-0 lg:border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded border-2 border-primary grid place-items-center text-primary font-display">
              PE
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm text-primary truncate">
                Projeto Evidência
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                Perito(a): {nomeJogador || "Anônimo"}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-sidebar-accent rounded p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Tempo</div>
              <div className="font-display text-primary">{formatTempo(elapsed)}</div>
            </div>
            <div className="bg-sidebar-accent rounded p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Progresso</div>
              <div className="font-display text-primary">{progresso}%</div>
            </div>
          </div>
          <div className="mt-2 h-1.5 bg-sidebar-accent rounded overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        <nav className="p-2 grid grid-cols-3 lg:grid-cols-1 gap-1">
          {menu.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(m.id)}
              className={`text-left px-3 py-2.5 rounded text-sm flex items-center gap-2 transition-all ${
                screen === m.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <span className="text-base">{m.icone}</span>
              <span className="truncate">{m.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 relative">
        <div className="police-tape py-1.5 text-center text-[10px] sm:text-xs">
          ⚠ INVESTIGAÇÃO CONFIDENCIAL · ACESSO RESTRITO ⚠
        </div>

        <div key={screen} className="p-4 sm:p-8 animate-fade-in max-w-5xl mx-auto">
          {screen === "suspeitos" && <TelaSuspeitos />}
          {screen === "evidencias" && <TelaEvidencias />}
          {screen === "depoimentos" && <TelaDepoimentos />}
          {screen === "timeline" && <TelaTimeline />}
          {screen === "quiz" && (
            <TelaQuiz
              answers={quizAnswers}
              setAnswers={setQuizAnswers}
              submitted={quizSubmitted}
              setSubmitted={setQuizSubmitted}
            />
          )}
          {screen === "acusar" && (
            <TelaAcusar
              acusado={acusado}
              setAcusado={setAcusado}
              onFinalizar={onFinalizar}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ============================ SUSPEITOS ============================ */
function TelaSuspeitos() {
  return (
    <section>
      <SectionHeader
        titulo="Suspeitos"
        subtitulo="Perfis completos das quatro pessoas de interesse."
        icone="👥"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {suspects.map((s) => (
          <article key={s.id} className="evidence-card rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full grid place-items-center font-display text-lg shrink-0"
                style={{ background: s.cor, color: "oklch(0.16 0.02 250)" }}
              >
                {s.foto}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg text-primary truncate">{s.nome}</h3>
                <p className="text-xs text-muted-foreground">
                  {s.idade} anos · {s.relacao}
                </p>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <Field label="Motivo" value={s.motivo} />
              <Field label="Álibi" value={s.alibi} />
              <Field
                label="Tipo Sanguíneo"
                value={
                  <span className="inline-block px-2 py-0.5 rounded bg-destructive/20 text-destructive font-bold">
                    {s.tipoSanguineo}
                  </span>
                }
              />
            </dl>
          </article>
        ))}
      </div>
      <ConceitoBox>
        <strong>Tipagem sanguínea:</strong> compare o tipo de cada suspeito com o
        sangue encontrado na cena. O grupo ABO é determinado pela presença dos
        antígenos A e B; o fator Rh (+/−) completa a classificação.
      </ConceitoBox>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-2">
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground pt-0.5">
        {label}
      </dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

/* ============================ EVIDÊNCIAS ============================ */
function TelaEvidencias() {
  const [sel, setSel] = useState<number | null>(null);
  const ev = evidencias.find((e) => e.id === sel);
  return (
    <section>
      <SectionHeader
        titulo="Evidências"
        subtitulo="Materiais coletados na cena — clique para analisar."
        icone="🔬"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {evidencias.map((e) => (
          <button
            key={e.id}
            onClick={() => setSel(e.id)}
            className="evidence-card rounded-lg p-4 text-left hover:border-primary transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{e.icone}</span>
              <span className="text-[10px] font-mono text-muted-foreground">
                EV-{String(e.id).padStart(3, "0")}
              </span>
            </div>
            <h3 className="font-display text-sm text-primary mb-1">{e.titulo}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {e.descricaoCurta}
            </p>
          </button>
        ))}
      </div>

      {ev && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 grid place-items-center p-4 animate-fade-in"
          onClick={() => setSel(null)}
        >
          <div
            className="evidence-card rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{ev.icone}</span>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    EVIDÊNCIA #{String(ev.id).padStart(3, "0")}
                  </div>
                  <h3 className="font-display text-lg text-primary">{ev.titulo}</h3>
                </div>
              </div>
              <button
                onClick={() => setSel(null)}
                className="text-muted-foreground hover:text-foreground text-xl"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              {ev.descricao}
            </p>
            <div className="border-l-2 border-primary pl-3 text-xs text-muted-foreground">
              <div className="uppercase tracking-widest text-primary text-[10px] mb-1">
                Conceito Forense
              </div>
              {ev.conceito}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================ DEPOIMENTOS ============================ */
function TelaDepoimentos() {
  return (
    <section>
      <SectionHeader
        titulo="Depoimentos"
        subtitulo="Escute atentamente — mentiras deixam pistas."
        icone="💬"
      />
      <div className="space-y-4">
        {depoimentos.map((d) => {
          const s = suspects.find((x) => x.id === d.suspeitoId)!;
          return (
            <article key={d.suspeitoId} className="evidence-card rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full grid place-items-center font-display text-sm shrink-0"
                  style={{ background: s.cor, color: "oklch(0.16 0.02 250)" }}
                >
                  {s.foto}
                </div>
                <div>
                  <h3 className="font-display text-primary">{s.nome}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Depoimento formal
                  </p>
                </div>
              </div>
              <blockquote className="border-l-2 border-primary/50 pl-4 text-sm italic text-foreground/90">
                "{d.texto}"
              </blockquote>
            </article>
          );
        })}
      </div>
      <ConceitoBox>
        <strong>Dica do perito:</strong> confronte cada afirmação com evidências e
        registros. Uma contradição entre um álibi e um dado objetivo (log, digital,
        sangue) é um forte indício.
      </ConceitoBox>
    </section>
  );
}

/* ============================ TIMELINE ============================ */
function TelaTimeline() {
  return (
    <section>
      <SectionHeader
        titulo="Linha do Tempo"
        subtitulo="Sequência dos fatos registrados no dia do crime."
        icone="⏱"
      />
      <ol className="relative border-l-2 border-primary/40 pl-6 space-y-4">
        {timeline.map((t, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
            <div className="evidence-card rounded p-3">
              <div className="font-display text-primary">{t.hora}</div>
              <div className="text-sm text-foreground/90">{t.descricao}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============================ QUIZ ============================ */
function TelaQuiz({
  answers,
  setAnswers,
  submitted,
  setSubmitted,
}: {
  answers: Record<number, number>;
  setAnswers: (u: Record<number, number>) => void;
  submitted: boolean;
  setSubmitted: (b: boolean) => void;
}) {
  const acertos = quiz.reduce(
    (a, q, i) => (answers[i] === q.correta ? a + 1 : a),
    0,
  );
  const respondidas = Object.keys(answers).length;
  const podeEnviar = respondidas === quiz.length;

  return (
    <section>
      <SectionHeader
        titulo="Quiz Investigativo"
        subtitulo={`${respondidas}/${quiz.length} respondidas`}
        icone="❓"
      />

      <div className="space-y-4">
        {quiz.map((q, i) => (
          <article key={i} className="evidence-card rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-[10px] font-mono text-muted-foreground mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold flex-1">{q.pergunta}</h3>
            </div>
            <div className="grid gap-2">
              {q.opcoes.map((op, j) => {
                const selected = answers[i] === j;
                const correta = submitted && j === q.correta;
                const errada = submitted && selected && j !== q.correta;
                return (
                  <button
                    key={j}
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [i]: j })}
                    className={`text-left text-sm px-3 py-2 rounded border transition-all ${
                      correta
                        ? "border-success bg-success/10 text-success"
                        : errada
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                    }`}
                  >
                    {String.fromCharCode(65 + j)}. {op}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 text-xs text-muted-foreground border-l-2 border-primary pl-3">
                {q.explicacao}
              </p>
            )}
          </article>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!podeEnviar}
          className="mt-6 w-full bg-primary text-primary-foreground font-bold py-3 rounded uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
        >
          {podeEnviar ? "Enviar Respostas" : `Responda todas (${respondidas}/${quiz.length})`}
        </button>
      ) : (
        <div className="mt-6 evidence-card rounded p-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Resultado do Quiz
          </div>
          <div className="font-display text-3xl text-primary mt-1">
            {acertos}/{quiz.length}
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================ ACUSAR ============================ */
function TelaAcusar({
  acusado,
  setAcusado,
  onFinalizar,
}: {
  acusado: SuspectId | null;
  setAcusado: (s: SuspectId) => void;
  onFinalizar: () => void;
}) {
  return (
    <section>
      <SectionHeader
        titulo="Acusação Formal"
        subtitulo="Aponte o(a) responsável pelo crime. Esta decisão é final."
        icone="⚖️"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {suspects.map((s) => (
          <button
            key={s.id}
            onClick={() => setAcusado(s.id)}
            className={`evidence-card rounded-lg p-4 text-left transition-all ${
              acusado === s.id
                ? "ring-2 ring-primary scale-[1.02]"
                : "hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full grid place-items-center font-display shrink-0"
                style={{ background: s.cor, color: "oklch(0.16 0.02 250)" }}
              >
                {s.foto}
              </div>
              <div className="min-w-0">
                <div className="font-display text-primary truncate">{s.nome}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {s.relacao}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onFinalizar}
        disabled={!acusado}
        className="mt-6 w-full bg-destructive text-destructive-foreground font-bold py-4 rounded uppercase tracking-widest disabled:opacity-40 hover:brightness-110 shadow-lg"
      >
        {acusado ? "Confirmar Acusação e Encerrar Caso" : "Selecione um suspeito"}
      </button>
    </section>
  );
}

/* ============================ RESULTADO ============================ */
function ResultadoScreen({
  acertos,
  total,
  pctInvestigacao,
  tempo,
  nivel,
  acusado,
  ranking,
  onReiniciar,
}: {
  acertos: number;
  total: number;
  pctInvestigacao: number;
  tempo: number;
  nivel: string;
  acusado: SuspectId | null;
  ranking: RankingEntry[];
  onReiniciar: () => void;
}) {
  const acertouCulpado = acusado === CULPADO;
  const culpado = suspects.find((s) => s.id === CULPADO)!;
  return (
    <div className="min-h-screen">
      <div className="police-tape py-2 text-center text-xs">
        ⚠ CASO ENCERRADO · RELATÓRIO FINAL ⚠
      </div>
      <div className="max-w-3xl mx-auto p-6 sm:p-10 animate-fade-in">
        <h1 className="font-display text-3xl sm:text-5xl mb-2">Relatório Final</h1>
        <p className="text-muted-foreground mb-8">
          Análise completa do caso #007 · Lucas Andrade
        </p>

        <div
          className={`rounded-lg p-6 mb-6 border-2 ${
            acertouCulpado
              ? "border-success bg-success/10"
              : "border-destructive bg-destructive/10"
          }`}
        >
          <div className="font-display text-lg mb-1">
            {acertouCulpado ? "✅ Culpado identificado corretamente!" : "❌ Suspeito errado."}
          </div>
          <p className="text-sm text-foreground/90">
            O(a) verdadeiro(a) responsável era{" "}
            <span className="font-bold text-primary">{culpado.nome}</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Stat label="Acertos" value={`${acertos}/${total}`} />
          <Stat label="Investigação" value={`${pctInvestigacao}%`} />
          <Stat label="Tempo" value={formatTempo(tempo)} />
          <Stat label="Nível" value={nivel} small />
        </div>

        <article className="evidence-card rounded-lg p-6 mb-4">
          <h3 className="font-display text-primary mb-3">🔎 Como chegamos até aqui</h3>
          <ul className="space-y-2 text-sm text-foreground/90 list-disc pl-5">
            <li>
              O sangue encontrado (A+) coincide com o tipo sanguíneo de{" "}
              <b>Carla Oliveira</b>, sugerindo que ela se feriu durante a luta.
            </li>
            <li>
              O registro eletrônico do laboratório mostra o cartão de Carla acessando
              o local às 14h15 — contradizendo diretamente seu depoimento.
            </li>
            <li>
              A última mensagem da vítima revela que iria confrontá-la sobre o desvio
              de reagentes: <b>motivo</b> claro.
            </li>
            <li>
              A digital no frasco e a caligrafia do bilhete de ameaça reforçam a
              autoria.
            </li>
          </ul>
        </article>

        <article className="evidence-card rounded-lg p-6 mb-6">
          <h3 className="font-display text-primary mb-3">📚 Conceitos aplicados</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {[
              ["Tipagem sanguínea (ABO/Rh)", "Comparação entre sangue da cena e dos suspeitos."],
              ["Impressões digitais", "Identificação individual por padrões papilares."],
              ["DNA (simulado)", "Material biológico como prova de contato."],
              ["Cadeia de custódia", "Preservação e rastreio das provas."],
              ["Documentoscopia", "Análise grafotécnica do bilhete."],
              ["Perícia digital", "Recuperação de mensagens e leitura de logs."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-primary/60 pl-3">
                <div className="text-primary font-semibold">{t}</div>
                <div className="text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </article>

        {ranking.length > 0 && (
          <article className="evidence-card rounded-lg p-6 mb-6">
            <h3 className="font-display text-primary mb-3">🏆 Ranking</h3>
            <ol className="text-sm space-y-1">
              {ranking.map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-border/50 py-1"
                >
                  <span className="truncate">
                    {i + 1}. {r.nome} {r.culpadoCorreto ? "✅" : "❌"}
                  </span>
                  <span className="text-muted-foreground text-xs shrink-0 ml-2">
                    {r.acertos}/{r.total} · {formatTempo(r.tempo)} · {r.nivel}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        )}

        <button
          onClick={onReiniciar}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded uppercase tracking-widest hover:brightness-110"
        >
          🔄 Novo Caso
        </button>
      </div>
    </div>
  );
}

/* ============================ SHARED ============================ */
function SectionHeader({
  titulo,
  subtitulo,
  icone,
}: {
  titulo: string;
  subtitulo: string;
  icone: string;
}) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">{icone}</span>
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl text-primary truncate">
            {titulo}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{subtitulo}</p>
        </div>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-primary/60 to-transparent" />
    </header>
  );
}

function ConceitoBox({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-6 border-l-4 border-primary bg-secondary/40 rounded p-4 text-sm text-foreground/90">
      <div className="text-[10px] uppercase tracking-widest text-primary mb-1">
        Conceito Forense
      </div>
      {children}
    </aside>
  );
}

function Stat({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="evidence-card rounded p-3 text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div
        className={`font-display text-primary mt-1 ${small ? "text-sm" : "text-2xl"}`}
      >
        {value}
      </div>
    </div>
  );
}
