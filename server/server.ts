import { join } from 'node:path'
import * as Path from 'node:path'
import * as URL from 'node:url'

import pokemonRoutes from './routes/pokemon.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
import express from 'express'

const server = express()

server.use(express.static(join(__dirname, 'public')))
server.use(express.json())

server.use('/api/v1/pokemon', pokemonRoutes)
server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
