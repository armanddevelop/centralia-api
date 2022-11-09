import Joi from "joi";

const nombre = Joi.string();
const categoria_id = Joi.number();
const calle = Joi.string().not().allow("");
const numero_ext = Joi.number();
const numero_int = Joi.string();
const codigo_postal = Joi.number();
const colonia = Joi.string().not().allow("");
const logo = Joi.any().allow("");
const fachada = Joi.any().allow("");
const codigo_recomendacion = Joi.string();
const telefono_negocio = Joi.number();
const calificacion = Joi.number();

export const businessSchema = Joi.object({
  nombre: nombre.required(),
  categoria_id: categoria_id.required(),
  calle: calle.required(),
  numero_ext: numero_ext.required(),
  numero_int: numero_int.required(),
  codigo_postal: codigo_postal.required(),
  colonia: colonia.required(),
  logo: logo,
  fachada: fachada,
  codigo_recomendacion: codigo_recomendacion.required(),
  telefono_negocio: telefono_negocio.required(),
  calificacion: calificacion.required(),
});
