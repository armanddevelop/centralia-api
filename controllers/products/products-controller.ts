import fs from "fs";
import boom from "@hapi/boom";
import excelToJson from "convert-excel-to-json";
import { Request, Response } from "express";
import { responseError, responseSuccess } from "../../helpers/responseManager";
import { ICommonResponse } from "../../interfaces/common-interface";
import { getProductByIdStore } from "./products-store";

export const createSingeProduct = async (req: Request, res: Response) => {
    try {
        const { body } = req;
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
        if (
            fs.existsSync(
                "tmp/productos/1a394bb4-9295-4986-a5a8-a769d28a40ae.xlsx"
            )
        ) {
            console.log("entre !!!!!!!!!");
        }
        const fileJson = excelToJson({
            sourceFile:
                "tmp/productos/1a394bb4-9295-4986-a5a8-a769d28a40ae.xlsx",
            header: {
                rows: 3,
            },
            columnToKey: {
                A: "id",
                B: "descripcion",
                C: "precio",
            },
        });
        console.log("esto vale fileJson ", fileJson);
    } catch (error) {
        const response = {
            code: 1,
            message:
                "Hay un error al subir el archivo, intenta de nuevo mas tarde",
        };
        console.error("[uploadFileError]: ", error);
        return response;
    }
};
