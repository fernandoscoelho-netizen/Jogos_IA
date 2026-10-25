# Verificação da versão 2 - variantes aleatórias

21 de outubro de 2026.

- Base JSON validada: 100 variantes, 18 grupos e 27 bandeiras PNG locais.
- Testes automáticos: 5 000 preparações de variantes, incluindo remapeamento das respostas depois de baralhar; 5 000 sessões nos cinco anos; cobertura das 100 variantes e exclusão da variante anterior de cada grupo.
- Foram rejeitadas seis bases com estrutura ou respostas inválidas. A cópia JavaScript foi comparada com o JSON e corresponde integralmente.
- No navegador: 27 imagens carregadas; percurso aleatório completo do 9.º ano (18 desafios, 600 pontos, 19 verificações com um erro) e do 5.º ano (12 desafios, 600 pontos, 12 verificações).
- Verificados: seleção estável ao reabrir missão; conservação de escolhas e de explicação já confirmada; caderno com as variantes da sessão; desbloqueio do pavilhão; revisão sem duplicar pontos; reinício com nova variante.
- Exportados e lidos o JSON completo e o ficheiro de referências da sessão. Importação de JSON válido confirmada; JSON inválido recusado mantendo a base anterior; importação bloqueada durante o jogo.
- Não foram registados erros de execução no navegador durante estes percursos.
- As 100 variantes foram exercitadas em testes do motor; não foram resolvidas todas individualmente na interface. Os ensaios na interface foram os dois percursos descritos.
- Mantêm-se os limites anteriores: abertura direta por file://, funcionamento com a rede desligada ao nível do sistema, dispositivos táteis físicos, leitores de ecrã e escuta humana do áudio não foram ensaiados. Os controlos de som não foram alterados nesta versão.

## Registo da versão inicial (histórico)

# Verificação da entrega

21 de outubro de 2026.

## Efetivamente testado

Teste funcional no navegador integrado, com o jogo servido localmente por HTTP. Não houve publicação na Internet.

- Ecrã inicial, carregamento de p5.js, desenho do mapa e apresentação dos dois logótipos.
- Escolha dos cinco anos. O 5.º/6.º ano apresenta dois desafios por missão; o 7.º/8.º/9.º apresenta três.
- Percurso completo do 9.º ano: 18 desafios concluídos, 6 selos e 600 pontos. Foram introduzidos dois erros; o resultado registou 20 verificações e duas revisões, sem retirada de pontos.
- Percurso completo do 5.º ano: 12 desafios concluídos, 6 selos e 600 pontos em 12 verificações.
- Associação das bandeiras e dos países, funções institucionais, ordenação com botões, decisões sobre direitos, seleção do orçamento e distinção entre facto, opinião e hipótese.
- Rejeição de uma solução errada nas bandeiras e de um orçamento incompleto. Correção posterior aceite. Ajuda explicativa após erro no puzzle cronológico, incluindo referências.
- Bloqueio inicial do pavilhão e desbloqueio após os outros cinco selos.
- Registo e consulta dos seis locais no caderno. Revisitar uma missão não duplicou pontos.
- Conclusão com aprendizagens, tentativas e pontuação. Reinício devolveu o total a zero e a escolha do ano.
- Uso das setas do teclado e Enter para investigar; Escape para fechar; botões de direção e Investigar acionados com o rato. Os controlos são elementos HTML nativos com rótulos.
- Seleção de ambiente discreto, melodia suave e todo o som desligado; ajuste para 35% no controlo de volume. As opções foram aplicadas e os indicadores atualizaram-se sem erros registados pelo navegador.
- Instruções e janela de fontes, com as onze ligações institucionais de conteúdo.
- Inspeção visual da página inicial e da conclusão, com capturas incluídas. Sintaxe dos três ficheiros JavaScript verificada com Node.js.

## Limites de verificação

- Não houve escuta humana do áudio: as opções e a execução das chamadas de Web Audio foram verificadas pela interface e pela ausência de erros, mas o resultado acústico não foi avaliado.
- Não foi feito ensaio num telemóvel ou tablet físico, nem com leitor de ecrã. O desenho adapta-se por CSS e tem botões táteis e alternativas ao mapa; a usabilidade nesses dispositivos exige confirmação prática.
- Não foram testados todos os navegadores. O percurso foi ensaiado no navegador integrado da aplicação, não em todas as combinações de sistema e navegador.
- A abertura direta por file:// foi bloqueada pela política do navegador de teste, que apenas permite HTTP/HTTPS. Não se contornou essa restrição. A execução foi testada por servidor local. A entrega usa scripts clássicos e recursos relativos, sem módulos, pedidos de dados remotos, compilação ou servidor obrigatório; a abertura por duplo clique é o modo previsto, mas esse percurso concreto ficou por testar neste ambiente.
- A ausência de Internet não foi simulada ao nível do sistema. Todos os recursos necessários estão incluídos, e as únicas ligações externas da interface são referências opcionais.
- As aprendizagens foram revistas face às fontes indicadas. Não houve validação por professor externo ou aplicação com alunos.

As capturas mostram uma versão real do jogo, não uma maquete. O ZIP contém o jogo e as instruções; não exige a instalação das ferramentas usadas no seu desenvolvimento.
