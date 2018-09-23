import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatingRound} from '../store/roundReducer'

class ContinueRoundButton extends Component {
  constructor() {
    super()
    this.beginNextPhase = this.beginNextPhase.bind(this)
  }

  beginNextPhase() {
    const roundId = this.props.round.id
    this.props.updateRound(roundId, 'phase 3')
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.beginNextPhase()}>
          ~Continue~
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    round: state.round
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRound: (roundId, status) => dispatch(updatingRound(roundId, status))
  }
}

const ConnectedContinueRoundButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContinueRoundButton)

export default ConnectedContinueRoundButton
