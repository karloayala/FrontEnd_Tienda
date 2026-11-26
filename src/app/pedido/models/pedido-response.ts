
export type EstadoPedido =
  | 'PENDIENTE'
  | 'PAGADO'
  | 'ENVIADO'
  | 'CANCELADO';

export interface DetallePedidoResponse {
  id: number;
  pedidoId: number;
  fecha: string;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface PedidoResponse {
  id: number;
  fecha: string;
  total: number;
  estado: EstadoPedido;
  clienteId: number;
  clienteNombre: string;
  clienteDocumento: string;
  detalles: DetallePedidoResponse[];
  ventaId: number | null;
}
