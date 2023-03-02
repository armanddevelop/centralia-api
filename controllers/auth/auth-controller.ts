import boom from "@hapi/boom";
import { Request, Response } from "express";
import { responseError, responseSuccess } from "../../helpers/responseManager";
import { ICommonResponse } from "../../interfaces/common-interface";
import { authStore } from "./auth-store";

export const auth = async (req: Request, res: Response) => {
    try {
        const response: ICommonResponse | any = await authStore(req.body);
        switch (response.code) {
            case 0: // Authorization success
                response?.data && response?.data.token
                ? responseSuccess(res, response, 200)
                : responseError(res, response, boom.forbidden());
                break;
            case 1: // Invalid user/pass
                responseSuccess(res, response, 200);
                break;
            default: // Error
                responseError(res, response, boom.internal());
                break;
        }
    } catch (error) {
        console.error("[loginUserError]: ", error);
        const response = {
            code: 2,
            message: "Hay un error inesperado, intenta de nuevo mas tarde",
        };
        return response;
    }
};
