import Joi from "joi";

const negocio_id = Joi.string().not().allow("", "undefined");
const productos = Joi.array();

export const productSchema = Joi.object({
    id: negocio_id.required(),
    productos: productos,
});
