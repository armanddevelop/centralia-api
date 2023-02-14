import express from "express";
import {
    getProductById,
    uploadFile,
} from "../controllers/products/products-controller";
import { file } from "../interfaces/common-interface";
import { uploadFilesMiddleware } from "../middlewares/uploadFiles";
import { validateJWT } from "../middlewares/validateJWT";
import { validationHandler } from "../middlewares/validationHandler";
import { productSchema } from "../schemas/productSchema";

const routerProduct = express.Router();
const filesFields: file[] = [{ name: "productos", maxCount: 1 }];
routerProduct.get(
    "/:id",
    validateJWT,
    validationHandler(productSchema, "params"),
    getProductById
);
routerProduct.post(
    "/subir-archivo",
    validateJWT,
    uploadFilesMiddleware(filesFields),
    uploadFile
);
export default routerProduct;
