import express from "express";
import {
    createBusiness,
    getAllBusiness,
    getBusinessById,
} from "../controllers/business/business-controller";
import { validationHandler } from "../middlewares/validationHandler";
import { businessSchema, negocioIdSchema } from "../schemas/businessSchema";
import { uploadFilesMiddleware } from "../middlewares/uploadFiles";
import { validateJWT } from "../middlewares/validateJWT";
import { file } from "../interfaces/common-interface";

const routerBusiness = express.Router();
const filesFields: file[] = [
    { name: "logo", maxCount: 1 },
    { name: "fachada", maxCount: 1 },
];
routerBusiness.post(
    "/",
    uploadFilesMiddleware(filesFields),
    validationHandler(businessSchema, "body"),
    createBusiness
);

routerBusiness.get("/", getAllBusiness);
routerBusiness.get(
    "/:id",
    validateJWT,
    validationHandler(negocioIdSchema, "params"),
    getBusinessById
);

export default routerBusiness;
