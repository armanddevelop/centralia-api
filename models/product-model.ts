import { model, Schema } from "mongoose";
import {
    IProduct,
    IProducts,
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
    categoria_id: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategories",
        alias: "categoria",
    },
    producto_id: { type: Schema.Types.ObjectId },
    img: { type: String, required: false },
    precio: { type: Number, required: true },
    codigo: { type: String, required: false },
    sku: { type: String, required: false },
    etiquetas: [EtiquetaSchema],
    imagenes: [ImagenSchema],
    descripcion: { type: String, required: true },
});

const productsSchema = new Schema<IProducts>({
    negocio_id: { type: Schema.Types.ObjectId },
    productos: [productSchema],
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
const Products = model<IProducts>("BusinessProducts", productsSchema);
const ProductCategories = model<IProductCategory>(
    "ProductCategories",
    productSchemaCategories
);
export const models = { Product, ProductCategories, Products };
