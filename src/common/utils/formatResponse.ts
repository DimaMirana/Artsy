import {Items,Response} from "../types/Category/categoryTypes";
import * as Product from "../types/Product/productTypes";
/**
 * FORMAT THE CATEGORY TYPES RESPONSE HERE
 * @param {*} response 
 * @returns {*} state storable data 
 */
export const formatCategoryResponse = (response: Response): Array<Items> => {
    let data = response.data.records;
    // @ts-ignore
    return data;
}

/**
 * FORMAT THE PRODUCT RESPONSE HERE
 * @param {*} response 
 * @returns {*} state storable data 
 */
export const formatProductResponse = (response: Response): Array<Product.Items> => {
    let data = response.data.records;
    let temp: { primaryimageurl: any; title: any; provenance: any; objectid: any; id: any; quantity: number; }[] = [];
    // @ts-ignore
    data.map((item,index)=>{
        temp.push({
            primaryimageurl: item.primaryimageurl,
            title: item.title,
            provenance: item.provenance,
            objectid: item.objectid,
            id: item.id,
            quantity: 1
        })
    })
    // @ts-ignore
    return temp;
}