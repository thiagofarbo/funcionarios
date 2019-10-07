import { FuncionarioService } from './../funcionario.service';
import { Funcionario } from './../funcionario';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioResolverGuard implements Resolve<any> {

  constructor(private funcionarioService: FuncionarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {

    if (route.params && route.params['id']) {
      return this.funcionarioService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      cargo: null,
      cpf: null,
      salario: null,
      dataAdmissao: null,
      dataDemissao: null,
      status: null
    });
  }
}
