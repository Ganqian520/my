export function pipe() {

}

export function of() {

}

export function map() {

}

export class Observable {
  cb: (subscriber:Subscriber) => void;
  constructor(cb: (subscriber:Subscriber) => void){
    this.cb = cb
  }
  subscrible(param: Function | Subscriber) {
    let subscriber: Subscriber
    if(param instanceof Function) {
       subscriber= {
        next : param,
        error: Function,
        complete: Function
      }
    }else {
      subscriber = param
    }
    this.cb(subscriber)
  }
}

export interface Subscriber {
  next: Function
  error: Function
  complete: Function
}

export class Subscription {
    
}