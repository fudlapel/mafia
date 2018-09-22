import React, {Component} from 'react'
import {connect} from 'react-redux'
import {goCreateNewGame} from '../store/gameReducer'
import {goCreatePlayer} from '../store/playersReducer'
import {writeNewPlayerName, writeNewPlayerCode} from '../store/newPlayerReducer'

class CreatingJoiningGame extends Component {
  constructor() {
    super()
    this.startNewGame = this.startNewGame.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeCode = this.handleChangeCode.bind(this)
    this.addMe = this.addMe.bind(this)
  }

  startNewGame() {
    this.props.createNewGame()
  }

  handleChangeName(event) {
    this.props.writeNewPlayerName(event.target.value)
  }

  handleChangeCode(event) {
    this.props.writeNewPlayerCode(event.target.value)
  }

  // handleSubmit(event) {
  //   //event.preventDefault()
  //   const {newPlayer} = this.props
  //   const name = newPlayer.name
  //   const gameCode = newPlayer.code
  //   this.props.addPlayerToGame(name, gameCode)
  // }

  addMe() {
    const {newPlayer} = this.props
    const name = newPlayer.name
    const gameCode = newPlayer.code
    this.props.addPlayerToGame(name, gameCode)
  }

  render() {
    const game = this.props.game

    return (
      <div>
        <h1>WELCOME TO MAFIA</h1>

        <p>Starting a new game? Click this button to generate a game code!</p>
        <p>Share it with your friends so they can join your game.</p>

        <button type="submit" onClick={() => this.startNewGame()}>
          Start New Game!
        </button>

        {game.gameCode ? <p>NEW GAME CODE: {game.gameCode}</p> : <p />}

        {/* <form onSubmit={() => this.handleSubmit()}> */}
        <div>
          <h3>Player: </h3>
          <input
            type="text"
            name="player-name"
            value={this.props.newPlayer.name}
            onChange={this.handleChangeName}
            placeholder="player name goes here..."
          />
        </div>
        <div>
          <h3>Game Code: </h3>
          <input
            type="text"
            name="gamecode"
            value={this.props.newPlayer.code}
            onChange={this.handleChangeCode}
            placeholder="input game code here..."
          />
          <button type="submit" onClick={() => this.addMe()}>
            Go!
          </button>
        </div>
        {/* </form> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    newPlayer: state.newPlayer,
    players: state.players,
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialUser: () => dispatch(me()),
    createNewGame: () => dispatch(goCreateNewGame()),
    writeNewPlayerName: string => dispatch(writeNewPlayerName(string)),
    writeNewPlayerCode: string => dispatch(writeNewPlayerCode(string)),
    addPlayerToGame: (name, gameCode) =>
      dispatch(goCreatePlayer(name, gameCode))
  }
}

const ConnectedCreatingJoiningGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatingJoiningGame)

export default ConnectedCreatingJoiningGame
