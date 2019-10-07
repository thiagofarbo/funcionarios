import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from './funcionario';
import { delay, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = `${environment.API}/funcionarios`;

  constructor(private http: HttpClient) { }

  loadById(id): Observable<any> {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}`).pipe(take(1));
  }

  salvarFuncionario(funcionario: object): Observable<object> {
    return this.http.post(this.API, funcionario).pipe(take(1));
  }

  deletarFuncinario(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  consultarFuncionario(id): Observable<object> {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<object> {
    return this.http.put(`${this.API}/${funcionario.id}`, funcionario).pipe(take(1));
  }

  save(funcionario) {
    if (funcionario.id) {
      return this.atualizarFuncionario(funcionario);
    }

    return this.salvarFuncionario(funcionario);
  }
}
