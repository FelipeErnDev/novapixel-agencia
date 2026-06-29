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
```

Os arquivos estáticos ficam em `dist/`.

## Deploy na Hostinger (Node.js Web App)

O projeto é compatível com a hospedagem Node.js da Hostinger (planos Business ou Cloud).

### 1. Conectar o GitHub

No hPanel: **Websites → Add Website → Node.js Apps → Import Git Repository**

Repositório: `FelipeErnDev/novapixel-agencia`  
Branch: `main`

### 2. Configurações de build

| Campo | Valor |
| --- | --- |
| Framework | **Vite** (ou React) |
| Node.js | **20.x** |
| Build command | `npm run build` |
| Output directory | `dist` |
| Start command | `npm start` |

Se a detecção automática falhar, use **Other** e preencha manualmente os campos acima.

### 3. Variáveis de ambiente

Este site não exige variáveis de ambiente para funcionar.

### 4. Após o deploy

A Hostinger executa o build e publica os arquivos de `dist/`. Cada push na branch `main` pode disparar um novo deploy automático.

## Preview local do build

```bash
npm run build
npm run preview
```
