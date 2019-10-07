import { TestBed, async, inject } from '@angular/core/testing';

import { FuncionarioResolverGuard } from './funcionario-resolver.guard';

describe('FuncionarioResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionarioResolverGuard]
    });
  });

  it('should ...', inject([FuncionarioResolverGuard], (guard: FuncionarioResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
