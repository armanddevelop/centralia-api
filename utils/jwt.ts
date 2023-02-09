import jwt from "jsonwebtoken";
import { argumenstJWT } from "../interfaces/common-interface";
import { jwtPayloadDto } from "../interfaces/common.DTO";

export const generateJWT = async ({
    uid,
    nombre,
    usuarioRol,
}: argumenstJWT) => {
    const payload: jwtPayloadDto = { uid, nombre, usuarioRol };
    try {
        return await new Promise<string>((resolve, reject) => {
            jwt.sign(
                payload,
                process.env.SECRET_JWT_SEED as string,
                {
                    expiresIn: "2h",
                },
                (err, token) => {
                    if (err) {
                        console.error("[errorGenerateJWT]: ", err);
                        reject("No se pudo generar el token");
                    }
                    resolve(token as string);
                }
            );
        });
    } catch (err) {
        return "Algo salio mal tratando de generar el token, intenta de nuevo mas tarde";
    }
};
