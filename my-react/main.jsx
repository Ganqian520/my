import MyReact from './mreact/index.js'
import React from 'react' //引入jsx

// const element = MyReact.createElement(
//     'div',
//     {class: 'div'},
//     MyReact.createElement('h2',null,'h2'),
//     MyReact.createElement('h1',null,'h1')
// ) 

const start = value => {
  const element = (
    <div id='container'>
      <input onInput={e=>start(e.target.value)} value={value} />
      <h1>{value}</h1>
    </div>
  )
  MyReact.render(element,document.getElementById('app'))
}

start('1')


