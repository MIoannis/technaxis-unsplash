import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SessionStore } from './session.store';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { PhotosRootObject } from '../Interfaces/photos.int';
import { Result } from '../Interfaces/search.photos.int';


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

  updateData(searchValue: string, pageNumber: number): void {
    this._searchData(searchValue, pageNumber).subscribe(searchData => this.store.update({searchData: searchData.results}));
  }

  _searchData(searchValue: string, pageNumber: number): Observable<any> {
    return this.http.get<Result>(`https://api.unsplash.com/search/photos?client_id=H8bic_D8k_LS4QHOfhBCVrBSABASJmJOCJdjyZ9eQf4&per_page=30&query=${searchValue}&page=${pageNumber}`)
      .pipe(catchError(SessionService.handleError));
  }

  initialUpdateData(pageNumber: number): void {
    this._getData(pageNumber).subscribe(data => this.store.update({data}));
  }

  _getData(pageNumber: number): Observable<any> {
    return this.http.get<PhotosRootObject>(`https://api.unsplash.com/photos?client_id=H8bic_D8k_LS4QHOfhBCVrBSABASJmJOCJdjyZ9eQf4&per_page=30&page=${pageNumber}`)
      .pipe(catchError(SessionService.handleError));
  }

  concatStore(pageNumber: number): void {
    this._getData(pageNumber).subscribe(
      data => this.store.update(
        state => ({
          data: state.data.concat(data)
        })));
  }

  concatSearchStore(searchValue: string, pageNumber: number): void {
    this._searchData(searchValue, pageNumber).subscribe(
      data => this.store.update(
        state => ({
          searchData: state.searchData.concat(data.results)
        })));
  }

  updatePage(pageNumber: number): void {
    this.store.update({page: pageNumber});
  }

  updateSearchPage(pageNumber: number): void {
    this.store.update({searchPage: pageNumber});
  }

  updateSearchValue(value: string): void {
    this.store.update({searchValue: value});
  }
}
