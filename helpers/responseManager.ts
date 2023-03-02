import { Response } from "express";
import { ICommonResponse } from "../interfaces/common-interface";

export const responseSuccess = (
    resp: Response,
    response: ICommonResponse,
    code: any
) => {
    resp.status(code).json({
        codigo: response.code,
        mesaje: response.message,
        data: response.data,
    });
};

export const responseError = (
    resp: Response,
    response: ICommonResponse,
    code: any | number
) => {
    const { output } = code;
    const { statusCode, payload } = output;
    resp.status(statusCode).json({
        codigo: response.code,
        mensage: `${response.message}: ${payload.message}`,
    });
};
