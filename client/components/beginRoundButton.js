import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateGameStatus} from '../store/gameReducer'
import {goCreateRound} from '../store/roundReducer'

class BeginRoundButton extends Component {
  constructor() {
    super()
    this.beginNextRound = this.beginNextRound.bind(this)
  }

  beginNextRound(status) {
    const gameId = this.props.game.id
    this.props.updateGame(gameId, status)
    this.props.startNewRound(gameId)
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.beginNextRound('in round')}>
          ~Begin Round~
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGame: (gameId, status) => dispatch(updateGameStatus(gameId, status)),
    startNewRound: gameId => dispatch(goCreateRound(gameId))
  }
}

const ConnectedBeginRoundButton = connect(mapStateToProps, mapDispatchToProps)(
  BeginRoundButton
)

export default ConnectedBeginRoundButton
