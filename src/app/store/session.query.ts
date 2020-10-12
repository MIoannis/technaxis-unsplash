import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

  constructor(protected store: SessionStore) {
    super(store);
  }
  searchPhotos$ = this.select(store => store.searchData);
  photos$ = this.select(store => store.data);
  page$ = this.select(store => store.page);
  searchPage$ = this.select(store => store.searchPage);
  searchValue$ = this.select(store => store.searchValue);
}
