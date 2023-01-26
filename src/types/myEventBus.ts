import {ReplaySubject} from 'rxjs'

export interface MyEvent {
  label:string;
  payload:any;
}

export default class MyEventBus<T> extends ReplaySubject<T> {
    public clearBuffer(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._buffer = []
    }
  }
  