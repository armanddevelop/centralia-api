import Joi from "joi";

const avatar = Joi.any().allow("");
const password = Joi.string().min(8).max(12).alphanum();
const apellido = Joi.string();
const nombre = Joi.string();
const telefono_personal = Joi.number().min(10);
const rol = Joi.number();
const negocio_id = Joi.string();
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net", "app"] },
});
const usuarioId = Joi.string().not().allow("");

export const userIdSchema = Joi.object({
  id: usuarioId.required(),
});

export const userSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  rol: rol.required(),
  password: password.required(),
  telefono_personal: telefono_personal.required(),
  avatar: avatar,
  negocio_id: negocio_id,
});
