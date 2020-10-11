import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PhotosRootObject } from '../Interfaces/photos.int';
import { SearchRootObject } from '../Interfaces/search.photos.int';

export interface SessionState {
   data: PhotosRootObject[];
   searchData: SearchRootObject;
}

export function createInitialState(): SessionState {
  return {
    data: null,
    searchData: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

