import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers} from '../store/playersReducer'
import {goFetchGame} from '../store/gameReducer'
import ConnectedStartPlayingButton from './startPlayingButton'
import ConnectedAssignRoleButton from './assignRoleButton'

class StatusList extends Component {
  componentDidMount() {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.fetchInitialPlayers(gameId)
    this.props.fetchInitialGame(gameId)
  }

  render() {
    const players = this.props.players.allPlayers
    const game = this.props.game

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
          <ConnectedStartPlayingButton />
        ) : (
          <ConnectedAssignRoleButton />
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
    fetchInitialGame: gameId => dispatch(goFetchGame(gameId))
  }
}

const ConnectedStatusList = connect(mapStateToProps, mapDispatchToProps)(
  StatusList
)

export default ConnectedStatusList
