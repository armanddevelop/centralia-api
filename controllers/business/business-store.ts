import { IBusiness } from "../../interfaces/business-interface";
import { ICommonResponse } from "../../interfaces/common-interface";
import { models } from "../../models/business-model";
import { buildMultiplePaths } from "../../helpers/buildPath";

export const createBusinessStore = async (req: { [index: string]: any }) => {
  try {
    const { Business } = models;
    const { body, files } = req;
    let response: ICommonResponse | undefined;
    const dataToSave = buildMultiplePaths(body, files);
    const business = new Business<IBusiness>(dataToSave);
    const responseDB = await business.save();

    if (responseDB) {
      return (response = {
        code: 0,
        message: "Negocio creado",
      });
    }
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
    const { Business } = models;

    let response: ICommonResponse | undefined;
    const responseDB = await Business.find();
    if (responseDB) {
      return (response = {
        code: 0,
        message: "Operacion exitosa",
        data: responseDB,
      });
    }
  } catch (error: any) {
    console.error("[getAllBusinessStoreFail]: ", error.message);
    const response = {
      code: 2,
      message: "Algo salio mal al obtener los negocios",
    };

    return response;
  }
};
