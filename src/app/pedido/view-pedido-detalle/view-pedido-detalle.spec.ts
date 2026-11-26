import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPedidoDetalle } from './view-pedido-detalle';

describe('ViewPedidoDetalle', () => {
  let component: ViewPedidoDetalle;
  let fixture: ComponentFixture<ViewPedidoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPedidoDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPedidoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
