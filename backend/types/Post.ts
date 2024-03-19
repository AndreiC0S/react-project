export interface BasicPost  {
    id:number,
    titlu: string,
    continut?: string,
    categorie_id?: number,
    dataadaugare?: Date,
    user_id?: number,
    poza?:string,
}

export interface Post extends BasicPost {
    data_adaugare: any;
    id: number,
  }