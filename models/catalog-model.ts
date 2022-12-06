import { model, Schema } from "mongoose";
import { ICatalogProduct, ICatalog } from "../interfaces/catalog-interface";

const productSchema = new Schema<ICatalogProduct>({
    img: { type: String, required: true },
    precio: { type: Number, required: true },
    producto_id: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        alias: "producto",
    },
});

const catalogSchema = new Schema<ICatalog>({
    negocio_id: { type: Schema.Types.ObjectId, required: true },
    productos: [productSchema],
});

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.producto_id;
    },
});

const Catalog = model<ICatalog>("Catalogo", catalogSchema);
export const models = { Catalog };
