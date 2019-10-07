import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule} from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { ListarFuncionariosComponent } from './listar-funcionarios/listar-funcionarios.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { DatePipe } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';
import { CurrencyMaskModule } from "ng2-currency-mask";


@NgModule({
  declarations: [
    AppComponent,
    CadastrarFuncionarioComponent,
    ListarFuncionariosComponent,
    CurrencyMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule ,
    BrowserModule,
    DialogModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ModalModule.forRoot(),
    MatRippleModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    CpfCnpjModule,
    CurrencyMaskModule
  ],
  exports: [
    CurrencyMaskDirective
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
