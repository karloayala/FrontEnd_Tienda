import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanPagoService } from '../services/plan-pago-service';
import { PlanPagoResponse } from '../models/plan-pago-response';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-view-plan-pago',
  styleUrl: './view-plan-pago.css',
  templateUrl: './view-plan-pago.html',
})

export class ViewPlanPago {

  private service = inject(PlanPagoService);
  private cdr = inject(ChangeDetectorRef);

  id: number | null = null;

  plan: PlanPagoResponse | null = null;

  cargando = false;
  error = '';

  consultar(): void {

    if (this.id === null || this.id <= 0) {
      this.error = 'Ingresa un ID válido.';
      this.plan = null;
      return;
    }

    this.cargando = true;
    this.error = '';
    this.plan = null;

    this.service.consultarPorId(this.id).subscribe({

      next: (data) => {
        this.plan = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },

      error: (err) => {
        this.error = err.error?.message
          || 'No se pudo consultar el plan de pago.';

        this.cargando = false;
        this.cdr.markForCheck();
      }

    });
  }
}