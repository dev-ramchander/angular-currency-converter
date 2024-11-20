// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HTTP_REQUESST } from './api.model';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'https://dummyjson.com'; // Replace with your API endpoint
    headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient) {}

  post<T>( data:HTTP_REQUESST ){
    return this.http.post<T>(`${this.apiUrl}${data.url}`, data.payload, {headers: data.headers}).pipe(
      map((response)=>{return response}),
      catchError(this.handleError)
    );
  }
  
  get<T>( data:HTTP_REQUESST ){
    return this.http.get<T>(`${data.url}`, {headers: data.headers}).pipe(
      map((response)=>{return response}),
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    // Customize error handling based on your requirements
    const {status, error:{message:errorMessage=null}={}, message } = error;
    console.warn(error)
    // return errorMessage || message;
    return throwError(error);

    console.log("==============================================================")
    console.log(error)
    console.log("==============================================================")
    // return {status, error:errorS.message};
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
