// import Didact from './mreact/index'
// const { useState,createElement,render } = Didact
/** jsx createElement */
import React,{useState,useEffect} from 'react';
import {render} from 'react-dom';


function App() {
  return <div>
    <Counter />
    <A name={'brother'} />
  </div>
}
function Counter() {
  const [state, setState] = useState(1)
  return (<div>
    <button onClick={() => setState(c => c + 1)}>
      Count: {state}
    </button>
    <A name={'child'} />
  </div>)
}
function A({ name }) {
  console.log(name);
  return <h1>{name}</h1>
}
debugger
render(<App />, document.getElementById("root"))

