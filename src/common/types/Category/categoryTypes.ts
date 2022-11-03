export interface Items  {
    classificationid: number,
    id: number,
    lastupdate: string,
    name: string,
    objectcount: number,
}

export type Response = { 
        data:{
            records:{
                items: Array<Items>
            }
        }
}

export type categoryState= {
    loading: boolean,
    categoryData: Array<Items>,
    error: any,
    selectedCategory: Items
}