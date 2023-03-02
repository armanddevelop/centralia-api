import { Model } from "mongoose";
import { ICongifOptions } from "../interfaces/common-interface";

export const querys = (modelName: Model<any>, options: ICongifOptions) => {
    return new Promise((resolve, reject) => {
        const { method, mainField, id, retrieveFields, subField } = options;
        const populateOptions: any = !subField
            ? mainField
            : {
                  path: mainField,
                  populate: {
                      path: subField || "",
                  },
              };
        if (method === "getAll") {
            modelName
                .find()
                .populate(populateOptions)
                .exec((error: any, populated: any) => {
                    if (error) {
                        reject(`[getAllError]:  ${error}`);
                    }
                    resolve(populated);
                });
        } else if (method === "getById") {
            modelName
                .findById({ _id: id }, retrieveFields)
                .populate(populateOptions)
                .exec((error: any, populated: any) => {
                    if (error) {
                        reject(`[getByIdError]:  ${error}`);
                    }
                    resolve(populated);
                });
        }
    });
};
