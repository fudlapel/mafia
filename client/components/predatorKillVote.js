import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllPlayers, killPrey} from '../store/playersReducer'
import {goFetchGame} from '../store/gameReducer'
import {updatingRound} from '../store/roundReducer'

class PredatorKillVote extends Component {
  componentDidMount() {
    const gameId = this.props.players.thisPlayer.gameId
    this.props.fetchInitialPlayers(gameId)
    this.props.fetchInitialGame(gameId)
    this.killPlayer = this.killPlayer.bind(this)
  }

  killPlayer(playerId) {
    //kill player + update round to phase 2
    const gameId = this.props.game.id
    const roundId = this.props.round.id
    this.props.killPreyPlayer(playerId, gameId)
    this.props.updateRound(roundId, 'phase 2', playerId)
  }

  render() {
    const prey = this.props.players.allPlayers.filter(
      player => player.role === 'prey' && player.status === 'alive'
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
                  <button
                    type="submit"
                    onClick={() => this.killPlayer(player.id)}
                  >
                    {player.name}
                  </button>
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
    fetchInitialGame: gameId => dispatch(goFetchGame(gameId)),
    killPreyPlayer: (playerId, gameId) => dispatch(killPrey(playerId, gameId)),
    updateRound: (roundId, status, playerId) =>
      dispatch(updatingRound(roundId, status, playerId))
  }
}

const ConnectedPredatorKillVote = connect(mapStateToProps, mapDispatchToProps)(
  PredatorKillVote
)

export default ConnectedPredatorKillVote
