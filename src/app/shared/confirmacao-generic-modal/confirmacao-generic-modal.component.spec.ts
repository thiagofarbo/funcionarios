import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoGenericModalComponent } from './confirmacao-generic-modal.component';

describe('ConfirmacaoGenericModalComponent', () => {
  let component: ConfirmacaoGenericModalComponent;
  let fixture: ComponentFixture<ConfirmacaoGenericModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacaoGenericModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoGenericModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
