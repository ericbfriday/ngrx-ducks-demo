import { Component, Inject } from '@angular/core';
import { Ducks } from '@co-it/ngrx-ducks/lib/core/types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './reducers';
import { Counter } from './reducers/counter.actions';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter <small>{{ isLoading$ | async }}</small></h1>

    <p><strong>Value</strong> {{ count$ | async }}</p>

    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
  `
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  count$: Observable<number>;

  constructor(
    private _store: Store<State>,
    @Inject(Counter) private counter: Ducks<Counter>
  ) {
    this.counter.loadAll.dispatch();

    this.count$ = this._store.pipe(select(state => state.counter.count));
    this.isLoading$ = this._store.pipe(
      select(state => state.counter.isLoading)
    );
  }

  increment() {
    this.counter.increment(1000);
  }

  decrement() {
    this.counter.decrement(1000);
  }
}
