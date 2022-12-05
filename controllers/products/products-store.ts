import { IBusiness } from "../../interfaces/business-interface";
import {
    ICommonResponse,
    ICongifOptions,
} from "../../interfaces/common-interface";
import { models } from "../../models/product-model";
import { buildMultiplePaths } from "../../helpers/buildPath";
import { querys } from "../../helpers/querySearch";

export const createBusinessStore = async (req: { [index: string]: any }) => {
    try {
        // const { Business } = models;
        // const { body, files } = req;
        // let response: ICommonResponse | undefined;
        // const dataToSave = buildMultiplePaths(body, files);
        // const business = new Business<IBusiness>(dataToSave);
        // const responseDB = await business.save();
        // if (responseDB) {
        //   return (response = {
        //     code: 0,
        //     message: "Negocio creado",
        //   });
        // }
    } catch (error: any) {
        console.error("[createBusinessStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al crear el negocio",
        };

        return response;
    }
};

export const getAllBusinessStore = async () => {
    try {
        // const { Business } = models;
        // let response: ICommonResponse | undefined;
        // const responseDB = await querys(Business, {
        //   method: "getAll",
        //   mainField: "categoria_id",
        // });
        // if (responseDB) {
        //   return (response = {
        //     code: 0,
        //     message: "Operacion exitosa",
        //     data: responseDB,
        //   });
        // }
    } catch (error: any) {
        console.error("[getAllBusinessStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al obtener los negocios",
        };

        return response;
    }
};

export const getProductsByBusinessIdStore = async (request: any) => {
    try {
        const { Product } = models;
        const { id } = request.params;
        const configFieldOptions: ICongifOptions = {
            method: "getById",
            mainField: "categoria_id",
            id,
        };
        const responseDB = await Product.findById({ _id: id });
        let response: ICommonResponse | undefined;
        if (responseDB) {
            return (response = {
                code: 0,
                message: "Operacion exitosa",
                data: responseDB,
            });
        } else {
            return (response = {
                code: 2,
                message: "Algo salio mal intenta de nuevo mas tarde",
            });
        }
    } catch (error: any) {
        console.error("[getProductsByBusinessIdStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al obtener el negocio por id",
        };

        return response;
    }
};
