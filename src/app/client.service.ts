import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clients } from './components/json-form/json-form.component';

const API_URL = `${environment.apiURL}/Client`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  CreateClient(obj:Clients): Observable<{}> { 
    // let body = JSON.stringify(obj); 
    return this.http.post<any>(API_URL,obj);
  }

  GetAllClients(): Observable<any> {
    return this.http.get(API_URL);
  }

  DeleteClient(id:number): Observable<any> {
    // let body = JSON.stringify(obj);
    return this.http.delete(API_URL+'/'+id);
  }
}
