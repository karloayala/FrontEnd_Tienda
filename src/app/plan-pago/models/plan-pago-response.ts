
export interface PlanPagoResponse {
  id: number;
  tipoPago: string;
  cantCuotas: number;
  ventaId: number;
  cuotas: CuotaResponse[];
}

export interface CuotaResponse {
  id: number;
  numeroCuota: number;
  monto: number;
  fechaVencimiento: string;
  estado: string;
  planPagoId: number;
  pagoId: number | null;
}
