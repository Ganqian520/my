import {Observable,of,pipe,map} from '../rxjs/index'

console.log('====me====');

let observable = new Observable(observer => {
  console.log('cb');
  observer.next('next')
  observer.error('error')
}).subscrible({
  next(e){
    console.log(e)
  },
  error(e){
    console.log(e)
  },
  complete(e) {
    console.log(e)
  }
})
