import express from "express";
import { getProductById } from "../controllers/products/products-controller";
import { validateJWT } from "../middlewares/validateJWT";
import { validationHandler } from "../middlewares/validationHandler";
import { productSchema } from "../schemas/productSchema";

const routerProduct = express.Router();

routerProduct.get(
    "/:id",
    validateJWT,
    validationHandler(productSchema, "params"),
    getProductById
);

export default routerProduct;
