import server from './server.ts'

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('API Routes available are running...')
})
