module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    //++++++++++++
    socket.on('new-player', player => {
      socket.broadcast.emit('new-player', player)
    })

    socket.on('game-status-change', game => {
      socket.broadcast.emit('game-status-change', game)
    })

    socket.on('new-round', round => {
      socket.broadcast.emit('new-round', round)
    })

    // socket.on('round-status-change', round => {
    //   socket.broadcast.emit('round-status-change', round)
    // })
    //++++++++++++

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
