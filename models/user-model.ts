import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user-interface";

const userSchema = new Schema<IUser>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono_personal: { type: Number, required: true },
    rol: { type: Number, required: true },
    avatar: { type: String, requiered: false },
    negocio_id: { type: Schema.Types.ObjectId, ref: "Business", alias: "negocio" },
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; delete ret.negocio_id }
});

const User = model<IUser>("User", userSchema);
export const models = { User };
