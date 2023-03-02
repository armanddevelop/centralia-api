import { Schema } from "mongoose";

export interface IProduct {
    descripcion: string;
    categoria_id: Schema.Types.ObjectId;
    codigo?: string | null;
    sku?: string | null;
    imagenes: IProductImg[];
    etiquetas: IProductTag[];
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
