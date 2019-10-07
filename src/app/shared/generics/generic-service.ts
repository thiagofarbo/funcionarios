import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { delay, tap, take } from 'rxjs/operators';

export class GenericService<T> {

  constructor(protected http: HttpClient, private API_URL) { }

  loadById(id): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`).pipe(take(1));
  }

  listarFuncionarios(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}`).pipe(take(1));
    // .pipe(delay(2000),
    // tap(console.log));
  }

  salvarFuncionario(funcionario: object): Observable<object> {
    return this.http.post(this.API_URL, funcionario).pipe(take(1));
  }

  deletarFuncinario(id): Observable<object> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

  consultarFuncionario(id): Observable<object> {
    return this.http.get(`${this.API_URL}/${id}`).pipe(take(1));
  }

  atualizarFuncionario(funcionario: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${funcionario}`, funcionario).pipe(take(1));
  }

  save(funcionario) {
    if (funcionario.id) {
      return this.atualizarFuncionario(funcionario);
    }

    return this.salvarFuncionario(funcionario);
  }
}
