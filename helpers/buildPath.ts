import { configDev } from "../config";

export const buildPath = (nameFolder: string, data: any, file: any) => {
  const { serverHost } = configDev;
  let avatarImgPath: string = "";
  if (file) {
    const { filename, destination } = file;
    console.log("esto vale file", file);
    avatarImgPath = `${serverHost}/${destination}/${filename}`;
    data.avatar = avatarImgPath;
  } else {
    data.avatar = avatarImgPath;
  }
  return data;
};
