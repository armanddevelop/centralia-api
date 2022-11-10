import { configDev } from "../config";
import { filesData } from "../interfaces/common-interface";

export const buildSinglePath = (data: any, file: any) => {
  const { serverHost } = configDev;
  let avatarImgPath: string = "";
  if (file) {
    const { filename, destination } = file;
    avatarImgPath = `${serverHost}/${destination}/${filename}`;
    data.avatar = avatarImgPath;
  } else {
    data.avatar = avatarImgPath;
  }
  return data;
};

export const buildMultiplePaths = (body: any, files: any) => {
  const { serverHost } = configDev;
  let data: object = {};
  if (Object.keys(files).length > 0) {
    for (const key in files) {
      const values = files[key];
      values.map(({ filename, destination }: filesData) => {
        body[key] = `${serverHost}/${destination}/${filename}`;
      });
    }
    return (data = { ...body });
  }
  return (data = { ...body, logo: "", fachada: "" });
};
