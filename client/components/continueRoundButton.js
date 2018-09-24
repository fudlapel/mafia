import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatingRound, goCreateRound} from '../store/roundReducer'
import {updateGameStatus} from '../store/gameReducer'

class ContinueRoundButton extends Component {
  constructor() {
    super()
    this.beginNextPhase = this.beginNextPhase.bind(this)
    this.beginNextRound = this.beginNextRound.bind(this)
    this.closeRoundAndStartNewRound = this.closeRoundAndStartNewRound.bind(this)
  }

  beginNextPhase(phase) {
    const roundId = this.props.round.id
    this.props.updateRound(roundId, phase)
  }

  beginNextRound(status) {
    const gameId = this.props.game.id
    this.props.updateGame(gameId, status)
    const round = this.props.round
    this.props.startNewRound(gameId, round)
  }

  closeRoundAndStartNewRound() {
    const gameId = this.props.game.id
    const round = this.props.round
    this.props.startNewRound(gameId, round)
  }

  render() {
    const {round} = this.props
    const status = round.status

    if (!round.id) {
      return (
        <div>
          <button type="submit" onClick={() => this.beginNextRound('in round')}>
            ~Begin Round~
          </button>
        </div>
      )
    } else if (status === 'phase 2') {
      return (
        <div>
          <button type="submit" onClick={() => this.beginNextPhase('phase 3')}>
            ~Continue~
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button
            type="submit"
            onClick={() => this.closeRoundAndStartNewRound()}
          >
            ~Begin Next Round~
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    game: state.game,
    round: state.round
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRound: (roundId, status) => dispatch(updatingRound(roundId, status)),
    updateGame: (gameId, status) => dispatch(updateGameStatus(gameId, status)),
    startNewRound: (gameId, currentRound) =>
      dispatch(goCreateRound(gameId, currentRound))
  }
}

const ConnectedContinueRoundButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContinueRoundButton)

export default ConnectedContinueRoundButton
