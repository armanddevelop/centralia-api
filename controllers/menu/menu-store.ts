import jwt from "jsonwebtoken";
import { querys } from "../../helpers/querySearch";
import {
    ICommonResponse,
    ICongifOptions,
} from "../../interfaces/common-interface";
import { models } from "../../models/menu-model";

export const getMenu = async (req: any) => {
    try {
        if (req.headers && req.headers["x-token"]) {
            const xToken: string = req.headers["x-token"];
            const decoded: any = jwt.verify(
                xToken,
                process.env.SECRET_JWT_SEED as string
            );
            let type: string = "";

            switch (decoded.usuarioRol) {
                case 1:
                    type = "provider";
                    break;
                case 2:
                    type = "business";
                    break;
                default:
                    type = "guest";
                    break;
            }

            const { Menu } = models;
            let response: ICommonResponse | undefined;
            const responseDB = await Menu.findOne({ type: type });
            if (responseDB) {
                return (response = {
                    code: 0,
                    message: "Operacion exitosa",
                    data: responseDB,
                });
            }
        }
    } catch (error: any) {
        console.error("[getMenuStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al obtener menu",
        };

        return response;
    }
};

