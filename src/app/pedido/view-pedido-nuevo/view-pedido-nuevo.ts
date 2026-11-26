import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-view-pedido-nuevo',
  styleUrl: './view-pedido-nuevo.css',
  templateUrl: './view-pedido-nuevo.html',
})
export class ViewPedidoNuevo {
  @Input() cargando = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() crear = new EventEmitter<number>();

  carritoId: number | null = null;

  mensajeError = '';

  cerrarModal(): void {
    if (!this.cargando) {
      this.cerrar.emit();
    }
  }

  crearPedido(): void {

    if (
      this.carritoId === null ||
      !Number.isInteger(this.carritoId) ||
      this.carritoId <= 0
    ) {
      this.mensajeError = 'Ingresa un ID de carrito válido.';
      return;
    }

    this.mensajeError = '';
    this.crear.emit(this.carritoId);
  }
}
