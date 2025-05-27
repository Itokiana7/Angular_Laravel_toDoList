import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class DataService {
_httClient = inject(HttpClient);
  constructor() { }

  public register(register : Register) : Observable<any>{
      return this._httClient.post<any>('http://127.0.0.1:8000/api/register', register);
  }

  public login(login : Login) : Observable<any>{
      return this._httClient.post<any>('http://127.0.0.1:8000/api/login', login);
  }
}
