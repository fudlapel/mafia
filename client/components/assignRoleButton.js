import React, {Component} from 'react'
import {connect} from 'react-redux'
import {randomlyAssignRoles} from '../store/playersReducer'
import {updateGameStatus} from '../store/gameReducer'

//need to refetch this player with assigned role!!!!!

class AssignRoleButton extends Component {
  constructor() {
    super()
    this.assignRoles = this.assignRoles.bind(this)
  }

  assignRoles(status) {
    const gameId = this.props.game.id
    this.props.assigningRoles(gameId)
    this.props.updateGame(gameId, status)
  }

  render() {
    return (
      <div>
        <p>The game is now in play! Click below to assign roles.</p>
        <button
          type="submit"
          onClick={() => this.assignRoles('roles assigned')}
        >
          Assign Roles: Predator vs Prey
        </button>
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
    assigningRoles: gameId => dispatch(randomlyAssignRoles(gameId)),
    updateGame: (gameId, status) => dispatch(updateGameStatus(gameId, status))
  }
}

const ConnectedAssignRoleButton = connect(mapStateToProps, mapDispatchToProps)(
  AssignRoleButton
)

export default ConnectedAssignRoleButton
