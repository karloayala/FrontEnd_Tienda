import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

// Estructura de los productos de una venta
interface DetalleVenta {
  producto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

// Estructura de una venta
interface Venta {
  id: number;
  fecha: string;
  detalles: DetalleVenta[];
  total: number;
}

// Estructura de una cuota generada
interface Cuota {
  numeroCuota: number;
  monto: number;
  fechaVencimiento: string;
  estado: string;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-pagos',
  styleUrl: './pagos.css',
  templateUrl: './pagos.html',
})
export class Pagos {
  // Ventas ficticias para simular el backend
  ventas: Venta[] = [
    {
      id: 1001,
      fecha: '2026-11-10',
      detalles: [
        {
          producto: 'Whey Protein',
          cantidad: 2,
          precioUnitario: 189.90,
          subtotal: 379.80
        },
        {
          producto: 'Creatina',
          cantidad: 1,
          precioUnitario: 99.90,
          subtotal: 99.90
        },
        {
          producto: 'Omega 3',
          cantidad: 1,
          precioUnitario: 69.90,
          subtotal: 69.90
        }
      ],
      total: 549.60
    },
    {
      id: 1002,
      fecha: '2026-11-11',
      detalles: [
        {
          producto: 'Mass Gainer',
          cantidad: 1,
          precioUnitario: 159.90,
          subtotal: 159.90
        },
        {
          producto: 'BCAA',
          cantidad: 2,
          precioUnitario: 119.90,
          subtotal: 239.80
        }
      ],
      total: 399.70
    },
    {
      id: 1003,
      fecha: '2026-11-12',
      detalles: [
        {
          producto: 'Glutamina',
          cantidad: 2,
          precioUnitario: 89.90,
          subtotal: 179.80
        },
        {
          producto: 'Multivitamínico',
          cantidad: 1,
          precioUnitario: 59.90,
          subtotal: 59.90
        }
      ],
      total: 239.70
    }
  ];

  // Datos del formulario
  tipoPago: string = 'CUOTAS';
  ventaId: number | null = null;
  cantCuotas: number = 1;

  // Obtener la venta seleccionada
  get ventaSeleccionada(): Venta | undefined {
    return this.ventas.find(v => v.id === this.ventaId);
  }

  // Calcular automáticamente las cuotas
  get cuotasGeneradas(): Cuota[] {

    const venta = this.ventaSeleccionada;

    if (!venta || this.tipoPago !== 'CUOTAS') {
      return [];
    }

    if (!Number.isInteger(this.cantCuotas) ||
        this.cantCuotas < 1 ||
        this.cantCuotas > 36) {
      return [];
    }

    const totalCentimos = Math.round(venta.total * 100);

    const montoBase = Math.floor(totalCentimos / this.cantCuotas);

    const cuotas: Cuota[] = [];

    for (let i = 1; i <= this.cantCuotas; i++) {

      // Distribuir los céntimos restantes en la última cuota
      const montoCentimos = i === this.cantCuotas
        ? totalCentimos - montoBase * (this.cantCuotas - 1)
        : montoBase;

      cuotas.push({
        numeroCuota: i,
        monto: montoCentimos / 100,
        fechaVencimiento: this.generarFecha(i),
        estado: 'PENDIENTE'
      });
    }

    return cuotas;
  }

  // Generar fecha de vencimiento mensual
  generarFecha(numeroCuota: number): string {

    const fecha = new Date();

    // Primer vencimiento: mismo día del siguiente mes
    const dia = fecha.getDate();

    fecha.setDate(1);
    fecha.setMonth(fecha.getMonth() + numeroCuota);

    const ultimoDia = new Date(
      fecha.getFullYear(),
      fecha.getMonth() + 1,
      0
    ).getDate();

    fecha.setDate(Math.min(dia, ultimoDia));

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const diaFecha = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${diaFecha}T09:00:00`;
  }
  
  get cantidadCuotasValida(): boolean {
    return Number.isInteger(this.cantCuotas) &&
         this.cantCuotas >= 1 &&
         this.cantCuotas <= 36 &&
         this.cuotasGeneradas.length === this.cantCuotas;
  }

  get totalUnidades(): number {
    return this.ventaSeleccionada?.detalles.reduce(
      (total, detalle) => total + detalle.cantidad,
      0
    ) ?? 0;
  }

  // Enviar formulario
  onSubmit(form: NgForm) {

    const venta = this.ventaSeleccionada;

    if (!venta) {
      return;
    }

    const obj = {
      tipoPago: this.tipoPago,
      cantCuotas: this.tipoPago === 'CONTADO' ? 1 : this.cantCuotas,
      ventaId: venta.id,
      cuotas: this.tipoPago === 'CONTADO'
        ? null
        : this.cuotasGeneradas
    };

    console.log('JSON DEL REQUEST:');
    console.log(JSON.stringify(obj, null, 2));

    // Limpiar formulario
    form.resetForm();

    this.tipoPago = 'CUOTAS';
    this.ventaId = null;
    this.cantCuotas = 1;
  }

}
