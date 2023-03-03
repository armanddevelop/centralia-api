import express from "express";
import {
    createProduct,
    getProductById,
    uploadFile,
} from "../controllers/products/products-controller";
import { file } from "../interfaces/common-interface";
import { uploadFilesMiddleware } from "../middlewares/uploadFiles";
import { validateJWT } from "../middlewares/validateJWT";
import { validationHandler } from "../middlewares/validationHandler";
import { productIdSchema, productSchema } from "../schemas/productSchema";

const routerProduct = express.Router();
const filesFields: file[] = [{ name: "productos", maxCount: 1 }];
routerProduct.get(
    "/:id",
    validateJWT,
    validationHandler(productIdSchema, "params"),
    getProductById
);
routerProduct.post(
    "/subir-archivo",
    validateJWT,
    uploadFilesMiddleware(filesFields),
    uploadFile
);
routerProduct.post(
    "/crear-producto",
    validateJWT,
    validationHandler(productSchema, "body"),
    createProduct
);
export default routerProduct;
