import React, {Component} from 'react'
import {connect} from 'react-redux'
import KillNarration from './killNarration'
import ConnectedPredatorKillVote from './predatorKillVote'
import ConnectedContinueRoundButton from './continueRoundButton'
import ConnectedStatusList from './statusList'
import ConnectedGuessNarration from './guessNarration'
import ConnectedAllGuessVote from './allGuessVote'
import KillResult from './killResult'

class Round extends Component {
  componentDidMount() {}

  render() {
    const {round} = this.props
    const {players} = this.props
    const killedPlayerId = round.chosenPlayerId
    const killedPlayer = players.allPlayers.filter(
      player => player.id === killedPlayerId
    )[0]

    return (
      <div>
        <h1>
          ROUND: {round.roundType} - {round.status}
        </h1>
        {round.roundType === 'kill' && (
          <div>
            <KillNarration />
            {/* timer */}
            <ConnectedPredatorKillVote />
          </div>
        )}
        {round.roundType === 'kill' &&
          round.status === 'phase 2' && (
            <div>
              <KillResult killedPlayer={killedPlayer} />
              <ConnectedContinueRoundButton />
            </div>
          )}

        {round.roundType === 'kill' &&
          round.status === 'phase 3' && (
            <div>
              <ConnectedStatusList />
              <ConnectedContinueRoundButton />
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
