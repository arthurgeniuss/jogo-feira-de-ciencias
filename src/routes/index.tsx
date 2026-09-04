import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  CULPADO_CODIGO,
  depoimentos,
  evidencias,
  passosDoJogo,
  provasAcusacao,
  quiz,
  suspects,
  tabelaEstatura,
  type Evidence,
} from "@/lib/game-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Mistério da Galeria de Arte | Projeto Evidência" },
      {
        name: "description",
        content:
          "Jogo investigativo de perícia criminal para feira de ciências: analise digitais, tipagem sanguínea e pegadas para descobrir quem matou o dono da galeria.",
      },
      { property: "og:title", content: "O Mistério da Galeria de Arte | Projeto Evidência" },
      {
        property: "og:description",
        content:
          "Assuma o papel de perito forense, consulte as fichas dos 6 suspeitos pelos códigos e aponte a autoria do crime.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Jogo,
});

type Tela =
  | "intro"
  | "roteiro"
  | "fichas"
  | "depoimentos"
  | "evidencias"
  | "quiz"
  | "estatura"
  | "acusacao"
  | "resultado";

interface RankingEntry {
  equipe: string;
  acertou: boolean;
  quizAcertos: number;
  provas: number;
  tempo: number;
  nivel: string;
}

const RANKING_KEY = "galeria-ranking-v1";

function formatarTempo(segundos: number) {
  const m = Math.floor(segundos / 60)
    .toString()
    .padStart(2, "0");
  const s = (segundos % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function Jogo() {
  const [tela, setTela] = useState<Tela>("intro");
  const [equipe, setEquipe] = useState("");
  const [inicio, setInicio] = useState<number | null>(null);
  const [tempo, setTempo] = useState(0);
  const [tempoFinal, setTempoFinal] = useState(0);

  const [codigo, setCodigo] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");
  const [consultados, setConsultados] = useState<string[]>([]);
  const [fichaAberta, setFichaAberta] = useState<string | null>(null);

  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [quizConcluido, setQuizConcluido] = useState(false);

  const [evidenciaAberta, setEvidenciaAberta] = useState<Evidence | null>(null);

  const [codigoAcusado, setCodigoAcusado] = useState("");
  const [provasMarcadas, setProvasMarcadas] = useState<string[]>([]);
  const [erroAcusacao, setErroAcusacao] = useState("");
  const [acertou, setAcertou] = useState(false);

  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RANKING_KEY);
      if (raw) setRanking(JSON.parse(raw) as RankingEntry[]);
    } catch {
      /* ranking indisponível */
    }
  }, []);

  useEffect(() => {
    if (inicio === null || tela === "resultado") return;
    const id = window.setInterval(() => {
      setTempo(Math.floor((Date.now() - inicio) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [inicio, tela]);

  const quizAcertos = useMemo(
    () => quiz.reduce((total, q, i) => (respostas[i] === q.correta ? total + 1 : total), 0),
    [respostas],
  );

  const provasCorretas = useMemo(
    () =>
      provasAcusacao.filter((p) => p.correta && provasMarcadas.includes(p.id)).length -
      provasAcusacao.filter((p) => !p.correta && provasMarcadas.includes(p.id)).length,
    [provasMarcadas],
  );

  const progresso = useMemo(() => {
    const fichas = (consultados.length / suspects.length) * 40;
    const q = (Object.keys(respostas).length / quiz.length) * 40;
    const fim = tela === "resultado" ? 20 : 0;
    return Math.min(100, Math.round(fichas + q + fim));
  }, [consultados.length, respostas, tela]);

  function iniciar() {
    setInicio(Date.now());
    setTela("roteiro");
  }

  function consultarCodigo() {
    const encontrado = suspects.find((s) => s.codigo === codigo.trim());
    if (!encontrado) {
      setErroCodigo("Código não consta no cadastro de retidos. Confira a placa.");
      setFichaAberta(null);
      return;
    }
    setErroCodigo("");
    setFichaAberta(encontrado.codigo);
    setConsultados((atual) =>
      atual.includes(encontrado.codigo) ? atual : [...atual, encontrado.codigo],
    );
    setCodigo("");
  }

  function responder(indice: number, opcao: number) {
    if (respostas[indice] !== undefined) return;
    setRespostas((atual) => ({ ...atual, [indice]: opcao }));
  }

  function finalizarQuiz() {
    setQuizConcluido(true);
  }

  function enviarAcusacao() {
    const alvo = suspects.find((s) => s.codigo === codigoAcusado.trim());
    if (!alvo) {
      setErroAcusacao("Digite um código válido de suspeito (101 a 203).");
      return;
    }
    if (provasMarcadas.length === 0) {
      setErroAcusacao("Marque ao menos uma prova que sustente a acusação.");
      return;
    }
    setErroAcusacao("");
    const certo = alvo.codigo === CULPADO_CODIGO;
    setAcertou(certo);
    const t = inicio ? Math.floor((Date.now() - inicio) / 1000) : 0;
    setTempoFinal(t);

    const nivel = definirNivel(certo, quizAcertos, provasCorretas);
    const entrada: RankingEntry = {
      equipe: equipe.trim() || "Equipe sem nome",
      acertou: certo,
      quizAcertos,
      provas: Math.max(0, provasCorretas),
      tempo: t,
      nivel,
    };
    const novo = [...ranking, entrada]
      .sort((a, b) => Number(b.acertou) - Number(a.acertou) || b.quizAcertos - a.quizAcertos || a.tempo - b.tempo)
      .slice(0, 10);
    setRanking(novo);
    try {
      localStorage.setItem(RANKING_KEY, JSON.stringify(novo));
    } catch {
      /* sem persistência */
    }
    setTela("resultado");
  }

  function reiniciar() {
    setTela("intro");
    setInicio(null);
    setTempo(0);
    setConsultados([]);
    setFichaAberta(null);
    setCodigo("");
    setRespostas({});
    setQuizConcluido(false);
    setCodigoAcusado("");
    setProvasMarcadas([]);
    setAcertou(false);
  }

  if (tela === "intro") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="police-tape py-2 text-center text-xs sm:text-sm">
          ÁREA ISOLADA — PERÍCIA CRIMINAL EM ANDAMENTO
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-12">
          <p className="font-display text-sm tracking-widest text-primary">PROJETO EVIDÊNCIA</p>
          <h1 className="text-4xl leading-tight sm:text-5xl">O Mistério da Galeria de Arte</h1>
          <div className="evidence-card rounded-lg p-6 leading-relaxed">
            <p>
              Durante o coquetel VIP de inauguração de uma exposição no centro da cidade, o
              proprietário da galeria foi encontrado morto nos fundos do estabelecimento. A arma
              usada foi uma faca de caça deixada na cena.
            </p>
            <p className="mt-4">
              A polícia isolou o perímetro com <strong>6 pessoas retidas</strong> — 3 mulheres e 3
              homens, entre convidados e funcionários. Sua equipe de perícia foi chamada para
              coletar as provas na sala, analisar os dados neste aplicativo e apontar a autoria.
            </p>
          </div>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Nome da equipe de perícia</span>
            <input
              value={equipe}
              onChange={(e) => setEquipe(e.target.value)}
              placeholder="Ex.: Equipe Alfa"
              className="rounded-md border border-border bg-input px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            onClick={iniciar}
            className="rounded-md bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition hover:opacity-90"
          >
            Iniciar investigação
          </button>
        </div>
      </main>
    );
  }

  const menu: { id: Tela; rotulo: string; icone: string }[] = [
    { id: "roteiro", rotulo: "Roteiro do perito", icone: "🧭" },
    { id: "fichas", rotulo: "Fichas por código", icone: "🪪" },
    { id: "depoimentos", rotulo: "Depoimentos", icone: "🗣️" },
    { id: "evidencias", rotulo: "Laboratório", icone: "🔬" },
    { id: "estatura", rotulo: "Tabela de estatura", icone: "📏" },
    { id: "quiz", rotulo: "Quiz de perícia", icone: "🧠" },
    { id: "acusacao", rotulo: "Acusação", icone: "⚖️" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="police-tape py-1.5 text-center text-[10px] sm:text-xs">
        ÁREA ISOLADA — PERÍCIA CRIMINAL EM ANDAMENTO
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="evidence-card rounded-lg p-4">
            <p className="font-display text-xs tracking-widest text-primary">CASO GALERIA</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {equipe.trim() || "Equipe sem nome"}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tempo</span>
              <span className="font-display text-lg text-evidence">{formatarTempo(tempo)}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progresso</span>
                <span>{progresso}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary transition-all" style={{ width: `${progresso}%` }} />
              </div>
            </div>
          </div>

          <nav className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setTela(item.id)}
                className={`flex items-center gap-2 rounded-md border px-3 py-3 text-left text-sm transition ${
                  tela === item.id
                    ? "border-primary bg-secondary text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span aria-hidden>{item.icone}</span>
                {item.rotulo}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1">
          {tela === "roteiro" && (
            <Bloco titulo="Roteiro do perito" subtitulo="Siga a ordem dos procedimentos na sala.">
              <ol className="grid gap-3 sm:grid-cols-2">
                {passosDoJogo.map((p, i) => (
                  <li key={p.titulo} className="evidence-card rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" aria-hidden>
                        {p.icone}
                      </span>
                      <span className="font-display text-sm text-primary">PASSO {i + 1}</span>
                    </div>
                    <h3 className="mt-2 text-lg">{p.titulo}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.texto}</p>
                  </li>
                ))}
              </ol>
            </Bloco>
          )}

          {tela === "fichas" && (
            <Bloco
              titulo="Fichas por código"
              subtitulo="Digite o código da placa que o suspeito está segurando na sala."
            >
              <div className="evidence-card rounded-lg p-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={codigo}
                    inputMode="numeric"
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    onKeyDown={(e) => e.key === "Enter" && consultarCodigo()}
                    placeholder="000"
                    className="w-full rounded-md border border-border bg-input px-4 py-3 text-center font-display text-2xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring sm:w-48"
                  />
                  <button
                    onClick={consultarCodigo}
                    className="rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground"
                  >
                    Consultar ficha
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2 sm:max-w-xs">
                  {["1", "2", "3", "0", "⌫"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setCodigo((c) => (t === "⌫" ? c.slice(0, -1) : (c + t).slice(0, 3)))
                      }
                      className="rounded-md border border-border bg-secondary py-3 text-lg"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {erroCodigo && <p className="mt-3 text-sm text-destructive">{erroCodigo}</p>}
                <p className="mt-3 text-xs text-muted-foreground">
                  Fichas consultadas: {consultados.length}/{suspects.length}
                  {consultados.length > 0 && ` — ${consultados.join(", ")}`}
                </p>
              </div>

              {fichaAberta &&
                (() => {
                  const s = suspects.find((x) => x.codigo === fichaAberta)!;
                  return (
                    <article className="evidence-card mt-4 rounded-lg p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-full font-display text-xl text-background"
                          style={{ background: s.cor }}
                        >
                          {s.iniciais}
                        </div>
                        <div>
                          <p className="font-display text-xs tracking-widest text-primary">
                            CÓDIGO {s.codigo}
                          </p>
                          <h3 className="text-2xl">{s.nome}</h3>
                          <p className="text-sm text-muted-foreground">{s.papel}</p>
                        </div>
                      </div>
                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Dado rotulo="Gênero" valor={s.genero} />
                        <Dado rotulo="Altura" valor={s.altura} />
                        <Dado rotulo="Número do calçado" valor={String(s.calcado)} />
                        <Dado rotulo="Tipo sanguíneo" valor={s.tipoSanguineo} />
                        <Dado rotulo="Cabelo" valor={s.cabelo} />
                      </dl>
                    </article>
                  );
                })()}
            </Bloco>
          )}

          {tela === "depoimentos" && (
            <Bloco
              titulo="Relatório de depoimentos"
              subtitulo="Cada depoimento é liberado depois que a ficha do suspeito é consultada."
            >
              <div className="grid gap-3">
                {depoimentos.map((d) => {
                  const s = suspects.find((x) => x.codigo === d.codigo)!;
                  const liberado = consultados.includes(d.codigo);
                  return (
                    <article key={d.codigo} className="evidence-card rounded-lg p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg">
                          {liberado ? s.nome : "Depoimento reservado"}{" "}
                          <span className="font-display text-sm text-primary">#{d.codigo}</span>
                        </h3>
                      </div>
                      {liberado ? (
                        <>
                          <p className="mt-2 border-l-2 border-primary pl-3 text-sm italic text-muted-foreground">
                            "{d.texto}"
                          </p>
                          {d.contradicao &&
                            (quizConcluido ? (
                              <p className="mt-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm">
                                <strong className="text-destructive">Contradição: </strong>
                                {d.contradicao}
                              </p>
                            ) : (
                              <p className="mt-3 text-xs text-warning">
                                🔒 Há uma análise de contradição neste depoimento — conclua o quiz
                                para liberar.
                              </p>
                            ))}
                        </>
                      ) : (
                        <p className="mt-2 text-sm text-muted-foreground">
                          🔒 Consulte o código {d.codigo} na tela de fichas para liberar.
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </Bloco>
          )}

          {tela === "evidencias" && (
            <Bloco
              titulo="Laboratório de evidências"
              subtitulo="Toque em uma evidência para ver o laudo e o conceito forense."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {evidencias.map((ev) => {
                  const travada = ev.bloqueada && !quizConcluido;
                  return (
                    <button
                      key={ev.id}
                      onClick={() => !travada && setEvidenciaAberta(ev)}
                      className={`evidence-card rounded-lg p-4 text-left transition ${
                        travada ? "opacity-60" : "hover:border-primary"
                      }`}
                    >
                      <span className="text-3xl" aria-hidden>
                        {travada ? "🔒" : ev.icone}
                      </span>
                      <h3 className="mt-2 text-lg">{ev.titulo}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {travada ? "Liberado após o quiz de perícia." : ev.resumo}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Bloco>
          )}

          {tela === "estatura" && (
            <Bloco
              titulo="Tabela de estatura por calçado"
              subtitulo="O comprimento do pé equivale a cerca de 15% da altura da pessoa."
            >
              <div className="evidence-card overflow-hidden rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3">Número do calçado</th>
                      <th className="px-4 py-3">Estatura estimada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelaEstatura.map((l) => (
                      <tr
                        key={l.calcado}
                        className={`border-t border-border ${l.calcado === 38 ? "bg-primary/10" : ""}`}
                      >
                        <td className="px-4 py-3">{l.calcado}</td>
                        <td className="px-4 py-3">{l.estatura}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                A pegada em sangue medida na cena corresponde ao número 38 em modelo feminino.
              </p>
            </Bloco>
          )}

          {tela === "quiz" && (
            <Bloco
              titulo="Quiz de perícia"
              subtitulo={`Acertos: ${quizAcertos}/${quiz.length} — concluir libera o laudo das digitais e o celular da vítima.`}
            >
              <div className="grid gap-4">
                {quiz.map((q, i) => {
                  const resposta = respostas[i];
                  return (
                    <article key={q.pergunta} className="evidence-card rounded-lg p-5">
                      <p className="font-display text-xs tracking-widest text-primary">
                        QUESTÃO {i + 1}
                      </p>
                      <h3 className="mt-1 text-lg">{q.pergunta}</h3>
                      <div className="mt-3 grid gap-2">
                        {q.opcoes.map((o, oi) => {
                          const escolhida = resposta === oi;
                          const certa = q.correta === oi;
                          const revelar = resposta !== undefined;
                          return (
                            <button
                              key={o}
                              onClick={() => responder(i, oi)}
                              className={`rounded-md border px-4 py-3 text-left text-sm transition ${
                                revelar && certa
                                  ? "border-success bg-success/15"
                                  : escolhida
                                    ? "border-destructive bg-destructive/15"
                                    : "border-border bg-card hover:border-primary"
                              }`}
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                      {resposta !== undefined && (
                        <p className="mt-3 text-sm text-muted-foreground">{q.explicacao}</p>
                      )}
                    </article>
                  );
                })}
              </div>
              <button
                onClick={finalizarQuiz}
                disabled={Object.keys(respostas).length < quiz.length || quizConcluido}
                className="mt-4 w-full rounded-md bg-primary px-6 py-4 text-lg font-bold text-primary-foreground disabled:opacity-40"
              >
                {quizConcluido
                  ? "Laudos liberados ✔"
                  : `Concluir quiz (${Object.keys(respostas).length}/${quiz.length})`}
              </button>
            </Bloco>
          )}

          {tela === "acusacao" && (
            <Bloco
              titulo="Tela de acusação"
              subtitulo="Informe o código do suspeito e marque as provas que comprovam a autoria."
            >
              <div className="evidence-card rounded-lg p-5">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-muted-foreground">Código do acusado</span>
                  <input
                    value={codigoAcusado}
                    inputMode="numeric"
                    onChange={(e) =>
                      setCodigoAcusado(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="000"
                    className="w-full rounded-md border border-border bg-input px-4 py-3 text-center font-display text-2xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring sm:w-48"
                  />
                </label>

                <p className="mt-5 text-sm text-muted-foreground">Provas que sustentam a acusação</p>
                <div className="mt-2 grid gap-2">
                  {provasAcusacao.map((p) => {
                    const marcada = provasMarcadas.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() =>
                          setProvasMarcadas((atual) =>
                            marcada ? atual.filter((x) => x !== p.id) : [...atual, p.id],
                          )
                        }
                        className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
                          marcada ? "border-primary bg-secondary" : "border-border bg-card"
                        }`}
                      >
                        <span aria-hidden>{marcada ? "☑" : "☐"}</span>
                        {p.rotulo}
                      </button>
                    );
                  })}
                </div>

                {erroAcusacao && <p className="mt-3 text-sm text-destructive">{erroAcusacao}</p>}

                <button
                  onClick={enviarAcusacao}
                  className="mt-4 w-full rounded-md bg-accent px-6 py-4 text-lg font-bold text-accent-foreground"
                >
                  Enviar veredito
                </button>
              </div>
            </Bloco>
          )}

          {tela === "resultado" && (
            <Bloco titulo="Laudo final" subtitulo="Resultado da investigação da sua equipe.">
              <div
                className={`evidence-card rounded-lg border-2 p-6 ${
                  acertou ? "border-success" : "border-destructive"
                }`}
              >
                <h3 className="text-2xl">
                  {acertou ? "Caso solucionado! 🎉" : "Acusação incorreta"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A autora do crime é <strong className="text-foreground">Vitória Sampaio</strong>{" "}
                  (código 102): calçado nº 38 e 1,70 m compatíveis com a pegada, sangue AB+ igual ao
                  da lâmina, digital no cabo da faca e fio de cabelo loiro na arma.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <Metrica rotulo="Quiz" valor={`${quizAcertos}/${quiz.length}`} />
                  <Metrica
                    rotulo="Aproveitamento"
                    valor={`${Math.round((quizAcertos / quiz.length) * 100)}%`}
                  />
                  <Metrica rotulo="Tempo" valor={formatarTempo(tempoFinal)} />
                  <Metrica
                    rotulo="Nível"
                    valor={definirNivel(acertou, quizAcertos, provasCorretas)}
                  />
                </div>
              </div>

              <div className="evidence-card mt-4 rounded-lg p-5">
                <h3 className="text-lg">Ranking local</h3>
                <ol className="mt-3 grid gap-2 text-sm">
                  {ranking.map((r, i) => (
                    <li
                      key={`${r.equipe}-${i}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-secondary px-3 py-2"
                    >
                      <span>
                        {i + 1}. {r.equipe} {r.acertou ? "✔" : "✘"}
                      </span>
                      <span className="text-muted-foreground">
                        {r.quizAcertos}/{quiz.length} · {formatarTempo(r.tempo)} · {r.nivel}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={reiniciar}
                className="mt-4 w-full rounded-md bg-primary px-6 py-4 text-lg font-bold text-primary-foreground"
              >
                Nova investigação
              </button>
            </Bloco>
          )}
        </section>
      </div>

      {evidenciaAberta && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setEvidenciaAberta(null)}
        >
          <div
            className="evidence-card max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  {evidenciaAberta.icone}
                </span>
                <h3 className="text-xl">{evidenciaAberta.titulo}</h3>
              </div>
              <button
                onClick={() => setEvidenciaAberta(null)}
                aria-label="Fechar"
                className="rounded-md border border-border px-3 py-1"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{evidenciaAberta.descricao}</p>
            <div className="mt-4 rounded-md border border-evidence/40 bg-evidence/10 p-3">
              <p className="font-display text-xs tracking-widest text-evidence">CONCEITO FORENSE</p>
              <p className="mt-1 text-sm">{evidenciaAberta.conceito}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function definirNivel(acertou: boolean, quizAcertos: number, provas: number) {
  if (!acertou) return "Estagiário";
  const pontos = quizAcertos + Math.max(0, provas);
  if (pontos >= 15) return "Perito-chefe";
  if (pontos >= 11) return "Perito Criminal";
  return "Assistente de perícia";
}

function Bloco({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl">{titulo}</h2>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">{subtitulo}</p>
      {children}
    </div>
  );
}

function Dado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-md bg-secondary px-3 py-2">
      <dt className="text-xs text-muted-foreground">{rotulo}</dt>
      <dd className="text-base">{valor}</dd>
    </div>
  );
}

function Metrica({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-md bg-secondary px-3 py-3 text-center">
      <p className="text-xs text-muted-foreground">{rotulo}</p>
      <p className="font-display text-lg">{valor}</p>
    </div>
  );
}
