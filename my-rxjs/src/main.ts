import { of, pipe, Observable, map, Subscription } from 'rxjs';
// import {of,pipe,map} from '../rxjs/index'

const source = new Observable((observer) => {
  let i = 0;
  const timer = setInterval(() => {
    observer.next(++i);
  }, 1000);
});
// const subscription = source.subscribe({
//   next: (v) => console.log(v),
//   error: (err) => console.error(err),
//   complete: () => console.log('complete'),
// });



