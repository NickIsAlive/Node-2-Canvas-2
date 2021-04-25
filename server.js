console.log("The server is running!")

var express = require('express')
var app = express()
var server = app.listen(3000)
app.use(express.static('public'))

var socket = require('socket.io')
var io = socket(server)
io.sockets.on('connection',newConnection)

var userId = {}

function newConnection(socket) {
  console.log('New connection:' + socket.id)
  var randomColour = [Math.random()*255, Math.random()*255, Math.random()*255]
  userId[socket.id]=randomColour
  socket.emit('newId',[socket.id,randomColour])
  socket.on('mouse',mouseMessage)
  function mouseMessage(data) {
    console.log(data)
    socket.broadcast.emit('mouse',data)
  }
}
