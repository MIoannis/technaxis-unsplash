import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RootObject } from '../Interfaces/single.photo.int';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


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

  updateData(): void {
    this._getData().subscribe(data => this.store.update({data}));
  }

  _getData(): Observable<any> {
    return this.http.get<RootObject>('https://api.unsplash.com/photos?client_id=H8bic_D8k_LS4QHOfhBCVrBSABASJmJOCJdjyZ9eQf4&per_page=30')
      .pipe(catchError(SessionService.handleError));
  }
}
