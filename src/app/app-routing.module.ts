import { FuncionarioResolverGuard } from './guards/funcionario-resolver.guard';
import { ListarFuncionariosComponent } from './listar-funcionarios/listar-funcionarios.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  // { path: '', redirectTo: 'listar-funcionarios', pathMatch: 'full' },
  { path: '', component: ListarFuncionariosComponent },
  { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent,
  resolve: {
    funcionario: FuncionarioResolverGuard
   }
 },

  { path: 'atualizar-funcionario/:id', component: CadastrarFuncionarioComponent, resolve: {
    funcionario: FuncionarioResolverGuard
   } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
