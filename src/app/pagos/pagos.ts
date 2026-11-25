import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PlanPagoService } from '../services/plan-pago';

interface PlanRegistrado {
  ventaId: number;
  tipoPago: string;
  cantCuotas: number;
  alContado: boolean;
}

interface DetalleVenta {
  producto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface Venta {
  id: number;
  fecha: string;
  total: number;
  detalles: DetalleVenta[];
}

interface Cuota {
  numeroCuota: number;
  monto: number;
  fechaVencimiento: Date;
  estado: string;
}

interface PlanRegistrado {
  ventaId: number;
  tipoPago: string;
  cantCuotas: number;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos {

  private planPagoService = inject(PlanPagoService);

guardando = false;
errorMensaje: string | null = null;
  // Ventas ficticias
  ventas: Venta[] = [
    {
      id: 1,
      fecha: '2026-11-10',
      total: 3500,
      detalles: [
        {
          producto: 'Laptop Lenovo IdeaPad',
          cantidad: 1,
          precioUnitario: 2800,
          subtotal: 2800
        },
        {
          producto: 'Mouse Logitech inalámbrico',
          cantidad: 2,
          precioUnitario: 150,
          subtotal: 300
        },
        {
          producto: 'Audífonos HyperX',
          cantidad: 1,
          precioUnitario: 400,
          subtotal: 400
        }
      ]
    },
    {
      id: 2,
      fecha: '2026-11-12',
      total: 2400,
      detalles: [
        {
          producto: 'Monitor Samsung 24 pulgadas',
          cantidad: 1,
          precioUnitario: 950,
          subtotal: 950
        },
        {
          producto: 'Teclado mecánico Redragon',
          cantidad: 1,
          precioUnitario: 350,
          subtotal: 350
        },
        {
          producto: 'Tablet Samsung Galaxy',
          cantidad: 1,
          precioUnitario: 1100,
          subtotal: 1100
        }
      ]
    },
    {
      id: 3,
      fecha: '2026-11-15',
      total: 1800,
      detalles: [
        {
          producto: 'Smartphone Xiaomi Redmi',
          cantidad: 1,
          precioUnitario: 1500,
          subtotal: 1500
        },
        {
          producto: 'Cargador USB-C',
          cantidad: 2,
          precioUnitario: 150,
          subtotal: 300
        }
      ]
    }
  ];

  // Datos del plan
  ventaId: number | null = null;
  cantCuotas = 3;

  // Modales
  modalDetalleAbierto = false;
  modalConfirmacionAbierto = false;
  modalExitoAbierto = false;

  // Plan registrado
  planRegistrado: PlanRegistrado | null = null;

  // Control de selección
  mostrarConfiguracion = false;

  // Obtener la venta seleccionada
  get ventaSeleccionada(): Venta | undefined {
    return this.ventas.find(venta => venta.id === this.ventaId);
  }

  // Total de unidades de la venta
  get totalUnidades(): number {
    return this.ventaSeleccionada?.detalles.reduce(
      (total, detalle) => total + detalle.cantidad,
      0
    ) ?? 0;
  }

  // Validar cantidad de cuotas
  get cantidadCuotasValida(): boolean {
    return Number.isInteger(this.cantCuotas) &&
      this.cantCuotas >= 1 &&
      this.cantCuotas <= 36;
  }

  // Generar cuotas igual que el backend (en céntimos)
get cuotasGeneradas(): Cuota[] {
  const venta = this.ventaSeleccionada;

  if (!venta || !this.cantidadCuotasValida) {
    return [];
  }

  const totalCentimos = Math.round(venta.total * 100);
  const base = Math.floor(totalCentimos / this.cantCuotas);
  const extra = totalCentimos % this.cantCuotas;

  const cuotas: Cuota[] = [];

  for (let i = 1; i <= this.cantCuotas; i++) {
    const centimos = base + (i <= extra ? 1 : 0);

    cuotas.push({
      numeroCuota: i,
      monto: centimos / 100,
      fechaVencimiento: this.generarFecha(i),
      estado: 'PENDIENTE'
    });
  }

  return cuotas;
}

// Fecha de la venta + N meses (igual que plusMonths de Java)
generarFecha(numeroCuota: number): Date {
  const venta = this.ventaSeleccionada;
  const fecha = venta ? new Date(venta.fecha) : new Date();
  const dia = fecha.getDate();

  fecha.setDate(1);
  fecha.setMonth(fecha.getMonth() + numeroCuota);

  // Java recorta al último día del mes (31 ene + 1 mes = 28 feb)
  const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
  fecha.setDate(Math.min(dia, ultimoDia));

  return fecha;
}


  // Mostrar nombres de los primeros 3 productos
  mostrarProductos(detalles: DetalleVenta[]): string {
    return detalles
      .slice(0, 3)
      .map(detalle => detalle.producto)
      .join(', ');
  }


  // Seleccionar una venta
  seleccionarVenta(venta: Venta): void {
    this.ventaId = venta.id;
    this.cantCuotas = 3;
    this.mostrarConfiguracion = true;
  }

  // Regresar a la selección de ventas
  volverVentas(): void {
    this.mostrarConfiguracion = false;
    this.ventaId = null;
    this.cantCuotas = 3;
  }

  // Abrir modal de detalle
  abrirModalDetalle(): void {
    this.modalDetalleAbierto = true;
  }

  cerrarModalDetalle(): void {
    this.modalDetalleAbierto = false;
  }

  // Abrir modal de confirmación
  abrirModalConfirmacion(form: NgForm): void {
    if (!this.ventaSeleccionada || !this.cantidadCuotasValida) {
      return;
    }

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.modalConfirmacionAbierto = true;
  }

 cerrarModalConfirmacion(): void {
  this.modalConfirmacionAbierto = false;
  this.errorMensaje = null;
}

  // Confirmar registro del plan
 confirmarRegistro(): void {
  const venta = this.ventaSeleccionada;
  if (!venta || !this.cantidadCuotasValida || this.guardando) {
    return;
  }

    const cantCuotas = this.cantCuotas;
  const request = {
    tipoPago: cantCuotas === 1 ? 'CONTADO' : 'CUOTAS',
    cantCuotas,
    ventaId: venta.id
  };

  this.guardando = true;
  this.errorMensaje = null;

  this.planPagoService.registrar(request).subscribe({
    next: (res) => {
      this.planRegistrado = {
        ventaId: venta.id,
        tipoPago: request.tipoPago,
        cantCuotas,
        alContado: res.status === 204   // 204 = venta pasó a PAGADO_AL_CONTADO
      };
      this.guardando = false;
      this.modalConfirmacionAbierto = false;
      this.modalExitoAbierto = true;
    },
    error: (err) => {
      this.guardando = false;
      this.errorMensaje =
        err.error?.mensaje ?? err.error?.message ?? 'No se pudo registrar. Intenta nuevamente.';
    }
  });
}
}