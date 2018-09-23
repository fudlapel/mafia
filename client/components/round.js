import React, {Component} from 'react'
import {connect} from 'react-redux'
import KillNarration from './killNarration'
import ConnectedPredatorKillVote from './predatorKillVote'
import ConnectedGuessNarration from './guessNarration'
import ConnectedAllGuessVote from './allGuessVote'
import KillResult from './killResult'

class Round extends Component {
  componentDidMount() {}

  render() {
    const {round} = this.props

    return (
      <div>
        <h1>
          ROUND: {round.roundType} - {round.status}
        </h1>
        {round.roundType === 'kill' &&
          round.status === 'phase 1' && (
            <div>
              <KillNarration />
              {/* timer */}
              <ConnectedPredatorKillVote />
            </div>
          )}
        {round.roundType === 'kill' &&
          round.status === 'phase 2' && (
            <div>
              <KillResult />
            </div>
          )}

        {/* {round.roundType === 'guess' &&
          round.status === 'phase 1' && (
            <div>
              <ConnectedGuessNarration /> */}
        {/* timer */}
        {/* <ConnectedAllGuessVote />
            </div>
          )} */}

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
