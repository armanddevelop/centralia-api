import Joi from "joi";

const negocio_id = Joi.string().not().allow("", "undefined");
const etiquetas = Joi.object().keys({
    etiqueta: Joi.string().allow("").empty(),
});
const imagenes = Joi.object().keys({
    url: Joi.string().allow(""),
    public: Joi.bool(),
});
const singleProduct = Joi.object().keys({
    producto_id: Joi.string().required(),
    img: Joi.string().required(),
    precio: Joi.number().required(),
    categoria_id: Joi.string().required(),
    codigo: Joi.string().allow(""),
    sku: Joi.string().allow(""),
    etiquetas: Joi.array().items(etiquetas),
    imagenes: Joi.array().items(imagenes),
    descripcion: Joi.string().required(),
});

const products = Joi.array().items(singleProduct);

export const productIdSchema = Joi.object({
    id: negocio_id.required(),
});

export const productSchema = Joi.object({
    negocio_id: negocio_id.required(),
    productos: products.required(),
});
