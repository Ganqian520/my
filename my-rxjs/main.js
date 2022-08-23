import { of, map, delay,fromEvent,merge,mergeMap} from './rxjs/index'

console.log('====me====');

of('1-')
// fromEvent(document.querySelector('#button'),'click')
  .pipe(
    map(v => v+'1-'),
    delay(1000),
    mergeMap(v =>
      merge(
        of(v+'1-'),
        of(v+'2-')
      )
    )
  )
  .subscribe(console.log)
