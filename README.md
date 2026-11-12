# WebZoo — Plataforma de Educação Ambiental

Projeto prático desenvolvido na disciplina de **Front-End** no **SENAI "Comendador Santoro Mirone" (Indaiatuba/SP)**.

- **Estudante:** [Seu Nome Completo]
- **Turma:** [Sua Turma]
- **Link publicado:** [Insira aqui o link do GitHub Pages / Netlify / Vercel]

## Páginas do Site
1. `index.html`: Apresentação do WebZoo, missão/visão/valores, destaque de três animais e curiosidades.
2. `animais.html`: Fichas completas da onça-pintada, tucano-toco e capivara, com filtro por classe e alimentação.
3. `visite.html`: Horários de funcionamento, tabela acessível de ingressos, como chegar, previsão do tempo em tempo real e perguntas frequentes.
4. `participe.html`: Programas de educação ambiental, dicas de preservação e formulário de cadastro com preenchimento automático via CEP.

## APIs Utilizadas
- **Open-Meteo Weather Forecast API** (`https://api.open-meteo.com/v1/forecast`): utilizada na página `visite.html` (`js/clima.js`) para exibir a temperatura atual, máxima, mínima e chance de chuva no Zoológico de São Paulo (latitude `-23.65`, longitude `-46.62`).
- **ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`): utilizada na página `participe.html` (`js/cep.js`) para preencher automaticamente rua, bairro, cidade e estado a partir do CEP informado.

## Interações com JavaScript
- Menu hambúrguer responsivo e acessível por teclado (`Escape`, `aria-expanded`, controle de `tabindex`).
- Filtro dinâmico de animais por classe e alimentação (`js/animais.js`).
- Validação completa de formulário sem `alert()`, com foco automático no primeiro campo inválido (`js/formulario.js`).
- Máscara automática para CEP e telefone, contador de caracteres da mensagem e botão "Voltar ao topo".

## Ferramentas de IA Utilizadas
- **Gemini:** apoio no planejamento estrutural, geração de código semântico HTML5/CSS3/JS, revisão de acessibilidade (ARIA e contraste) e estruturação da documentação.