# NovaPixel Agencia

Site institucional da NovaPixel Agencia, desenvolvido com React + Vite.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build para produção

```bash
npm run build
npm start
```

Os arquivos estáticos ficam em `dist/` e o `server.js` serve o site na porta `3000` (ou `PORT`).

## Deploy na Hostinger (Node.js Web App)

Repositório: `FelipeErnDev/novapixel-agencia`

### Configurações no hPanel

| Campo | Valor |
| --- | --- |
| Framework | **Vite** (se não detectar, use **Other**) |
| Node.js | **20.x** |
| Root directory | `/` (raiz do repositório) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Entry file | `server.js` |
| Start command | `npm start` |

### Se aparecer "estrutura inválida"

1. Confirme que o **Root directory** está vazio ou `/` (não uma subpasta).
2. Selecione manualmente **Vite** ou **Other** no framework.
3. Garanta que `package.json`, `index.html`, `vite.config.js` e `src/` estão na raiz do repo.

### Após conectar o GitHub

Cada push na branch `main` pode disparar redeploy automático.

## Preview local do build

```bash
npm run build
npm run preview
```
