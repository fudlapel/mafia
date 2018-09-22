import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ConnectedCreatingJoiningGame from './creatingJoiningGame'
import ConnectedStatusList from './statusList'

class StartGame extends Component {
  render() {
    const thisPlayer = this.props.players.thisPlayer
    console.log('thisPlayer in StartGame: ', thisPlayer)
    if (thisPlayer.name) {
      return <ConnectedStatusList />
    } else {
      return <ConnectedCreatingJoiningGame />
    }
  }
}

const mapStateToProps = state => {
  return {
    //user: state.user,
    newPlayer: state.newPlayer,
    players: state.players,
    game: state.game
  }
}

const ConnectedStartGame = connect(mapStateToProps)(StartGame)

export default ConnectedStartGame
