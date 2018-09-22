import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ConnectedCreatingJoiningGame from './creatingJoiningGame'
import ConnectedStatusList from './statusList'

class Game extends Component {
  render() {
    const thisPlayer = this.props.players.thisPlayer
    console.log('thisPlayer in StartGame: ', thisPlayer)
    if (!thisPlayer.name) {
      return <ConnectedCreatingJoiningGame />
    } else {
      return <ConnectedStatusList />
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

const ConnectedGame = connect(mapStateToProps)(Game)

export default ConnectedGame
