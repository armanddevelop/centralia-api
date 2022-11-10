import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users/users-controller";

import { validationHandler } from "../middlewares/validationHandler";
import { validateJWT } from "../middlewares/validateJWT";
import { userSchema, userIdSchema } from "../schemas/userSchema";
import { uploadFilesMiddleware } from "../middlewares/uploadFiles";

const routerUser = express.Router();

routerUser.post(
  "/",
  uploadFilesMiddleware("createUser"),
  validationHandler(userSchema, "body"),
  createUser
);

routerUser.get("/", validateJWT, getAllUsers);

routerUser.get(
  "/:id",
  validateJWT,
  validationHandler(userIdSchema, "params"),
  getUserById
);

export default routerUser;
