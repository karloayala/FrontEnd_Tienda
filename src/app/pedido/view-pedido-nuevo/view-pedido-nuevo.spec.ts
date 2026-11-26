import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPedidoNuevo } from './view-pedido-nuevo';

describe('ViewPedidoNuevo', () => {
  let component: ViewPedidoNuevo;
  let fixture: ComponentFixture<ViewPedidoNuevo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPedidoNuevo],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPedidoNuevo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
