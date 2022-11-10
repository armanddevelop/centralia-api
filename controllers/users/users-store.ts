import { encryptPassword } from "../../helpers/encrypt";
import { fieldsToRetrive } from "../../interfaces/auth-interface";
import { ICommonResponse } from "../../interfaces/common-interface";
import { IUser } from "../../interfaces/user-interface";
import { models } from "../../models/user-model";
import { buildFields } from "../../helpers/buildFields";
import { buildSinglePath } from "../../helpers/buildPath";

export const createUserStore = async (req: { [index: string]: any }) => {
  try {
    const { User } = models;
    const { body, file } = req;
    const { email } = body;
    let response: ICommonResponse = {
      code: 0,
      message: "",
    };
    const isUniqueEmail = await User.findOne({ email });
    if (!isUniqueEmail) {
      const encryptData = encryptPassword(body);
      if (!encryptData?.negocio_id) encryptData.negocio_id = null;
      const dataToSave = buildSinglePath(body, file);
      const user = new User<IUser>(dataToSave);
      const responseDB = await user.save();
      if (responseDB) {
        return (response = {
          code: 0,
          message: "Operacion exitosa",
        });
      }
    } else {
      return (response = {
        code: 1,
        message: "El email de usuario ya existe",
      });
    }
  } catch (error: any) {
    console.error("[createUserStoreFail]: ", error.message);
    const response = {
      code: 2,
      message: "Algo salio mal al crear el usuario",
    };

    return response;
  }
};

export const getAllUsersStore = async () => {
  try {
    const { User } = models;

    let response: ICommonResponse | undefined;
    const responseDB = await User.find();
    if (responseDB) {
      return (response = {
        code: 0,
        message: "Operacion exitosa",
        data: responseDB,
      });
    }
  } catch (error: any) {
    console.error("[getAllUsersStoreFail]: ", error.message);
    const response = {
      code: 2,
      message: "Algo salio mal al obtener los usuarios",
    };

    return response;
  }
};

export const getUserByIdStore = async (request: any) => {
  try {
    const { id } = request.params;
    const { User } = models;
    const fields = buildFields(fieldsToRetrive, "password");
    const responseDB = await User.findById({ _id: id }, fields);
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
    console.error("[getAllUsersStoreFail]: ", error.message);
    const response = {
      code: 2,
      message: "Algo salio mal al obtener los usuarios",
    };

    return response;
  }
};
