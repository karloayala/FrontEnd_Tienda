import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPedidos } from './view-pedidos';

describe('ViewPedidos', () => {
  let component: ViewPedidos;
  let fixture: ComponentFixture<ViewPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPedidos],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
