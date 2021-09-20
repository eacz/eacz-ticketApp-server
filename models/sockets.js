const TicketList = require("./ticketList");

class Sockets {
  constructor(io) {
    this.io = io

    //ticketList instance
    this.ticketList = new TicketList()

    this.socketEvents()
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('client connected');
      
      socket.on('request-ticket', (_data, callback) => {
        const newTicket = this.ticketList.createTicket()
        callback(newTicket)
      })

      socket.on('next-ticket-to-work', (user, callback) => {
        const {desk, agent} = user
        const ticket = this.ticketList.asignTicket(agent, desk)
        callback(ticket)

      })
    })

    this.io.on('disconnect', (socket) => {
      console.log('client disconnected');
    })
    
  }
}

module.exports = Sockets
