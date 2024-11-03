export interface TotalPricesByOrder {
    orderId: number; // ID de la orden
    _sum: {
      price: number | null; // Suma de los precios de los items, puede ser null si no hay items
    };
  }