import { Schema } from "mongoose";

export interface IProduct {
    categoria_id: Schema.Types.ObjectId;
    producto_id: Schema.Types.ObjectId;
    img: string;
    precio: number;
    codigo?: string | null;
    sku?: string | null;
    imagenes: IProductImg[];
    etiquetas: IProductTag[];
    descripcion: string;
}

export interface IProductImg {
    url: string;
    public: boolean;
}

export interface IProductTag {
    nombre: string;
}

export interface IProductCategory {
    nombre: string;
}
export interface IProducts {
    negocio_id: Schema.Types.ObjectId;
    productos: IProduct[];
}
