import express from "express";
import {
  createBusiness,
  getAllBusiness,
} from "../controllers/business/business-controller";
import { validationHandler } from "../middlewares/validationHandler";
import { businessSchema } from "../schemas/businessSchema";
import { uploadFilesMiddleware } from "../middlewares/uploadFiles";

const routerBusiness = express.Router();
routerBusiness.post(
  "/",
  uploadFilesMiddleware,
  validationHandler(businessSchema, "body"),
  createBusiness
);

routerBusiness.get("/", getAllBusiness);

export default routerBusiness;
