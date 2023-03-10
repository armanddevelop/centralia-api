import { Schema } from "mongoose";
import { IBaseInterface } from "./common-interface";

export interface IBusiness extends IBaseInterface {
    categoria_id: Schema.Types.ObjectId | null;
    direccion: string;
    logo?: string;
    fachada?: string;
    codigo_recomendacion?: string;
    telefono_negocio?: number | null;
    calificacion?: number | null;
}

export interface IBusinessCategories extends IBaseInterface {}
