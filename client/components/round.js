import React, {Component} from 'react'
import {connect} from 'react-redux'
import ConnectedKillNarration from './killNarration'
import ConnectedPredatorKillVote from './predatorKillVote'
import ConnectedGuessNarration from './guessNarration'
import ConnectedAllGuessVote from './allGuessVote'

class Round extends Component {
  componentDidMount() {}

  render() {
    const {round} = this.props

    return (
      <div>
        <h1>
          ROUND: {round.roundType} Phase - {round.status}
        </h1>
        {round.roundType === 'kill' &&
          round.status === 'phase 1' && (
            <div>
              <ConnectedKillNarration />
              {/* timer */}
              <ConnectedPredatorKillVote />
            </div>
          )}

        {round.roundType === 'guess' &&
          round.status === 'phase 1' && (
            <div>
              <ConnectedGuessNarration />
              {/* timer */}
              <ConnectedAllGuessVote />
            </div>
          )}

        {/* {round.roundType === 'kill' && round.status === 'phase 1' && <ConnectedPredatorKillVote />}
          {round.roundType === 'guess' && round.status === 'phase 1' && <ConnectedAllGuessVote />} */}
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
  return {}
}

const ConnectedRound = connect(mapStateToProps, mapDispatchToProps)(Round)

export default ConnectedRound
