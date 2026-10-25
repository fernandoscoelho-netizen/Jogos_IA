# O Clube Europeu foi conhecer a UE…

Jogo de viagem pela União Europeia, do Porto a Roma, para alunos do 2.º ciclo ao ensino secundário.

## Abrir

Abre `index.html` num navegador recente (Chrome, Edge, Firefox ou Safari). Não é preciso instalar nada nem ter servidor. Com ligação à internet, o jogo usa as fontes Manrope e DM Sans; sem ligação, usa as fontes do sistema.

O guia completo, com capturas de ecrã, proposta de aulas e sugestões de avaliação, está em `Guia-Clube-Europeu.pdf`.

## Publicar para os alunos

- **Servidor da escola ou Moodle:** carregar o `index.html`.
- **GitHub Pages:** colocar o `index.html` na raiz do repositório e ativar Pages em Settings → Pages (branch `main`, pasta `/root`).

## Progresso e entrega

O progresso fica guardado no navegador de cada aluno. Para entregar o trabalho ou mudar de computador, o aluno copia o **código de progresso** no passaporte. O professor cola esse código em **Para docentes → Ver um código** e vê o relatório com os diários de bordo.

## Adaptar

Os ficheiros separados estão em `codigo-fonte/`:

| Ficheiro | Conteúdo |
|---|---|
| `content.js` | Cidades, guias, instituições, perguntas, desafios, expressões e ligações |
| `app.js` | Lógica do jogo: mapa, viagem, etapas, passaporte, relatório e certificado |
| `app.html` | Estrutura da página e estilos |
| `scenes.js` | Ilustrações das cidades e carimbos |
| `mapdata.js` | Mapa da Europa já projetado (Natural Earth, domínio público) |
| `assets/logo-agrupamento.png` | Logótipo do agrupamento |

Depois de editar, corre `python build.py` dentro de `codigo-fonte/` para gerar de novo o `index.html`. Nas perguntas, o índice da resposta certa (`c`) começa em zero.

Para voltar a gerar o mapa: `npm install` e `node build-map.mjs` dentro de `codigo-fonte/`.

## Créditos

Conteúdos verificados em outubro de 2026 em fontes oficiais da UE. Cartografia: Natural Earth (domínio público). Melodia do hino: Ludwig van Beethoven (domínio público). Logótipo: Agrupamento de Escolas de São Pedro da Cova. Recurso educativo independente; não é um sítio oficial da União Europeia.
