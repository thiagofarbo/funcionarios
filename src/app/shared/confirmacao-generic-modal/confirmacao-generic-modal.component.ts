import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmacao-generic-modal',
  templateUrl: './confirmacao-generic-modal.component.html',
  styleUrls: ['./confirmacao-generic-modal.component.scss']
})
export class ConfirmacaoGenericModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() mensagem: string;
  @Input() cancelar = 'Cancelar';
  @Input() confirmacaoOk = 'Sim';

  confirmacao: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmacao = new Subject();
  }

  confirmacaoModal() {
    this.confirmarAndFechar(true);
  }

  fecharModal() {
    this.confirmarAndFechar(false);
  }

  private confirmarAndFechar(value: boolean) {
    this.confirmacao.next(value);
    this.bsModalRef.hide();
  }
}
