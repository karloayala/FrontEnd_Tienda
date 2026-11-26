
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

