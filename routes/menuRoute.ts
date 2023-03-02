import express from "express";

import { getMenuItems } from "../controllers/menu/menu-controller";
import { validateJWT } from "../middlewares/validateJWT";

const routerMenu = express.Router();

routerMenu.get("/", validateJWT, getMenuItems);
export default routerMenu;
