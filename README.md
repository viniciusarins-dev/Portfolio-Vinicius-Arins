# Portfólio — Vinicius de Jesus Arins

Portfólio pessoal em HTML, CSS e JavaScript, sem build e sem dependências.
Publicado pelo Netlify em https://portfolio-vinicius-arins.netlify.app/.

Apresenta dois projetos: **Cobrança/Recebe** (gestão de cobranças e operações
financeiras) e **CRIEXO Intelligence** (inteligência comercial e prospecção).

## Estrutura

- `index.html`: página única (início, projetos, sobre, tecnologias, contato), metadados de SEO e Open Graph
- `assets/css/styles.css`: tokens de design (cores, fontes, espaçamentos) e estilos
- `assets/js/main.js`: header compacto, barra de progresso, menu do celular, seção ativa, revelação na rolagem e troca das telas dos projetos
- `assets/projetos/`: capturas dos sistemas em WebP
- `assets/og-image.png`, `assets/favicon.svg`, `assets/apple-touch-icon.png`: compartilhamento e ícones

## Capturas dos projetos

As imagens em `assets/projetos/` são capturas reais dos dois sistemas rodando
localmente (Supabase local), com **dados fictícios** criados só para isso.
Nenhum dado de cliente real aparece no portfólio.

## Acessibilidade e movimento

- Animações curtas, desligadas com `prefers-reduced-motion`.
- Sem JavaScript, todo o conteúdo continua visível.
- Foco de teclado visível, atalho "Pular para o conteúdo" e menu do celular que fecha com Esc.

## Como rodar localmente

Abra o `index.html` no navegador ou sirva a pasta, por exemplo com
`python3 -m http.server 8080`.

## Deploy

O Netlify publica a raiz do repositório a partir da branch principal. Não há
comando de build.

## Contato

- LinkedIn: https://www.linkedin.com/in/vinicius-de-jesus-arins-/
- Instagram: [@vn.jes](https://instagram.com/vn.jes)
- GitHub: [@viniciusarins-dev](https://github.com/viniciusarins-dev)
