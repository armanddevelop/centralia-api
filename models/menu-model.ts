import { model, Schema } from "mongoose";
import { IMenu } from "../interfaces/menu-interface";

const menuSchema = new Schema<IMenu>({
    type: { type: String, required: true },
    items: [
        { label: { type: String, required: true } },
        { route: { type: String, required: true } },
    ],
});

menuSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const Menu = model<IMenu>("MenuItem", menuSchema);
export const models = { Menu };

