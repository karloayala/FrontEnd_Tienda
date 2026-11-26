import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PedidoService } from '../services/pedido-service';
import { PedidoResponse } from '../models/pedido-response';

import { ViewPedidoDetalle } from '../view-pedido-detalle/view-pedido-detalle';
import { ViewPedidoNuevo } from '../view-pedido-nuevo/view-pedido-nuevo';

type TipoBusqueda = 'todos' | 'id' | 'documento' | 'estado' | 'cliente';

@Component({
  imports: [CommonModule, FormsModule, ViewPedidoDetalle, ViewPedidoNuevo],
  selector: 'app-view-pedidos',
  styleUrl: './view-pedidos.css',
  templateUrl: './view-pedidos.html',
})

export class ViewPedidos implements OnInit {

  private pedidoService = inject(PedidoService);
  private cdr = inject(ChangeDetectorRef);

  pedidos: PedidoResponse[] = [];

  pedidoSeleccionado: PedidoResponse | null = null;

  tipoBusqueda: TipoBusqueda = 'todos';
  valorBusqueda = '';

  mostrarModalDetalle = false;
  mostrarModalCrear = false;

  cargando = false;
  creando = false;

  mensajeError = '';
  mensajeExito = '';

  ngOnInit(): void {
    this.consultarPedidos();
  }
  
  get totalPendientes(): number {
  return this.pedidos.filter(p => p.estado === 'PENDIENTE').length;
  }

  get totalPagados(): number {
    return this.pedidos.filter(p => p.estado === 'PAGADO').length;
  }
  // Consultar todos los pedidos
  consultarPedidos(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.pedidoService.consultarTodos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.pedidos = [];
        this.cargando = false;
        this.mensajeError =
          err.error?.message || 'No se pudieron cargar los pedidos.';
        this.cdr.markForCheck();
      }
    });
  }

  // Buscar utilizando los endpoints disponibles
  buscarPedidos(): void {
    const valor = this.valorBusqueda.trim();

    if (this.tipoBusqueda === 'todos') {
      this.consultarPedidos();
      return;
    }

    if (!valor) {
      this.mensajeError = 'Ingresa un valor para realizar la búsqueda.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    let peticion: Observable<PedidoResponse | PedidoResponse[]>;

    switch (this.tipoBusqueda) {
      case 'id':
        if (!/^\d+$/.test(valor)) {
          this.mensajeError = 'El ID debe ser un número válido.';
          this.cargando = false;
          return;
        }

        peticion = this.pedidoService.consultarPorId(Number(valor));
        break;

      case 'documento':
        peticion = this.pedidoService.consultarPorDocumento(valor);
        break;

      case 'estado':
        peticion = this.pedidoService.consultarPorEstado(valor.toUpperCase());
        break;

      case 'cliente':
        if (!/^\d+$/.test(valor)) {
          this.mensajeError = 'El ID del cliente debe ser numérico.';
          this.cargando = false;
          return;
        }

        peticion = this.pedidoService.consultarPorCliente(Number(valor));
        break;
    }

    peticion.subscribe({
      next: (data: PedidoResponse | PedidoResponse[]) => {
        this.pedidos = Array.isArray(data) ? data : [data];

        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.pedidos = [];
        this.cargando = false;

        this.mensajeError =
          err.error?.message || 'No se encontraron pedidos.';

        this.cdr.markForCheck();
      }
    });
  }

  // Abrir modal de detalle
  verDetalle(id: number): void {
    this.mensajeError = '';

    this.pedidoService.consultarPorId(id).subscribe({
      next: (pedido) => {
        this.pedidoSeleccionado = pedido;
        this.mostrarModalDetalle = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.mensajeError =
          err.error?.message || 'No se pudo consultar el pedido.';
        this.cdr.markForCheck();
      }
    });
  }

  // Cerrar modal de detalle
  cerrarModalDetalle(): void {
    this.mostrarModalDetalle = false;
    this.pedidoSeleccionado = null;
  }

  // Abrir modal de creación
  abrirModalCrear(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
  }

  // Crear pedido desde el carrito
  crearPedido(carritoId: number): void {
    this.creando = true;
    this.mensajeError = '';

    this.pedidoService.crearPedido(carritoId).subscribe({
      next: (pedido) => {
        this.creando = false;
        this.mostrarModalCrear = false;
        this.mensajeExito = `Pedido #${pedido.id} creado correctamente.`;

        this.consultarPedidos();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.creando = false;
        this.mensajeError =
          err.error?.message || 'No se pudo crear el pedido.';
        this.cdr.markForCheck();
      }
    });
  }

  obtenerClaseEstado(estado: string): string {
    const clases: Record<string, string> = {
      PENDIENTE: 'estado-pendiente',
      PAGADO: 'estado-pagado',
      ENVIADO: 'estado-enviado',
      CANCELADO: 'estado-cancelado'
    };

    return clases[estado] || '';
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-PE');
  }

  limpiarBusqueda(): void {
    this.tipoBusqueda = 'todos';
    this.valorBusqueda = '';
    this.mensajeError = '';
    this.consultarPedidos();
  }
}
