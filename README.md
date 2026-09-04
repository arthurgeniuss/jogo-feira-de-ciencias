# Evidência Criminal

Crie um jogo web completo para uma Feira de Ciências chamado "Projeto Evidência: Descubra o Culpado".

Objetivo:

O jogador assume o papel de um perito forense e deve investigar o assassinato fictício de um aluno dentro da escola. O jogo deve ser educativo, interativo, imersivo e utilizar conceitos de Biologia Forense, Perícia Criminal e raciocínio lógico.

Público-alvo:

Alunos, professores e visitantes da feira.

Tecnologias:

HTML, CSS e JavaScript puro. Não utilizar banco de dados ou servidores. Tudo deve funcionar localmente em um navegador e em tablets Android.

Tema Visual:

Interface inspirada em sistemas de investigação criminal, com aparência moderna, profissional e intuitiva. Utilizar cores escuras, pastas de evidências, avisos policiais e elementos visuais de perícia.

História:

Um aluno chamado Lucas Andrade foi encontrado morto no laboratório da escola após o término das aulas.

A polícia encontrou diversas evidências no local.

Existem 4 suspeitos:

1. Ana Ferreira

- Colega da vítima

- Tinha uma discussão recente com Lucas

2. Pedro Santos

- Amigo próximo

- Possuía acesso ao laboratório

3. Carla Oliveira

- Monitora do laboratório

- Foi a última pessoa a ver a vítima

4. Rafael Costa

- Ex-aluno

- Foi visto próximo ao local

O jogador deve analisar todos os dados e descobrir quem é o culpado.

Estrutura do Sistema:

Tela 1 - Introdução

- Logo do projeto

- Breve explicação do caso

- Botão "Iniciar Investigação"

Tela 2 - Painel de Investigação

Menu lateral contendo:

• Suspeitos

• Evidências

• Depoimentos

• Linha do Tempo

• Quiz

• Acusar Suspeito

Tela 3 - Suspeitos

Cada suspeito possui:

- Foto ilustrativa

- Nome

- Idade

- Relação com a vítima

- Motivo

- Álibi

- Tipo sanguíneo

Tela 4 - Evidências

Exibir diversas evidências que possam ser analisadas.

Evidência 01

Fotografia da cena do crime.

Evidência 02

Mancha de sangue A+ encontrada na mesa.

Evidência 03

Impressão digital encontrada em um frasco.

Evidência 04

Bilhete rasgado contendo ameaça.

Evidência 05

Registro de acesso ao laboratório.

Evidência 06

Mensagens recuperadas do celular da vítima.

Cada evidência deve possuir descrição detalhada.

Tela 5 - Depoimentos

Cada suspeito fornece um depoimento.

Inserir contradições sutis para que o jogador identifique mentiras.

Exemplo:

Um suspeito afirma não ter estado no laboratório.

Outra evidência comprova que ele entrou no local.

Tela 6 - Linha do Tempo

Exibir cronologicamente:

14:00

Vítima entra no laboratório.

14:10

Suspeito A é visto no corredor.

14:15

Suspeito B acessa o laboratório.

14:20

Discussão registrada.

14:30

Momento estimado do crime.

15:00

Corpo encontrado.

Tela 7 - Quiz Investigativo

Gerar entre 10 e 15 perguntas.

Perguntas de múltipla escolha.

Exemplos:

- Quem foi a última pessoa a ver a vítima?

- Qual era o tipo sanguíneo encontrado?

- Qual suspeito apresentou contradições?

- Qual evidência o conecta à cena?

- Quem possuía oportunidade para cometer o crime?

O sistema deve calcular os acertos.

Tela 8 - Acusação

O jogador escolhe o culpado.

Opções:

- Ana

- Pedro

- Carla

- Rafael

Tela 9 - Resultado

Exibir:

- Quantidade de acertos

- Percentual de investigação

- Tempo gasto

- Nível de investigador

Classificações:

0 a 40%

Investigador Iniciante

41 a 70%

Investigador Experiente

71 a 90%

Perito Forense

91 a 100%

Especialista Criminal

Após isso revelar:

- Quem era realmente o culpado

- Quais evidências levaram à conclusão

- Quais pistas poderiam ter sido percebidas

Recursos Extras:

- Temporizador da investigação

- Efeitos visuais suaves

- Animações entre telas

- Sistema de progresso

- Design responsivo para tablets

- Ícones para evidências

- Sons opcionais de investigação

- Ranking local simples (sem banco de dados)

Objetivo Educacional:

Durante o jogo ensinar conceitos de:

- Tipagem sanguínea

- Impressões digitais

- DNA (simulado)

- Vestígios biológicos

- Cadeia de custódia

- Investigação criminal

- Raciocínio lógico

O código deve ser organizado, comentado e pronto para uso em uma Feira de Ciências.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f9f4084-d717-422d-9a98-40a037101e2f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
