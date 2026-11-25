import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlanPagoRequest {
  tipoPago: string;
  cantCuotas: number;
  ventaId: number;
}

export interface PlanPagoResponse {
  id: number;
  tipoPago: string;
  cantCuotas: number;
  ventaId: number;
  cuotas: unknown[];
}

@Injectable({ providedIn: 'root' })
export class PlanPagoService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:8080/api/planes-pago';

  registrar(request: PlanPagoRequest): Observable<HttpResponse<PlanPagoResponse>> {
    return this.http.post<PlanPagoResponse>(this.url, request, { observe: 'response' });
  }
}