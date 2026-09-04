# O Mistério da Galeria de Arte

Novo caso substituindo o da escola, com 6 suspeitos (3 mulheres, 3 homens), faca como arma, pegada feminina, tipagem sanguínea e relatório de depoimentos. Feito nas duas versões: a que roda aqui no preview e a pasta simples que o professor abre no VS Code.

## Telas do app

1. **Abertura** — briefing do caso: proprietário da galeria encontrado morto nos fundos durante o coquetel VIP, 6 pessoas retidas, faca de caça na cena.
2. **Roteiro do perito** — passo a passo do que a equipe faz na sala física: paramentação, bancada de tipagem, medição da pegada, consulta dos códigos, quiz, veredito.
3. **Consulta de suspeito por código** — teclado numérico onde a equipe digita o código da placa (101, 102, 103, 201, 202, 203). A ficha mostra nome, gênero, altura, número do sapato, tipo sanguíneo e cor do cabelo. Códigos inválidos dão erro. Uma lista de códigos já consultados fica visível para conferência (sem revelar dados de quem ainda não foi consultado).
4. **Relatório de depoimentos** — transcrição de cada um dos 6 depoimentos, liberada por suspeito depois que o código dele foi consultado. Marcações de contradição aparecem só após o quiz ser concluído.
5. **Laboratório de evidências** — faca, pegada em sangue, fio de cabelo, cartões de digitais, tipagem da bancada (vítima O-, sangue da lâmina AB+), celular da vítima. Cada evidência traz o conceito forense por trás.
6. **Quiz de perícia** — 12 perguntas de criminalística com feedback imediato. Concluir o quiz desbloqueia o laudo completo das digitais da faca e o histórico do celular da vítima.
7. **Tabela de estatura** — referência de altura estimada pelo número do calçado, para a equipe conferir a pegada com as fichas.
8. **Acusação** — a equipe digita o código do suspeito final e marca quais provas sustentam a autoria.
9. **Resultado** — acerto ou erro, provas corretas selecionadas, acertos do quiz, tempo total, nível de perito e ranking local salvo no navegador.

## Dados do caso

- Vítima: proprietário da galeria, sangue O-.
- Sangue na lâmina: AB+ (do agressor, ferido na luta).
- Pegada: calçado feminino nº 38, estatura estimada ~1,70m.
- Digital na faca: compatível com a suspeita de código 102.
- Culpada: **Suspeita B, código 102** — nº 38, 1,70m, cabelo loiro, AB+.
- Demais fichas conforme a lista enviada (101, 103, 201, 202, 203).
- Fio de cabelo loiro na lâmina reforça a autoria.
- Contradições: um homem afirma ter lutado com a vítima (mas a pegada é feminina); a 102 afirma não ter chegado perto da faca, mas o sangue da lâmina é do tipo dela.

## Visual

Mantém o clima escuro de perícia já existente, adaptado à galeria: tons de carvão, dourado de moldura e vermelho de alerta, fita zebrada, fichas com aparência de dossiê. Botões grandes, pensados para uso em tablet com luvas.

## Detalhes técnicos

- `src/lib/game-data.ts` reescrito com suspeitos, depoimentos, evidências, quiz, tabela estatura/calçado e gabarito de provas.
- `src/routes/index.tsx` reescrito com as 9 telas, estado de códigos consultados, desbloqueio pós-quiz, temporizador, progresso e ranking em localStorage; head() com título e descrição do novo caso.
- `standalone/index.html`, `standalone/styles.css`, `standalone/game.js` atualizados com o mesmo caso e as mesmas telas, em HTML/CSS/JS puro, sem dependências.
- Fluxo completo validado no navegador antes de entregar.
