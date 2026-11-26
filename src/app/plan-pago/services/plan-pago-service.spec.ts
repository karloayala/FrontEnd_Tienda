import { TestBed } from '@angular/core/testing';
import { PlanPagoService } from './plan-pago-service';

describe('PlanPagoService', () => {
  let service: PlanPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
