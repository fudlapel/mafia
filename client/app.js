import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ConnectedStartGame from './components/startGame'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
      <ConnectedStartGame />
    </div>
  )
}

export default App
