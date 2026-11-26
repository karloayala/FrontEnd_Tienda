import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PlanPagoService } from '../services/plan-pago-service';
import { PlanPagoRequest } from '../models/plan-pago-request';
import { PlanPagoResponse } from '../models/plan-pago-response';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-view-plan-pago-nuevo',
  styleUrl: './view-plan-pago-nuevo.css',
  templateUrl: './view-plan-pago-nuevo.html',
})
export class ViewPlanPagoNuevo {

  private service = inject(PlanPagoService);
  private cdr = inject(ChangeDetectorRef);

  plan: PlanPagoRequest = {
    cantCuotas: 1,
    ventaId: 0
  };

  resultado: PlanPagoResponse | null = null;

  mensaje = '';
  error = '';
  guardando = false;

  guardar(): void {

    this.mensaje = '';
    this.error = '';
    this.resultado = null;

    if (!this.plan.ventaId || this.plan.ventaId <= 0) {
      this.error = 'Ingresa un ID de venta válido.';
      return;
    }

    if (
      !Number.isInteger(this.plan.cantCuotas) ||
      this.plan.cantCuotas <= 0
    ) {
      this.error = 'La cantidad de cuotas debe ser mayor que cero.';
      return;
    }

    if (this.plan.cantCuotas <= 0) {
      this.error = 'El pago debe tener una cuota.';
      return;
    }
    this.guardando = true;

    this.service.registrar(this.plan).subscribe({

      next: (data) => {

        this.guardando = false;

        if (data) {
          this.resultado = data;
          this.mensaje = 'Plan de pago registrado correctamente.';
        } else {
          this.mensaje = 'Venta registrada como pagada al contado. No se generó un plan de cuotas.';
        }

        this.cdr.markForCheck();
      },

      error: (err) => {

        this.guardando = false;

        this.error = err.error?.message
          || 'No se pudo registrar el plan de pago.';

        this.cdr.markForCheck();
      }

    });
  }
}