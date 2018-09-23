import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers} from '../store/playersReducer'
import {goFetchGame} from '../store/gameReducer'

class PredatorKillVote extends Component {
  componentDidMount() {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.fetchInitialPlayers(gameId)
    this.props.fetchInitialGame(gameId)
  }

  render() {
    const prey = this.props.players.allPlayers.filter(
      player => player.role === 'prey'
    )
    console.log('prey: ', prey)
    if (!prey.length) {
      return <p>loading/not enough players</p>
    }

    if (this.props.players.thisPlayer.role === 'prey') {
      return <span>{}</span>
    }

    return (
      <div>
        <ul>
          {prey.length &&
            prey.map(player => {
              return (
                <li key={player.id}>
                  <button type="submit">{player.name}</button>
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    game: state.game,
    round: state.round
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialPlayers: gameId => dispatch(fetchAllPlayers(gameId)),
    fetchInitialGame: gameId => dispatch(goFetchGame(gameId))
  }
}

const ConnectedPredatorKillVote = connect(mapStateToProps, mapDispatchToProps)(
  PredatorKillVote
)

export default ConnectedPredatorKillVote
