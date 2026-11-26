import { Routes } from '@angular/router';
import { Clientes } from './clientes/clientes';
import { Productos } from './productos/productos';
import { Pagos } from './plan-pago/pagos/pagos';
import { ViewPlanPago } from './plan-pago/view-plan-pago/view-plan-pago';
import { ViewPlanPagoNuevo } from './plan-pago/view-plan-pago-nuevo/view-plan-pago-nuevo';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: Clientes },
  { path: 'productos', component: Productos },
  { path: 'pagos', component: Pagos },


  {
    path: 'planes-pago',
    component: ViewPlanPago,
    title: 'Consultar planes de pago'
  },

  {
    path: 'planes-pago/nuevo',
    component: ViewPlanPagoNuevo,
    title: 'Registrar plan de pago'
  }

];