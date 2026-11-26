
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PlanPagoRequest } from '../models/plan-pago-request';
import { PlanPagoResponse } from '../models/plan-pago-response';

@Injectable({
  providedIn: 'root'
})
export class PlanPagoService {

  private http = inject(HttpClient);

  private url = `${environment.apiUrl}/planes-pago`;

  // Consultar un plan de pago por su ID
  consultarPorId(id: number): Observable<PlanPagoResponse> {
    return this.http.get<PlanPagoResponse>(`${this.url}/${id}`);
  }

  // Registrar un plan de pago
  registrar(request: PlanPagoRequest): Observable<PlanPagoResponse | null> {
    return this.http.post<PlanPagoResponse | null>(
      this.url,
      request
    );
  }
}
