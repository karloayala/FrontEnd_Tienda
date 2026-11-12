import { Routes } from '@angular/router';
import { Clientes } from './clientes/clientes';
import { Productos } from './productos/productos';
import { Pagos } from './pagos/pagos';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: Clientes },
  { path: 'productos', component: Productos },
  { path: 'pagos', component: Pagos },
  { path: '**', redirectTo: 'clientes' }
];