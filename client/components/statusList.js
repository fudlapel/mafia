import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers} from '../store/playersReducer'

class StatusList extends Component {
  componentDidMount() {
    const gameId = this.props.players.thisPlayer.gameId
    console.log('gameId in StatusList: ', gameId)
    if (gameId) {
      this.props.fetchInitialPlayers(gameId)
    }
  }

  render() {
    const players = this.props.players.allPlayers
    console.log('players: ', players)

    if (players === undefined) {
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
        {/* <button type="submit" onClick={() => this.startPlayingGame()}>
          Ready? Start playing!
        </button> */}
        <p>This button will start the game and close it to new players.</p>
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
    fetchInitialPlayers: gameId => dispatch(fetchAllPlayers(gameId))
  }
}

const ConnectedStatusList = connect(mapStateToProps, mapDispatchToProps)(
  StatusList
)

export default ConnectedStatusList
