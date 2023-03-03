import boom from "@hapi/boom";
import { Request, Response } from "express";
import { responseError, responseSuccess } from "../../helpers/responseManager";
import { ICommonResponse } from "../../interfaces/common-interface";
import { getMenu } from "./menu-store";

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const response: ICommonResponse | any = await getMenu(req);
        if (response.code === 2) {
            responseError(res, response, boom.internal());
        } else if (typeof response === "object") {
            response.code === 0
                ? responseSuccess(res, response, 200)
                : responseError(res, response, boom.badRequest());
        }
    } catch (error) {
        console.error("[getAllUsersError]: ", error);
        const response = {
            code: 1,
            message: "Hay un error inesperado, intenta de nuevo mas tarde",
        };
        return response;
    }
};
