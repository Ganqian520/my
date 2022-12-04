import React from 'react'
import ReactDOM from 'react-dom/client'

import { HashRouter,Route } from '../my-router/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Route path='/a' component={A}></Route>
      <Route path='/b' component={B}></Route>
    </HashRouter>
    
  </React.StrictMode>
)

function A() {
  return (
    <div>
      <h1>A</h1>
    </div>
  )
}
function B() {
  return (
    <div>
      <h1>B</h1>
    </div>
  )
}
function C() {
  return (
    <div>
      <h1>C</h1>
    </div>
  )
}
function D() {
  return (
    <div>
      <h1>D</h1>
    </div>
  )
}
