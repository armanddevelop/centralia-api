import fs from "fs";
import boom from "@hapi/boom";
import excelToJson from "convert-excel-to-json";
import { Request, Response } from "express";
import { responseError, responseSuccess } from "../../helpers/responseManager";
import { ICommonResponse } from "../../interfaces/common-interface";
import { getProductByIdStore } from "./products-store";

export const createBusiness = async (req: Request, res: Response) => {
    try {
        // const response: ICommonResponse | any = await createBusinessStore(req);
        // if (response.code === 2) {
        //   responseError(res, response, boom.internal());
        // } else if (typeof response === "object") {
        //   response.code === 0
        //     ? responseSuccess(res, response, 200)
        //     : responseError(res, response, boom.badRequest());
        // }
    } catch (error) {
        console.error("[createBusinessError]: ", error);
        const response = {
            code: 1,
            message: "Hay un error inesperado, intenta de nuevo mas tarde",
        };
        return response;
    }
};

export const getAllBusiness = async (req: Request, res: Response) => {
    try {
        // const response: ICommonResponse | any = await getAllBusinessStore();
        // if (response.code === 2) {
        //   responseError(res, response, boom.internal());
        // } else if (typeof response === "object") {
        //   response.code === 0
        //     ? responseSuccess(res, response, 200)
        //     : responseError(res, response, boom.badRequest());
        // }
    } catch (error) {
        console.error("[getAllBusinessError]: ", error);
        const response = {
            code: 1,
            message: "Hay un error inesperado, intenta de nuevo mas tarde",
        };
        return response;
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const response: ICommonResponse | any = await getProductByIdStore(req);
        if (response.code === 2) {
            responseError(res, response, boom.internal());
        } else if (typeof response === "object") {
            response.code === 0
                ? responseSuccess(res, response, 200)
                : responseError(res, response, boom.badRequest());
        }
    } catch (error) {
        console.error("[getBusinessByIdError]: ", error);
        const response = {
            code: 1,
            message: "Hay un error inesperado, intenta de nuevo mas tarde",
        };
        return response;
    }
};

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const { body, files } = req;
    } catch (error) {}
};
