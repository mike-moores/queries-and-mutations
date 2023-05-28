import server from './server'

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('API Routes available on port:', port)
})
