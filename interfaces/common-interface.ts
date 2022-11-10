import { Types } from "mongoose";

export type ICommonResponse = {
  code: number;
  message: string;
  data?: any;
};

export type argumenstJWT = {
  nombre: string;
  uid: Types.ObjectId;
  usuarioRol: number | undefined;
};

export type JwtPayload = {
  uid: string;
  nombre: string;
  usuarioRol: number;
  fechaExpiracion: number;
  emitido: number;
};

export type file = {
  name: string;
  maxCount: number;
};

export type files = Array<file>;

export type filesData = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
