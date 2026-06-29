import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(__dirname, 'dist')
const port = Number(process.env.PORT) || 3000

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const resolveFilePath = async (requestPath) => {
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, '')
  const filePath = join(distDir, safePath === '/' ? 'index.html' : safePath)

  if (!filePath.startsWith(distDir)) {
    return join(distDir, 'index.html')
  }

  try {
    const fileStat = await stat(filePath)
    if (fileStat.isFile()) return filePath
  } catch {
    // fall through to SPA fallback
  }

  return join(distDir, 'index.html')
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    const filePath = await resolveFilePath(decodeURIComponent(url.pathname))
    const data = await readFile(filePath)
    const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream'

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`NovaPixel site running on port ${port}`)
})
