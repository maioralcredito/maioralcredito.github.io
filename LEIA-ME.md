# Site institucional — Maioral Crédito

Este arquivo é o guia de orientação do site. Guarde-o junto com os arquivos.

## Onde o site está salvo (a proteção real contra perda)

O site está versionado no GitHub, com histórico completo de cada alteração feita.
Isso significa que, mesmo que você perca este arquivo .zip, o site **não se perde**,
porque está salvo lá, com todas as versões anteriores também.

- Repositório: `https://github.com/maioralcredito/maioralcredito.github.io`
- Branch onde o site novo está: `claude/maioralcredito-rebuild-30a8ub`
- Link direto para ver os arquivos: `https://github.com/maioralcredito/maioralcredito.github.io/tree/claude/maioralcredito-rebuild-30a8ub`

**Importante:** esse site ainda não está publicado em www.maioralcredito.com.br.
Ele está pronto, mas precisa de um Pull Request (PR) juntando essa branch na
branch `main`, que é a que o GitHub Pages publica de fato. Quando quiser
publicar, é só pedir para eu abrir esse PR.

## Estrutura dos arquivos

```
index.html              → todo o conteúdo e textos do site
assets/css/style.css    → cores, fontes, layout, espaçamentos
assets/js/main.js       → WhatsApp, formulário, animações
assets/img/
  maioral-logo.svg      → a logo (M dourado em círculo navy)
  thiago-cabral.jpg     → foto do Thiago na seção "Quem está por trás"
CNAME                   → configura o domínio www.maioralcredito.com.br no GitHub Pages
```

## O que editar e onde

| O que você quer mudar          | Arquivo                  | O que procurar |
|---------------------------------|---------------------------|-----------------|
| Número de WhatsApp               | `assets/js/main.js`       | `WHATSAPP_NUMBER` (linha perto do topo) |
| Mensagem automática do WhatsApp  | `assets/js/main.js`       | `WHATSAPP_DEFAULT_MESSAGE` |
| Textos do site (qualquer seção)  | `index.html`              | procure o texto atual e troque |
| Cores (dourado, azul, fundo)     | `assets/css/style.css`    | bloco `:root {}` no topo do arquivo |
| Logo ou foto                     | `assets/img/`             | substitua o arquivo mantendo o mesmo nome |
| E-mail de contato                | `index.html`              | procure `contato@maioralcredito.com.br` |

## Como visualizar localmente (sem precisar de internet)

Abra o arquivo `index.html` duas vezes clicando nele. Ele carrega o CSS e o
JS das pastas `assets/`, então **mantenha a pasta inteira junta**, não
separe os arquivos.

Se quiser rodar como site local completo (com servidor), abra o terminal
na pasta e rode:
```
python3 -m http.server 8000
```
depois acesse `http://localhost:8000` no navegador.

## Como fazer backup daqui pra frente

A forma mais segura é sempre manter o trabalho no GitHub (já está assim).
Se quiser um backup adicional, salve este .zip em algum lugar como Google
Drive ou Dropbox, e repita isso sempre que houver uma atualização grande
no site.

## Dados reais já configurados no site

- WhatsApp: (19) 98958-2642
- E-mail: contato@maioralcredito.com.br
- Responsável: Thiago Cabral, Diretor Comercial, Campinas/SP
- LinkedIn: https://www.linkedin.com/in/thiago-cabral-6b171593/
