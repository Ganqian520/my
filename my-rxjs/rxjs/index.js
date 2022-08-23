export class Observable {

  constructor(cb) {
    this.cb = cb;
  }

  subscribe(observer) {
    if (observer instanceof Function) {
      observer = { next: observer }
    }
    this.cb(observer);
  }

  pipe(...operators) {
    if (operators.length == 0) {
      return this
    }
    return operators.reduce((prev, cur) => cur(prev), this)
  }
}

export function of(...params) {
  const observable = new Observable(observer => {
    params.forEach(v => observer.next(v))
  })
  return observable
}

export function map(func) {
  return observable => new Observable(observer => {
    observable.subscribe({
      next(v) {
        observer.next(func(v))
      }
    })
  })
}

export function delay(ms) {
  return observable => new Observable(observer => {
    observable.subscribe({
      next(v) {
        setTimeout(() => {
          observer.next(v)
        }, ms);
      }
    })
  })
}

export function fromEvent(target, eventName) {
  let emit
  target.addEventListener(eventName, e => {
    emit.next(e)
  })
  return new Observable(observer => {
    emit = observer
  })
}

export function merge(...observables) {
  return new Observable(observer => {
    observables.forEach(o => {
      o.subscribe({
        next(v) {
          observer.next(v)
        }
      })
    })
  })
}

export function mergeMap(func) {
  return observable => {
    let nextObservable
    observable.subscribe({
      next(v) {
        nextObservable = func(v)
      }
    })
    return nextObservable
  }
}