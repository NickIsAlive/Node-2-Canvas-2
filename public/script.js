var socket
var localColour = [255,255,255]

function setup(){
  createCanvas(1920,1080)
  background(0)
	socket = io.connect('80.7.136.91:3000')
	socket.on('mouse',newDrawing)
  socket.on('newId',setColour)
}

function setColour(data) {
  localColour = data[1]
}

function newDrawing(data) {
	noStroke()
	fill(data.colour)
	ellipse(data.x,data.y,30,30)
}

//こんにちは

function mouseDragged() {
	noStroke()
	fill(localColour)
	ellipse(mouseX,mouseY,30,30)

	data = {x:mouseX,y:mouseY,colour:localColour}
	socket.emit('mouse',data)
}

//bonjour
