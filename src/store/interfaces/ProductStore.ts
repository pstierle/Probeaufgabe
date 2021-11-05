import Header from "./Header";
import Product from "./Product";

export default interface ProductStore extends Object {
    products: Product[],
    filters: string[],
    header: Header,
    currentFilter: string,
    openProduct: Product | undefined,
    watchList: number[]
}