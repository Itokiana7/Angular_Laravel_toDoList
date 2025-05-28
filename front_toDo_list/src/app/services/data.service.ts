import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { Tache } from '../interfaces/tache';

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

  public getAllToDo():Observable<any>{
    return this._httClient.get<any>('http://127.0.0.1:8000/api/getToDo');
  }

  public addTodo(tache : Tache):Observable<any>{
    return this._httClient.post<any>('http://127.0.0.1:8000/api/addTache', tache);
  }
  public deleteTodo(id : number):Observable<any>{
    return this._httClient.delete<any>(`http://127.0.0.1:8000/api/deleteTache/${id}`);
  }

  public logout():Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`) 
    return this._httClient.post<any>('http://127.0.0.1:8000/api/logout', {}, {headers});
  }
}
