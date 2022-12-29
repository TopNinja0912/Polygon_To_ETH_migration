export interface ProductItem
{
    name : string;
    description? : string;
    category? : string;
    image? : string;
    url : string;
}

export interface TodayProduct
{
    todayproductitems : ProductItem[];
    itemlimit ? : number;
}