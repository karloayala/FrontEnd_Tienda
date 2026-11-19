import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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

  // Ventas ficticias
  ventas: Venta[] = [
    {
      id: 1001,
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
      id: 1002,
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
      id: 1003,
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

  // Generar cuotas automáticamente
  get cuotasGeneradas(): Cuota[] {
    const venta = this.ventaSeleccionada;

    if (!venta || !this.cantidadCuotasValida) {
      return [];
    }

    const montoBase = Math.floor(
      (venta.total / this.cantCuotas) * 100
    ) / 100;

    const cuotas: Cuota[] = [];

    let montoAcumulado = 0;

    for (let i = 1; i <= this.cantCuotas; i++) {
      const monto = i === this.cantCuotas
        ? Number((venta.total - montoAcumulado).toFixed(2))
        : montoBase;

      montoAcumulado += monto;

      cuotas.push({
        numeroCuota: i,
        monto: Number(monto.toFixed(2)),
        fechaVencimiento: this.generarFecha(i),
        estado: 'PENDIENTE'
      });
    }

    return cuotas;
  }

  // Mostrar nombres de los primeros 3 productos
  mostrarProductos(detalles: DetalleVenta[]): string {
    return detalles
      .slice(0, 3)
      .map(detalle => detalle.producto)
      .join(', ');
  }

  // Calcular fechas de vencimiento mensuales
  generarFecha(numeroCuota: number): Date {
    const fecha = new Date();
    fecha.setDate(1);
    fecha.setMonth(fecha.getMonth() + numeroCuota);
    return fecha;
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
  }

  // Confirmar registro del plan
  confirmarRegistro(): void {
    const venta = this.ventaSeleccionada;

    if (!venta || !this.cantidadCuotasValida) {
      return;
    }

    this.planRegistrado = {
      ventaId: venta.id,
      tipoPago: 'CUOTAS',
      cantCuotas: this.cantCuotas
    };

    console.log('Plan de pagos registrado:', {
      venta,
      tipoPago: 'CUOTAS',
      cuotas: this.cuotasGeneradas
    });

    this.modalConfirmacionAbierto = false;
    this.modalExitoAbierto = true;
  }

  // Cerrar modal de éxito y reiniciar
  cerrarModalExito(form: NgForm): void {
    this.modalExitoAbierto = false;
    this.planRegistrado = null;
    this.volverVentas();
    form.resetForm();
    this.cantCuotas = 3;
  }
}