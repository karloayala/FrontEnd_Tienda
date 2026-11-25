import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClienteRequest {
  nombre: string;
  documento: string;
  email: string;
}

export interface ClienteResponse {
  id: number;
  nombre: string;
  documento: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'https://fluffy-trout-5gxxvq774jj9hpxpv-8080.app.github.dev/api/clientes';

  constructor(private http: HttpClient) {}

  registrarCliente(cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.apiUrl, cliente);
  }

  buscarPorDocumento(documento: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/documento/${documento}`);
  }
}