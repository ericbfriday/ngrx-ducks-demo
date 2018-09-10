import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer } from './counter.reducer';
import { CounterSlice } from './counter.state';

export interface State {
  counter: CounterSlice;
}

export const reducers: ActionReducerMap<State> = {
  counter: reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
