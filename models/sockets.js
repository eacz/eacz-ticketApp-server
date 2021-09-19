class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('client connected');
      socket.on('message-to-server', (data) => {
        console.log(data)
        this.io.emit('message-from-server', data)
      })
    })

    this.io.on('disconnect', (socket) => {
      console.log('client disconnected');
    })
    
  }
}

module.exports = Sockets
