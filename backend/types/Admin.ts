export interface Admin {
    id:number;
    username: string;
    password:string
    email: string;
    first_name?:string;
    last_name?:string;
    master?:string;
  }