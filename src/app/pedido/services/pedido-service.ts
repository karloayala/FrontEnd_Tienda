import { Service } from '@angular/core';

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PedidoResponse } from '../models/pedido-response';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);

  private urlPedidos = `${environment.apiUrl}/pedidos`;

  consultarTodos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(this.urlPedidos);
  }

  consultarPorId(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(
      `${this.urlPedidos}/${id}`
    );
  }

  consultarPorDocumento(documento: string): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(
      `${this.urlPedidos}/documento/${encodeURIComponent(documento)}`
    );
  }

  consultarPorEstado(estado: string): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(
      `${this.urlPedidos}/estado/${estado}`
    );
  }

  consultarPorCliente(clienteId: number): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(
      `${this.urlPedidos}/cliente/${clienteId}`
    );
  }

  crearPedido(carritoId: number): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(
      `${this.urlPedidos}/crear-pedido/${carritoId}`,
      null
    );
  }
}
