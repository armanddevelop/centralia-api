import { argumenstJWT, imagesBusiness } from "./common-interface";

export interface argumenstJWTDto
    extends Omit<argumenstJWT, "nombre" | "uid" | "usuarioRol"> {
    fechaExpiracion: number;
    emitido: number;
}
export interface jwtPayloadDto extends Required<argumenstJWT> {}
export interface pathsDto extends Partial<imagesBusiness> {}
