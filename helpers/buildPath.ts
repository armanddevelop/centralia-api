import { filesData } from "../interfaces/common-interface";
import { pathsDto } from "../interfaces/common.DTO";

export const buildSinglePath = (data: any, file: any) => {
    let path: pathsDto = { avatar: "" };
    if (Object.keys(file).length > 0) {
        for (const key in file) {
            path[
                key as keyof typeof path
            ] = `/${file[key][0].destination}/${file[key][0].filename}`;
            data[key] = path[key as keyof typeof path];
        }
    } else {
        data.avatar = path.avatar;
    }
    return data;
};

export const buildMultiplePaths = (body: any, files: any) => {
    let dataWithPaths: pathsDto = { logo: "", fachada: "" };
    if (Object.keys(files).length > 0) {
        for (const key in files) {
            const values = files[key];
            values.map(({ filename, destination }: filesData) => {
                dataWithPaths[
                    key as keyof typeof dataWithPaths
                ] = `/${destination}/${filename}`;
            });
        }
    }
    return (dataWithPaths = { ...body, ...dataWithPaths });
};
