export interface Orders {
    id_orders:number;
    country: string;
    address:string;
    items: string;
    paid_card:number;
    comments?: string
    status?:string
  }