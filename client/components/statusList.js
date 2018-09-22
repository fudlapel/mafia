import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers, randomlyAssignRoles} from '../store/playersReducer'
import {goFetchGame, startGame, updateGameStatus} from '../store/gameReducer'

class StatusList extends Component {
  constructor() {
    super()
    this.startPlayingGame = this.startPlayingGame.bind(this)
    this.assignRoles = this.assignRoles.bind(this)
    //this.changeGameStatus = this.changeGameStatus.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.players.thisPlayer.gameId
    console.log('gameId in CompDidMount: ', gameId)
    this.props.fetchInitialPlayers(gameId)
    this.props.fetchInitialGame(gameId)
  }

  startPlayingGame() {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.startToPlayGame(gameId)
  }

  assignRoles(status) {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.assigningRoles(gameId)
    this.props.updateGame(gameId, status)
  }

  // changeGameStatus(status) {
  //   const gameId = this.props.players.thisPlayer.gameId
  //   this.props.updateGame(gameId, status)
  // }

  render() {
    const players = this.props.players.allPlayers
    const game = this.props.game
    console.log('Status List - players: ', players)
    console.log('typeof - players: ', typeof players)
    console.log('Status List - game: ', game)
    console.log('typeof - game: ', typeof players)

    if (players === undefined || game === null) {
      return <p>one moment please</p>
    }

    return (
      <div>
        <h1>Player List</h1>
        <ul>
          {players.map(player => (
            <li key={player.id}>
              <p>
                Name: {player.name}.........Status: {player.status}
              </p>
            </li>
          ))}
        </ul>
        {this.props.game.status === 'new' ? (
          <div>
            <button type="submit" onClick={() => this.startPlayingGame()}>
              Ready? Start playing!
            </button>
            <p>This button will start the game and close it to new players.</p>
          </div>
        ) : (
          <div>
            <p>The game is now in play! Click below to assign roles.</p>
            <button
              type="submit"
              onClick={() => this.assignRoles('roles assigned')}
            >
              Assign Roles: Predator vs Prey
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialPlayers: gameId => dispatch(fetchAllPlayers(gameId)),
    fetchInitialGame: gameId => dispatch(goFetchGame(gameId)),
    startToPlayGame: gameId => dispatch(startGame(gameId)),
    assigningRoles: gameId => dispatch(randomlyAssignRoles(gameId)),
    updateGame: (gameId, status) => dispatch(updateGameStatus(gameId, status))
  }
}

const ConnectedStatusList = connect(mapStateToProps, mapDispatchToProps)(
  StatusList
)

export default ConnectedStatusList
