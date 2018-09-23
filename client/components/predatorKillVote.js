import React, {Component} from 'react'
import {connect} from 'react-redux'

class PredatorKillVote extends Component {
  componentDidMount() {
    //fetch intitial players
  }

  render() {
    const prey = this.props.players.filter(player => player.role === 'prey')
    console.log('prey: ', prey)

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
    //game: state.game,
    round: state.round
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ConnectedPredatorKillVote = connect(mapStateToProps, mapDispatchToProps)(
  PredatorKillVote
)

export default ConnectedPredatorKillVote
