import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmacaoGenericModalComponent } from './confirmacao-generic-modal/confirmacao-generic-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: "root"
})
export class AlertModalService {

  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dissmissTimeout?: number) {

    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dissmissTimeout) {
      setTimeout(() => bsModalRef.hide(), dissmissTimeout);
    }

  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 4000);
  }

  showConfirm(titulo: string, mensagem: string, confirmacaoOk?: string, cancelar?: string) {
      const bsModalRef: BsModalRef = this.modalService.show(ConfirmacaoGenericModalComponent);
      bsModalRef.content.titulo = titulo;
      bsModalRef.content.mensagem = mensagem;

      if (confirmacaoOk) {
        bsModalRef.content.okTxt = confirmacaoOk;
      }

      if ( cancelar) {
        bsModalRef.content.cancelTxt = cancelar;
      }
    //    return (<ConfirmacaoGenericModalComponent>bsModalRef.content).confirmacao;
      return (bsModalRef.content as ConfirmacaoGenericModalComponent).confirmacao;
    }
}
