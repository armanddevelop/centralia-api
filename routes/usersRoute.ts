import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users/users-controller";

import { validationHandler } from "../middlewares/validationHandler";
import { validateJWT } from "../middlewares/validateJWT";
import { userSchema, userIdSchema } from "../schemas/userSchema";
import { upload } from "../middlewares/uploadFiles";

const routerUser = express.Router();

routerUser.post(
  "/",
  upload.single("avatar"),
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
