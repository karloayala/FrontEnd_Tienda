import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPlanPago } from './view-plan-pago';

describe('ViewPlanPago', () => {
  let component: ViewPlanPago;
  let fixture: ComponentFixture<ViewPlanPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPlanPago],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlanPago);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
