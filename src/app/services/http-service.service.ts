import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  post (element: Object, endereco: any): Observable<Object> {
    var httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };


    return this.http.post<Object>(endereco, element, httpOptions)
  }

  get(endereco:any){
    return  this.http.get<Object>(endereco);
  }
  update (element: Object, endereco: any): Observable<Object> {
    var httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };


    return this.http.put<Object>(endereco, element, httpOptions)
  }

  delete (endereco: any): Observable<{}> {
    var httpOptions = {
       headers: new HttpHeaders({
           'Content-Type':  'application/json',
       })
    };
    return this.http.delete(endereco, httpOptions);
  }

}



