import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import ConnectedGame from './components/game'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
      <ConnectedGame />
    </div>
  )
}

export default App
