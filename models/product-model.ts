import { model, Schema } from "mongoose";
import {
    IProduct,
    IProductImg,
    IProductTag,
    IProductCategory,
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
const productSchemaCategories = new Schema<IProductCategory>({
    nombre: { type: String, requiered: true },
});

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.categoria_id;
    },
});

productSchemaCategories.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const Product = model<IProduct>("Product", productSchema);
const ProductCategories = model<IProductCategory>(
    "ProductCategories",
    productSchemaCategories
);
export const models = { Product, ProductCategories };
