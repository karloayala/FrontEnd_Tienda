import { TestBed } from '@angular/core/testing';
import { PlanPago } from './plan-pago';

describe('PlanPago', () => {
  let service: PlanPago;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPago);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
