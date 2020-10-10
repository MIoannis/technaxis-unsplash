import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RootObject } from '../Interfaces/photos.int';

export interface SessionState {
   data: RootObject[];
}

export function createInitialState(): SessionState {
  return {
    data: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

