import {  } from './gframe/index'

const container = document.getElementById('app')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
container.appendChild(canvas)

App()

/*
组件树的构造方式
接收子组件
计算组件位置，大小
*/

function App() {
  Column({
    chilren: [
      Box(),
      Text()
    ]
  })
}

function Text({ text='这是一段文字' }) {
  ctx.fillText(text,100,100)
  console.log(1);
}
function Box({w=300,h=100}) {
  ctx.fillRect(w,h)
}
function Column({chilren=[]}) {
  chilren.forEach(f => {
    f()
  })
}

