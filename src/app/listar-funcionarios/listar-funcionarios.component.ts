import { HttpClient } from '@angular/common/http';
import { AlertModalService } from './../shared/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../funcionario';
import { DataSource } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ConfirmacaoGenericModalComponent } from '../shared/confirmacao-generic-modal/confirmacao-generic-modal.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss'],
  preserveWhitespaces: true
})
export class ListarFuncionariosComponent implements OnInit {

  private form: FormGroup;
  private pages: Array<number>;
  private deleteModalRef: BsModalRef;
  private funcionariosArray: Array<any>;
  private funcionarioSelecionado: Funcionario;
  funcionarios: Funcionario[];
  funcionario: Funcionario = new Funcionario();
  private modals: any[] = [];
  @ViewChild('modalDeletarFuncionario', { static: true }) modalDeletarFuncionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private http: HttpClient,
    private modalService: BsModalService,
  ) {}
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar os funcionários');
  }

  updateFuncionario(id) {
    this.router.navigate(['atualizar-funcionario', id], { relativeTo: this.route  });

    this.funcionarioService.consultarFuncionario(id).subscribe(data =>{

      this.funcionarios = data['content'];

    });
  }

  ngOnInit() {

    this.form = this.fb.group({
      id: [null],
      nome: [null],
      cargo: [null],
      cpf: [null]
  });

    this.funcionarioService.listarFuncionarios().subscribe(
      data => {
        this.funcionariosArray = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      erro => {
        this.handleError();
      }
    );
  }

  deletarFuncionario(funcionario) {
    this.funcionarioSelecionado = funcionario;
    const resposta = this.alertService.showConfirm('Confirmação', 'Tem certeza que quer deletar o funcionário ?');

    resposta.subscribe(response => {
      if (response) {
        console.log('Yes clicked');
        this.funcionarioService.deletarFuncinario(funcionario.id).subscribe(
          sucesso => {
          this.alertService.showAlertSuccess('Funcionário deletado com sucesso');
          setTimeout(() => this.atualizarListaFuncionario(), 1000);
          },
          erro => {
          this.alertService.showAlertDanger('Erro ao deletar o funcionário. Tente novamente mais tarde.');
          }
        ); }
    });
  }

  atualizarFuncionario(funcionario: Funcionario) {
    this.funcionarioService
      .atualizarFuncionario(funcionario)
      .subscribe(data => {
        console.log(data);
        this.alertService.showAlertSuccess('Funcionário atualizado com sucesso');
        setTimeout(() => this.atualizarListaFuncionario(), 1000);
      },
      erro => {
        this.alertService.showAlertDanger('Erro ao atualizar o funcionário. Tente novamente mais tarde.');
      });
  }
  atualizarListaFuncionario() {

    this.funcionarioService.listarFuncionarios().subscribe(
      data => {
        this.funcionariosArray = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      catchError(error => {
        console.error(error);
        this.handleError();
        return EMPTY;
      })
    );
  }
}
