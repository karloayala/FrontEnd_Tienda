import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPlanPagoNuevo } from './view-plan-pago-nuevo';

describe('ViewPlanPagoNuevo', () => {
  let component: ViewPlanPagoNuevo;
  let fixture: ComponentFixture<ViewPlanPagoNuevo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPlanPagoNuevo],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlanPagoNuevo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
