import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoResponse } from '../models/pedido-response';

@Component({
  imports: [CommonModule],
  selector: 'app-view-pedido-detalle',
  styleUrl: './view-pedido-detalle.css',
  templateUrl: './view-pedido-detalle.html',
})
export class ViewPedidoDetalle {
  @Input() pedido: PedidoResponse | null = null;

  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }
}
