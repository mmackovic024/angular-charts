import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private URL = 'https://scraping-demo.herokuapp.com/api/all';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    return this.http.get<object[]>(this.URL);
  }
}
