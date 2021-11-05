import Header from "./interfaces/Header";
import Product from "./interfaces/Product";
import ProductStore from "./interfaces/ProductStore";
import {Store} from "./interfaces/Store";

class ProductState extends Store<ProductStore> {
    protected data(): ProductStore {
        return {
            products: [],
            filters: [],
            header: {
                headerDescription: "",
                headerTitle: "",
            },
            currentFilter: "Alle",
            openProduct: undefined,
            watchList: [],
        };
    }

    init(products: Product[], filters: string[], header: Header) : void{
        this.state.products = products;
        this.state.filters = filters;
        this.state.header = header;
    }

    setFilter(filter : string): void{
        this.state.currentFilter = filter;
    }

    getFilteredProducts(): Product[]{
        if(this.state.currentFilter === "Alle"){
            return this.state.products;
        }

        let filteredProducts : Product[] = [];

        if(this.state.currentFilter === "Verfügbar"){
            this.state.products.forEach(product => {
                if(product.available){
                    filteredProducts.push(product);
                }
            });    
        }else if(this.state.currentFilter === "Vorgemerkt"){
            this.state.products.forEach(product => {
                if(this.state.watchList.includes(product.id)){
                    filteredProducts.push(product);
                }
            });  
        }

        return filteredProducts;
    }

    // can be used as a toogle
    openProductDetailPage(product: Product | undefined): void{
        this.state.openProduct = product;
    }

    addToWatchList(productID: number){
        this.state.watchList.push(productID);
        this.updateStorage();
    }

    setWatchList(list : number []) : void{
        this.state.watchList = list;
    }

    removeFromWatchList(productID: number){
        for(let i = 0; i < this.state.watchList.length; i++){
            if(this.state.watchList[i] === productID){
                this.state.watchList.splice(i, 1);
            }
        }
        this.updateStorage();
    }

    getProductOnWatchList(productID: number) : Boolean{
        return this.state.watchList.includes(productID);
    }

    updateStorage() : void{
        localStorage.setItem("watchList", JSON.stringify(this.state.watchList));
    }
}

export const productStore: ProductState = new ProductState()