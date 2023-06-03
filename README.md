# API- Projeto Integrador 4º Semestre ADS - Grupo Fatech
Projeto desenvolvido por alunos do quarto semestre do curso de análise e desenvolvimento de sistemas da Fatec - SJC, durante o primeiro semestre do ano de 2023.

## 🎯 Objetivo
<div style="text-align: justify">
O projeto visa criar uma aplicação web (single-page application) de criação de tickets e usuários é uma aplicação web moderna e responsiva que permite aos usuários criar e gerenciar tickets de duas categorias distintas: "hotfix" e "feature". Os tickets "hotfix" são usados para problemas críticos que precisam ser resolvidos imediatamente, enquanto os tickets "feature" são usados para solicitações de novas funcionalidades ou melhorias no sistema.

Além disso, a aplicação permite aos usuários gerenciar usuários e suas permissões de acesso. Os usuários são organizados em hierarquias de acesso, com diferentes níveis de privilégio. Por exemplo, um administrador pode criar e gerenciar usuários, enquanto um usuário comum pode apenas visualizar e atualizar tickets.

Os tickets são categorizados por tipo, prioridade e departamento, para que possam ser facilmente filtrados e gerenciados. Os usuários podem visualizar todos os tickets que criaram ou que foram atribuídos a eles, e também podem atualizar o status dos tickets conforme necessário.

A aplicação também inclui recursos de manutenção, permitindo que os usuários gerenciem dados como departamentos, tipos de tickets e prioridades. Esses dados são usados para criar campos personalizados para os tickets e para categorizá-los de maneira adequada.

Com esses recursos, a single-page application de criação de tickets e usuários é uma solução completa para gerenciar solicitações de suporte e problemas relacionados à organização. Com um design moderno e responsivo, a aplicação é fácil de usar e pode ser acessada de qualquer lugar com uma conexão à internet.

<img src="docs/imagens/OBJETIVO.png" >

> Status do Projeto: Em Desenvolvimento.

</br>

</div>

## 📩 Proposta
**Desenvolver um sistema web com os seguintes requisitos:**

> Requisitos Funcionais

Sprint 1

- [X] Cadastros de Chamados;
- [X] Criação do Formulario de Chamados;
- [X] Consulta de Chamados;
- [X] Exclusão dos chamados;
- [X] Alteração de Chamados;
- [X] Fluxo Chamado;
- [X] Kanban de Estados do chamado;

Sprint 2

- [X] Cadastros de grupos de usuários;
- [X] Permissão por grupo e por usuário;
- [X] Usuários devem ter distinção por times;
- [X] Fila de chamados por time;
- [X] Configuração e personalização de formulários de chamados;
- [X] Árvore de decisão para escalonamento de chamados;
- [X] Historio do Chamado;
- [X] Tela de Analise (chamados);
- [ ] Cadastro de soluções para problemas conhecidos;
- [ ] Formulário de abertura de chamado com indicação de interessados;

Sprint 3

- [X] Cadastros de grupos de usuários;
- [X] Permissão por grupo e por usuário;
- [X] Usuários devem ter distinção por times;
- [X] Fila de chamados por time;
- [X] Configuração e personalização de formulários de chamados;
- [X] Árvore de decisão para escalonamento de chamados;
- [ ] Cadastro de soluções para problemas conhecidos;
- [ ] Formulário de abertura de chamado com indicação de interessados;

Sprint 4

- [X] Indicação de Interessados;
- [X] Cadastro de soluções para problemas conhecidos;
- [X] Formulário de abertura de chamado com indicação de interessados;
- [X] Graficos e Estatisticas 
- [X] Testes e Correções
- [X] Deploy

> Requisitos Não Funcionais

- [X] React;
- [X] NodeJS;
    
 ## 📅 Cronograma das Sprints 

 - - [X] <a href="https://github.com/Grupo-4-Fatech/API-4Semestre/tree/sprint_1">**1° Sprint:**</a> 13/03/2023 a 02/04/2023<br>
 - - [X] <a href="https://github.com/Grupo-4-Fatech/API-4Semestre/tree/sprint_2">**2° Sprint:**</a>
 03/04/2023 a 23/04/2023
 - - [X] <a href="https://github.com/Grupo-4-Fatech/API-4Semestre/tree/sprint_3">**3° Sprint:**</a> 24/04/2023 a 14/05/2023
 - - [X] <a href="https://github.com/Grupo-4-Fatech/API-4Semestre/tree/sprint_4">**4°Sprint:**</a> 15/05/2023 a 04/06/2023
 - - [X] **Feira de Soluções:** 13/06 e 14/06/2023
 
 </br>
    
 ## 💻 Tecnologias Utilizadas

 - **Back-end:** TypeScript, SQLite, PostGreSQL NodeJS com o framework TypeORM.
- **Front-end:** Javascript utilizando React e o framework Tailwind CSS.
- **Ferramentas:** Visual Studio Code, Canva, Git, Github, PowerPoint, MySQL, Microsoft Teams e Discord.

## 💡 Metodologia

<ul> <li> <strong>Metodologia Ágil: SCRUM </strong> </li> </ul>
</br>

<img src="docs/imagens/METODOLOGIA.png" >


## 🗒️ Backlog Priorizado

<img src="docs/imagens/BACKLOG.png">

</br>

## Demonstração em Gif 1ª Sprint

<ul> <li> <strong> Crud de Ticket </strong> </li> </ul>

![crud ticket](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/8ca5d49a-2d2c-4286-9c47-b3d564701738)

Os tickets são divididos em duas categorias: "hotfix" e "feature". Os tickets "hotfix" são utilizados para tratar problemas urgentes e críticos que requerem atenção imediata. Por outro lado, os tickets "feature" são voltados para solicitações de novas funcionalidades ou melhorias no sistema. Através dessa aplicação, os usuários terão a capacidade de criar e gerenciar esses tickets de forma eficiente.

<ul> <li> <strong> Cadastro de Ticket </strong> </li> </ul>

![Cadastro Ticket](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/9bfb293e-d42d-4fe4-9ee7-e9e5d9583bc1)

O cadastro de tickets é uma funcionalidade essencial do sistema de gestão que permite aos usuários registrar e acompanhar as demandas, problemas ou solicitações relacionadas a um projeto ou sistema específico.

<ul> <li> <strong> Aprovado ou Arquivado </strong> </li> </ul>

![aprovado e arquivado](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/3b4c51fc-e140-4be3-afe7-5e0d2bb1766c)

o processo de aprovar e arquivar tickets é uma prática que envolve uma avaliação cuidadosa das demandas apresentadas nos tickets, seguida pela alocação de recursos e esforços para solucionar ou implementar. No entanto, em alguns casos, quando a solução não é viável, o ticket é arquivado, garantindo a transparência, rastreabilidade e a possibilidade de revisão futura.

<ul> <li> <strong> Kanban </strong> </li> </ul>

![kanban](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/d1c9c3c0-f838-41ff-8289-b3d265bdad75)

No Kanban, as colunas geralmente incluem: "Backlog" (para tickets a serem trabalhados futuramente), "Em Progresso" (para tickets que estão sendo trabalhados atualmente), "Revisão" (para tickets concluídos aguardando revisão) e "Concluído" (para tickets que foram concluídos com sucesso).

<a href="">**Detalhe sobre**</a>

<ul> <li> <strong> Arquivado </strong> </li> </ul>

![arquivado](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/101ca38d-c704-4137-a165-39e241b3b7fe)

No contexto do sistema de gestão de tickets, é estabelecido que os tickets criados sem uma solução viável serão arquivados. Esses tickets, após serem avaliados e não apresentarem uma solução adequada, são movidos para uma categoria específica de arquivamento.

## Demonstração em Gif 2ª Sprint

 <ul> <li> <strong>Diferença de Acesso </strong> </li> </ul>

![acesso 2](https://user-images.githubusercontent.com/88494278/234423871-d3f89e16-bd6d-4e34-b6bc-a781753dedcb.gif)

A aplicação oferece aos usuários a capacidade de gerenciar usuários e controlar suas permissões de acesso. Os usuários são agrupados em hierarquias de acesso, com diferentes níveis de privilégios. Por exemplo, um administrador possui a habilidade de criar e gerenciar usuários, enquanto um usuário comum está limitado a visualizar e atualizar apenas os tickets.

<a href="">**Detalhe sobre**</a>

<ul> <li> <strong> Alteração de Usuário Logado</strong> </li> </ul>

![alterar usuario](https://user-images.githubusercontent.com/88494278/234423979-d78debd3-fa44-419f-a5d8-f2caba9947e3.gif)

A funcionalidade de alteração de usuário logado é uma característica importante do sistema que permite aos usuários fazer modificações em suas informações de perfil e conta enquanto estão conectados.

<ul> <li> <strong>Crud de Equipes</strong> </li> </ul>

![equipe](https://user-images.githubusercontent.com/88494278/234424115-0382f130-44c0-402e-a4a2-9cb9eb085422.gif)

Com o CRUD de Equipes, os usuários têm a capacidade de criar novas equipes, fornecendo informações como nome, descrição e membros iniciais. Essa etapa de criação permite que as equipes sejam estabelecidas e definidas de acordo com a estrutura e necessidades da organização.

 <ul> <li> <strong> Crud de Usuários</strong> </li> </ul>

![user d](https://user-images.githubusercontent.com/88494278/234424169-3d93db4d-0a81-4ea7-8580-77546297baa2.gif)

Com o CRUD de Usuários, os administradores têm a capacidade de criar novos usuários no sistema, fornecendo detalhes como nome, endereço de e-mail, senha e outras informações relevantes. Essa etapa de criação permite a inclusão de novos membros na plataforma e a atribuição de permissões apropriadas.

 <ul> <li> <strong> Crud de Times e Equipes </strong> </li> </ul>

![time e equipe](https://user-images.githubusercontent.com/88494278/234424395-568db1af-74ee-42d6-9559-c646488496fb.gif)

o CRUD de Times e Equipes é uma funcionalidade abrangente que engloba todas as etapas do gerenciamento das informações dos times e equipes, desde a criação até a exclusão. Essa funcionalidade oferece controle e flexibilidade aos usuários para estabelecer, atualizar e remover times e equipes, promovendo uma gestão eficiente e alinhada às necessidades da organização.

## Demonstração em Gif 3ª Sprint

<ul> <li> <strong> Tela de análise(chamados) </strong> </li> </ul>

![avaliar chamado](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/a71b2b87-938a-458e-9da9-5bacb63df6be)

Durante a avaliação de tickets, os usuários examinam detalhadamente as informações fornecidas no ticket, como descrição do problema, prioridade, categorias e outros dados relevantes. Eles também podem considerar o impacto do problema relatado ou a importância da solicitação feita.

<a href="">**Detalhe sobre**</a>

<ul> <li> <strong> Árvore dinâmica </strong> </li> </ul>

![Arvore](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/cd73e933-a0bb-4c82-8d4e-cd2605bf0450)

A árvore dinâmica de seleção de usuários é uma funcionalidade avançada do sistema que permite determinar quais usuários podem participar em diferentes galhos de avaliação de cada chamado existente.

<a href="">**Detalhe sobre**</a>

<ul> <li> <strong> Histórico do chamado </strong> </li> </ul>

![Historico](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/748fe1b6-22ee-4876-89b9-c7ab3b3fac60)

O histórico de cada ticket é uma funcionalidade essencial do sistema que registra todas as atividades, atualizações e interações relacionadas a um determinado ticket ao longo do seu ciclo de vida.

<ul> <li> <strong> Opção de idioma </strong> </li> </ul>

![idioma](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/15896a2d-bf10-4a55-af8a-8fc592336ea5)

O seletor de idioma é uma funcionalidade importante na plataforma SPA (Single-Page Application) que permite aos usuários escolherem o idioma de sua preferência para utilizar a aplicação.


## Demonstração em Gif 4ª Sprint

<ul> <li> <strong> Cadastro de Solução de Chamados </strong> </li> </ul>

![cadastro de solução](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/c16c8659-4814-4a4e-8af5-ea6bb35ff49e)

O cadastro de solução é uma funcionalidade fundamental na plataforma que permite aos usuários registrar e armazenar informações sobre as soluções encontradas para os problemas relatados nos tickets.

<ul> <li> <strong> Notificação por Email </strong> </li> </ul>

![notificacao por email](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/d1742324-f34f-4354-82e7-427a3d96153b)

A funcionalidade de envio de e-mails para cada ação realizada por um usuário na plataforma de tickets é uma excelente forma de manter os usuários atualizados sobre o andamento e as alterações relacionadas aos seus processos ou aos tickets em que estão envolvidos.

<a href="">**Detalhe sobre**</a>

<ul> <li> <strong> Graficos Estatisticos </strong> </li> </ul>

![Graficos](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/33713cb0-2968-425c-8652-e4505ee23170)

A plataforma de tickets oferece recursos de gráficos estatísticos que fornecem uma visão clara e abrangente sobre a quantidade de tickets criados e problemas solucionados ao longo do tempo.

<ul> <li> <strong> Cadastro de Usuários Interessados </strong> </li> </ul>

A plataforma de tickets possui um recurso de vinculação de chamados, que permite aos usuários interessados resolver um ticket ou acompanhar seu progresso, selecionando seu e-mail como forma de notificação.
Ambos os Caminhos Kanban e View Ticket levam ao caminho para vincular interessados ao ticket

 >Kanban

![kanban interressados](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/0dd7526b-6811-4f7d-8820-96376617579d)

 >View Ticket

![interessados pelo view ticket](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/b41a88b6-c63e-4b08-92ac-62472b5f6d43)






















## Modelo Conceitual

![modelo conceitural versão final](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/6385e709-d6ad-4b39-8842-de26f3305620)



## Modelo Logico

![modelo logico 4 sprint](https://github.com/Grupo-4-Fatech/API-4Semestre/assets/88494278/27b1f890-9d8b-472d-b136-87922e6db5e9)


## 📉 Gráfico Burndown

- <a href="docs/sprint1/Burndown Geral - sprint 1.pdf">**Sprint 1**</a>
- <a href="docs/sprint2/Burndown Geral - sprint 2.pdf">**Sprint 2**</a>
- <a href="docs/sprint3/Burndown Geral - sprint 3.pdf">**Sprint 3**</a>
- <a href="docs/sprint4/Burndown Geral - sprint 4.pdf">**Sprint 4**</a>
 
## 👥 Equipe

| Nome             | Função        | GitHub                                                                    | Linkedin                                                                                                       |
| ---------------- | ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Everton Ricardo  | Master        | <a href="https://github.com/Evertonrwr" target="_blank">Github</a>        | <a href="https://www.linkedin.com/in/everton-rocha-1a456b20b" target="_blank">Link</a>                         |
| Gabriel Coutinho | Product Owner | <a href="https://github.com/Gabriel-Coutinho0" target="_blank">Github</a> | <a href="https://www.linkedin.com/in/gabriel-silva-b778a31aa" target="_blank">Link</a>                         |
| André Ribeiro    | Desenvolvedor | <a href="https://github.com/New-Tomorrow" target="_blank">Github</a>      | <a href="https://www.linkedin.com/in/andre-ramos-ribeiro-320621226/" target="_blank">Link</a>                  |
| Antônio Barbosa  | Desenvolvedor | <a href="https://github.com/Antonio-Barbosa" target="_blank">Github</a>   | <a href="https://www.linkedin.com/in/antonio-marcelo-9a5b68181" target="_blank">Link</a>                       |
| Bruna Dias       | Desenvolvedor | <a href="https://github.com/brunadias3" target="_blank">Github</a>        | <a href="https://www.linkedin.com/in/bruna-dias-977b611b9/" target="_blank">Link</a>                           |
| Dionísio Leão    | Desenvolvedor | <a href="https://github.com/dsslleagion" target="_blank">Github</a>       | <a href="https://www.linkedin.com/in/dionisio-samuel-dos-santos-le%C3%A3o-616848226/" target="_blank">Link</a> |
| Gustavo Lobato   | Desenvolvedor | <a href="https://github.com/Gustavoldp" target="_blank">Github</a>        | <a href="https://www.linkedin.com/in/gustavo-lobato-8173a11b6/" target="_blank">Link</a>                       |

</br>

 <h1 align="center"> <img src = "https://fatecsjc-prd.azurewebsites.net/images/logo/fatecsjc_400x192.png" height="70"  align="auto">
