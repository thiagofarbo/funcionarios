import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmacaoGenericModalComponent } from './confirmacao-generic-modal/confirmacao-generic-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmacaoGenericModalComponent],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmacaoGenericModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
