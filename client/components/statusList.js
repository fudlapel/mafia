import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers, randomlyAssignRoles} from '../store/playersReducer'
import {goFetchGame, startGame} from '../store/gameReducer'

class StatusList extends Component {
  constructor() {
    super()
    this.startPlayingGame = this.startPlayingGame.bind(this)
    this.assignRoles = this.assignRoles.bind(this)
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

  assignRoles() {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.assigningRoles(gameId)
  }

  render() {
    const players = this.props.players.allPlayers
    const game = this.props.game
    console.log('Status List - players: ', players)
    console.log('typeof - players: ', typeof players)
    console.log('Status List - game: ', game)
    console.log('typeof - game: ', typeof game)

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
            <button type="submit" onClick={() => this.assignRoles()}>
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
    assigningRoles: gameId => dispatch(randomlyAssignRoles(gameId))
  }
}

const ConnectedStatusList = connect(mapStateToProps, mapDispatchToProps)(
  StatusList
)

export default ConnectedStatusList
