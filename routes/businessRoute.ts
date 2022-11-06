import express from "express";
import {
  createBusiness,
  getAllBusiness,
} from "../controllers/business/business-controller";
import { validationHandler } from "../middlewares/validationHandler";
import { businessSchema } from "../schemas/businessSchema";
import { upload } from "../middlewares/uploadFiles";

const routerBusiness = express.Router();

routerBusiness.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "fachada", maxCount: 1 },
  ]),
  validationHandler(businessSchema, "body"),
  createBusiness
);

routerBusiness.get("/", getAllBusiness);

export default routerBusiness;
