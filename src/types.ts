export interface Store {
    id: number;
    name: string;
  }
  
  export interface SKU {
    id: number;
    name: string;
    price: number;
    cost: number;
  }
  
  export interface PlanningData {
    store: string;
    sku: string;
    salesUnits: number;
    price: number;
    cost: number;
  }
  