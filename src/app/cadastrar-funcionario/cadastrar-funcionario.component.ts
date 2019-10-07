import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../shared/alert-modal.service';
import { FuncionarioService } from './../funcionario.service';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Funcionario } from '../funcionario';
import { DatePipe } from '@angular/common';
 
import { CpfCnpjModule } from 'ng2-cpf-cnpj';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss'],
  preserveWhitespaces: true
})
export class CadastrarFuncionarioComponent implements OnInit {
  constructor(
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private datePipe: DatePipe
  ) {
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  isSubmitted = false;
  formCadastrar: FormGroup;
  newFormGroup: FormGroup;
  funcionario: Funcionario = new Funcionario();

  ngOnInit() {
    const funcionario = this.route.snapshot.data['funcionario'];

    this.formCadastrar = this.fb.group({
            id: [funcionario.id],
            nome: [funcionario.nome, [Validators.minLength(5), Validators.required]],
            cargo: [funcionario.cargo, [Validators.minLength(10), Validators.required]],
            cpf: [funcionario.cpf,  [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
            salario: [funcionario.salario, [Validators.required]],
            dataAdmissao: [funcionario.dataAdmissao, [Validators.required]],
            dataDemissao: [funcionario.dataDemissao],
            status: [funcionario.status, [Validators.required]]
          });
  }

  verificarErrosForm(field: string) {
    return this.formCadastrar.get(field).errors;
  }

  cadastrarFuncionario() {
    
    this.isSubmitted = true;

    this.newFormGroup = this.fortmatDate(this.formCadastrar);

    console.log(this.formCadastrar.value);
    if (this.formCadastrar.valid) {

      let msgSuccess = 'Funcionario cadastrado com sucesso!';
      let msgError = 'Erro ao cadastrar o funcionario, tente novamente!';

      if (this.formCadastrar.value.id) {
        msgSuccess = 'Funcionario atualizado com sucesso!';
        msgError = 'Erro ao atualizar funcionario, tente novamente!';
      }

      this.funcionarioService.save(this.formCadastrar.value).subscribe(
        success => {
          this.alertModalService.showAlertSuccess(msgSuccess);
          setTimeout(() => this.location.back(), 2000);
        },
        error => this.alertModalService.showAlertDanger(msgError)
      );
    }
  }

  private fortmatDate(formCadastrar): FormGroup{

    const dataAdmissaoFormatada = this.datePipe.transform(formCadastrar.value.dataAdmissao,"dd-MM-yyyy");
    const dataDemissaoFormatada = this.datePipe.transform(formCadastrar.value.dataDemissao,"dd-MM-yyyy");

    this.formCadastrar.value.dataAdmissao = dataAdmissaoFormatada;
    this.formCadastrar.value.dataDemissao = dataDemissaoFormatada;

    return formCadastrar;
  }
  cancelarCadastro() {
    this.location.back();
    this.formCadastrar.reset();
  }
}
