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
import { file } from "../interfaces/common-interface";

const routerUser = express.Router();
const filesFields: file[] = [{ name: "avatar", maxCount: 1 }];
routerUser.post(
    "/",
    uploadFilesMiddleware(filesFields),
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
