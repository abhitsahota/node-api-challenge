const server = require('./server')

const port = process.env.PORT || 3030

server.listen(port, () => {
    console.log(`The server is running on localhost:${port}`)
})