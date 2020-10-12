import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PhotosRootObject } from '../Interfaces/photos.int';
import { Result } from '../Interfaces/search.photos.int';

export interface SessionState {
   data: PhotosRootObject[];
   searchData: Result[];
   searchValue: string
   page: number;
   searchPage: number;
}

export function createInitialState(): SessionState {
  return {
    data: null,
    searchData: null,
    searchValue: '',
    page: 1,
    searchPage: 1
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

