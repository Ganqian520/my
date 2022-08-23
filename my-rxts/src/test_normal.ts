import { of, pipe, Observable, map, Subscription } from 'rxjs';

console.log('====normal====');



const source = new Observable((observer) => {
  let i = 0;
  // observer.next(1)
  // observer.next(2)
  // observer.error('err')
  // observer.complete()
});
const subscription = source.subscribe({next:console.log});

of('1-')
.pipe(

)
.subscribe()