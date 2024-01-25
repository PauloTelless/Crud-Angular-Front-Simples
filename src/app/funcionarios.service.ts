import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from './models/funcionario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  url = 'https://localhost:7141/api/Funcionarios';

  constructor(private httpClient: HttpClient) {}

  GetFuncionarios(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url);
  }

  GetFuncionarioId(id: number): Observable<Funcionario> {
    const apiUrl = `${this.url}/${id}`;
    return this.httpClient.get<Funcionario>(apiUrl);
  }

  PostFuncionario(funcionario: Funcionario): Observable<any> {
    return this.httpClient.post<Funcionario>(this.url, funcionario, httpOptions);
  }

  PutFuncionario(funcionario: Funcionario): Observable<any> {
    return this.httpClient.put<Funcionario>(this.url, funcionario, httpOptions);
  }

  DeleteFuncionario(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.httpClient.delete<number>(apiUrl, httpOptions);
  }
}
