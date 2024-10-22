import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  gestUser(id:number):Observable<any>{
    return this.http.get(this.apiURL+'/users/'+id, this.httpOptions).pipe(
      retry(1)
    );
  }

  getUsers():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
      retry(3)
    );
  }
}

