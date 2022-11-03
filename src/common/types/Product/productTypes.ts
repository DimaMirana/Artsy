export interface Items  {
    primaryimageurl: any,
    title: any,
    provenance: any,
    objectid: number,
    id: number,
}

export interface ProductItem {
    primaryimageurl: any,
    title: any,
    provenance: any,
    objectid: number,
    id: number,
    quantity: 1
}

export type Response = { 
        data:{
            records:{
                items: Array<Items>
            }
        }
}

export type productState= {
    loading: boolean;
    productData: Array<ProductItem>;
    error: any;
}