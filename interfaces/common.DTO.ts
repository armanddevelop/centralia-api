import { argumenstJWT } from "./common-interface";
export interface argumenstJWTDto
    extends Omit<argumenstJWT, "nombre" | "uid" | "usuarioRol"> {
    fechaExpiracion: number;
    emitido: number;
}
export interface jwtPayloadDto extends Required<argumenstJWT> {}
