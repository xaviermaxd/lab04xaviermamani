const express = require ('express')
const app = express()

const path = require('path');
const http = require('http')
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'static'))); // o 'static'


const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    // Procedimiento 4:
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.get('/chat', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/index.html`)
})

app.get('/code', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/code_editor.html`)
})

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/chat_view.html`)
})

server.listen(5000,() => {
    console.log('Servidor corriendo en http://localhost:5000')
})