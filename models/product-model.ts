import { model, Schema } from "mongoose";
import {
    IProduct,
    IProductImg,
    IProductTag,
} from "../interfaces/product-interface";

const ImagenSchema = new Schema<IProductImg>({
    url: { type: String, required: true },
    public: { type: Boolean, required: true },
});
const EtiquetaSchema = new Schema<IProductTag>({
    nombre: { type: String, required: true },
});

const productSchema = new Schema<IProduct>({
    descripcion: { type: String, required: true },
    categoria_id: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategories",
        alias: "categoria",
    },
    codigo: { type: String, required: false },
    sku: { type: String, required: false },
    imagenes: [ImagenSchema],
    etiquetas: [EtiquetaSchema],
});

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.categoria_id;
    },
});

const Product = model<IProduct>("Product", productSchema);
export const models = { Product };
