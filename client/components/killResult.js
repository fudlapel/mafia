import React from 'react'
import {connect} from 'react-redux'

export default function KillResult(props) {
  const killedPlayer = props.killedPlayer

  //render() {
  return (
    <div>
      <h2>IN THE NIGHT....</h2>
      <p>{killedPlayer.name} was killed!</p>
    </div>
  )
  //}
}
