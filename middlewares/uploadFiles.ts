import multer from "multer";
import path from "path";
import Joi from "joi";
import fs from "fs";
import boom from "@hapi/boom";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { businessSchema } from "../schemas/businessSchema";

//setting options for multer
const validationFields = (schema: Joi.ObjectSchema<any>, body: any) => {
  const data = body;
  const { error } = schema.validate(data, { abortEarly: false });
  return error;
};
const files = [
  { name: "logo", maxCount: 1 },
  { name: "fachada", maxCount: 1 },
];

const storageConfiguration = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const { fieldname } = file;
    let folder: string = "public";
    if (fieldname === "avatar") {
      try {
        const path = `${folder}/${fieldname}s/${uuidv4()}`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      } catch (error) {
        console.error("[errorMulterCreateFolder]: ", error);
      }
    }
    if (fieldname === "logo" || fieldname === "fachada") {
      const { nombre } = req.body;
      const nameFolder = nombre.replace(/ /g, "_");
      const validation = validationFields(businessSchema, req["body"]);
      const path: string = `${folder}/${fieldname}s/${nameFolder}`;
      if (!validation) {
        try {
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          cb(null, path);
        } catch (error) {
          console.error("[errorMulterCreateFolder]: ", error);
        }
      } else {
        console.error(validation.details[0].message);
        const error = new Error(validation.details[0].message);
        cb(error, validation.details[0].message);
      }
    }
  },
  filename: (req: Request, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = uuidv4() + extension;
    cb(null, fileName);
  },
});

export const uploadFilesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = multer({ storage: storageConfiguration }).fields(files);
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      next(boom.badImplementation());
    } else if (error) {
      next(boom.badRequest());
    }
    next();
  });
};
