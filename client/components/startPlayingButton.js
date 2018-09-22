import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startGame} from '../store/gameReducer'

class StartPlayingButton extends Component {
  constructor() {
    super()
    this.startPlayingGame = this.startPlayingGame.bind(this)
  }

  startPlayingGame() {
    const gameId = this.props.game.id
    this.props.startToPlayGame(gameId)
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.startPlayingGame()}>
          Ready? Start playing!
        </button>
        <p>This button will start the game and close it to new players.</p>
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
    startToPlayGame: gameId => dispatch(startGame(gameId))
  }
}

const ConnectedStartPlayingButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPlayingButton)

export default ConnectedStartPlayingButton
