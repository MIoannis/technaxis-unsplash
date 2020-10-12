import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SessionStore } from './session.store';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { PhotosRootObject } from '../Interfaces/photos.int';
import { SearchRootObject } from '../Interfaces/search.photos.int';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,
              private store: SessionStore) { }

  static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error status ${error.status}`
      );
    }
    return throwError(error);
  }

  updateLike(store): void {
    this.store.update({data: store});
  }

  updateSearchLike(store): void {
    this.store.update({searchData: store});
  }

  updateData(searchValue: string): void {
    this._searchData(searchValue).subscribe(searchData => this.store.update({searchData}));
  }

  _searchData(searchValue: string): Observable<any> {
    return this.http.get<SearchRootObject>(`https://api.unsplash.com/search/photos?client_id=H8bic_D8k_LS4QHOfhBCVrBSABASJmJOCJdjyZ9eQf4&per_page=30&query=${searchValue}&page=1`)
      .pipe(catchError(SessionService.handleError));
  }

  initialUpdateData(): void {
    this._getData().subscribe(data => this.store.update({data}));
  }

  _getData(): Observable<any> {
    return this.http.get<PhotosRootObject>(`https://api.unsplash.com/photos?client_id=H8bic_D8k_LS4QHOfhBCVrBSABASJmJOCJdjyZ9eQf4&per_page=30&page=1`)
      .pipe(catchError(SessionService.handleError));
  }
}
