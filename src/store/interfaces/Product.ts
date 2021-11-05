export default interface Product extends Object {
    name: string,
    id: number,
    imageURL: string,
    available: boolean,
    releaseDate: number,
    description: string,
    longDescription: string,
    price: object,
    rating: number
}