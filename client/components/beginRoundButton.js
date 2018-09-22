import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateGameStatus} from '../store/gameReducer'

class BeginRoundButton extends Component {
  constructor() {
    super()
    this.beginNextRound = this.beginNextRound.bind(this)
  }

  beginNextRound(status) {
    const gameId = this.props.game.id
    this.props.updateGame(gameId, status)
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.beginNextRound('in round')}>
          ~Begin Next Round~
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
    updateGame: (gameId, status) => dispatch(updateGameStatus(gameId, status))
  }
}

const ConnectedBeginRoundButton = connect(mapStateToProps, mapDispatchToProps)(
  BeginRoundButton
)

export default ConnectedBeginRoundButton
