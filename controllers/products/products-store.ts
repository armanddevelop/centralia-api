import {
    ICommonResponse,
    ICongifOptions,
} from "../../interfaces/common-interface";
import { models } from "../../models/product-model";
import { querys } from "../../helpers/querySearch";
import { IProduct, IProducts } from "../../interfaces/product-interface";

export const createProductStore = async (req: { [index: string]: any }) => {
    try {
        const { Products } = models;
        const {
            body: { negocio_id, productos },
        } = req;
        let responseDB: any;
        let response: ICommonResponse | undefined;
        const bussinesProductsDb = await Products.findOne({ negocio_id });
        if (bussinesProductsDb && bussinesProductsDb.productos.length !== 0) {
            productos.forEach(async (newProduct: IProduct, idx: number) => {
                const document = await Products.findOneAndUpdate(
                    {
                        "productos.producto_id": newProduct.producto_id,
                    },
                    {
                        $set: {
                            "productos.$": newProduct,
                        },
                    },
                    { returnOriginal: false }
                );
                if (!document) {
                    bussinesProductsDb.productos.push(productos[idx]);
                    await bussinesProductsDb.save();
                }
            });
            return (response = {
                code: 0,
                message: "Productos creados",
            });
        } else if (bussinesProductsDb) {
            if (bussinesProductsDb.productos.length === 0) {
                bussinesProductsDb.productos = productos;
                responseDB = await bussinesProductsDb.save();
            }
        } else if (!bussinesProductsDb) {
            const dataToSave = { negocio_id, productos };
            const products = new Products<IProducts>(dataToSave);
            responseDB = await products.save();
        }
        if (responseDB) {
            return (response = {
                code: 0,
                message: "Productos creados",
            });
        }
    } catch (error: any) {
        console.error("[createProductsStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al crear los productos",
        };

        return response;
    }
};

export const getAllBusinessStore = async () => {
    try {
        // const { Business } = models;
        // let response: ICommonResponse | undefined;
        // const responseDB = await querys(Business, {
        //   method: "getAll",
        //   mainField: "categoria_id",
        // });
        // if (responseDB) {
        //   return (response = {
        //     code: 0,
        //     message: "Operacion exitosa",
        //     data: responseDB,
        //   });
        // }
    } catch (error: any) {
        console.error("[getAllBusinessStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al obtener los negocios",
        };

        return response;
    }
};

export const getProductByIdStore = async (request: any) => {
    try {
        const { Product } = models;
        const { id } = request.params;
        const configFieldOptions: ICongifOptions = {
            method: "getById",
            mainField: "categoria_id",
            id,
        };
        const responseDB = await querys(Product, configFieldOptions);
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
        console.error("[getProductByIdStoreFail]: ", error.message);
        const response = {
            code: 2,
            message: "Algo salio mal al obtener el producto por id",
        };

        return response;
    }
};
