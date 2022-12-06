import { Schema } from "mongoose";

export interface ICatalogProduct {
    img: string;
    precio: number;
    producto_id: Schema.Types.ObjectId;
}
export interface ICatalog {
    negocio_id: Schema.Types.ObjectId;
    productos: ICatalogProduct[];
}
