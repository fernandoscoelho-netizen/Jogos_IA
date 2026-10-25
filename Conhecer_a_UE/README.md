# O Clube Europeu foi conhecer a UE...

Jogo de exploração da União Europeia para o Clube Europeu do Agrupamento de Escolas de São Pedro da Cova. Interface em português europeu, azul suave, branco e dourado discreto. Inclui o logótipo fornecido pelo docente.

## Abrir localmente

Abra `dist/index.html` num navegador moderno. O mapa, o logótipo, os conteúdos e os desafios estão em ficheiros locais; as fontes Google são opcionais e têm alternativas do sistema. Não é necessário instalar bibliotecas.

Pode também servir `dist` por HTTP. Se tiver Python, na pasta do projeto execute:

```text
python -m http.server 8080 --directory dist
```

Abra `http://localhost:8080`.

## Publicar no GitHub Pages

1. Crie ou utilize um repositório para o portal educativo.
2. Para publicar este jogo como site principal, copie **o conteúdo de dist**, incluindo assets, para a raiz do repositório.
3. Em Settings > Pages, selecione Deploy from a branch, a branch main e /(root).
4. Para o integrar num dashboard, coloque o conteúdo de dist em `projetos/clube-europeu/` e crie um cartão que aponte para `./projetos/clube-europeu/`.

Todos os caminhos da aplicação são relativos. Não necessita de backend. O sítio tem de ser acessível aos alunos; um repositório privado não torna automaticamente privado um site GitHub Pages.

## O que inclui

- Nove cidades: Bruxelas, Estrasburgo, Luxemburgo, Francoforte, Haia, Paris, Roma, Maastricht e Lisboa.
- Mapa geográfico local com seleção de cidades, nomes opcionais e ampliação.
- Sete instituições da UE: funções, localização, composição e exemplos.
- Europol identificada separadamente como agência.
- Catorze acontecimentos na linha do tempo, com filtros por período.
- Uma pergunta por cidade para conquistar o respetivo carimbo.
- Desafios de geografia (5 pistas), associação de instituições (7), ordenação cronológica (5) e questionário (15 perguntas).
- Feedback explicativo, melhores resultados e passaporte imprimível.
- Relatório TXT, guia de jogo, indicações para docentes e fontes oficiais na interface.

## Regras e progresso

Cada novo carimbo vale 100 pontos. Cada desafio concluído vale 150 pontos, uma única vez. Não há cronómetro nem vidas. Os desafios de mapa e questionário permitem concluir com 4/5 e 12/15, respetivamente. As associações e a cronologia requerem todas as respostas certas, com tentativas adicionais permitidas.

As melhores pontuações são guardadas. O botão Recomeçar a viagem elimina os dados locais após confirmação. O progresso é armazenado em localStorage, por navegador e origem. Não existem contas de alunos, sincronização nem painel de turma. O relatório não importa ou restaura dados. O passaporte é pedagógico e não um documento de viagem.

## Utilização em aula

Proposta ajustável ao 3.º ciclo e ensino secundário: 5 min de contextualização, 20 min de exploração em pares, 15 min de desafios e 10 min de discussão e exportação do relatório. Podem distribuir-se cidades por grupos, em vez de exigir a exploração completa numa aula.

Questões para discussão: Quem representa cidadãos e governos? Por que razão Conselho Europeu e Conselho da UE têm funções diferentes? Qual é a diferença entre assinar um tratado e a sua entrada em vigor? Que impacto têm estas instituições na vida quotidiana?

## Adaptar

- `dist/data.js`: cidades, instituições, perguntas, cronologia e fontes.
- `dist/app.js`: navegação, mapa, pontuação, desafios, passaporte e ilustrações SVG simbólicas.
- `dist/style.css`: apresentação, responsividade e impressão.
- `dist/map-data.js`: geometrias locais derivadas de GISCO 2024.
- `dist/assets/logo-agrupamento.png`: logótipo fornecido.

Ao alterar perguntas, atualize também as respostas corretas e explicações. Os índices das respostas começam em zero. As referências devem permanecer ligadas a fontes oficiais.

## Fontes e créditos

Conteúdos consultados em 22 de outubro de 2026, em fontes da União Europeia, Parlamento Europeu, Conselho e Banco Central Europeu. As ligações estão em Fontes e créditos e junto dos conteúdos. A informação é educativa e simplificada; não apresenta titulares de cargos que possam tornar rapidamente o conteúdo desatualizado.

Logótipo: Agrupamento de Escolas de São Pedro da Cova, fornecido pelo docente. Ilustrações originais simbólicas em SVG, sem pretensão de representação arquitetónica rigorosa. Este recurso não é um sítio oficial da UE.

Cartografia: Eurostat / GISCO, países 2024, escala de origem 1:20 milhões. © EuroGeographics pelos limites administrativos. Projeção azimutal equivalente centrada na Europa; cidades aproximadas e territórios ultramarinos omitidos. Os dados GISCO são utilizados para fins educativos **não comerciais**, nos termos da licença: https://ec.europa.eu/eurostat/web/gisco/geodata/administrative-units . Para uso comercial, é necessária a licença adequada.
