var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  console.log('got a connection!')
  socket.on('stateUpdate', function (player) {
    console.log('got state update', player)
    io.sockets.emit('stateUpdateForwardedByServer', player)
  })
})
