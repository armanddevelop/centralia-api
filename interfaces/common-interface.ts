import { Types } from "mongoose";

export interface ICommonResponse {
    code: number;
    message: string;
    data?: any;
}

export interface argumenstJWT {
    nombre: string;
    uid: Types.ObjectId;
    usuarioRol: number | undefined;
}

export interface file {
    name: string;
    maxCount: number;
}

export interface filesData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export interface imagesBusiness {
    logo: string;
    fachada: string;
    avatar: string;
}

export interface ICongifOptions {
    mainField: string;
    method: string;
    subField?: string;
    id?: string;
    retrieveFields?: Array<string>;
}
