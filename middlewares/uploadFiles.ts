import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { configDev } from "../config";

//setting options for multer

const storage = multer.diskStorage({
  destination: (req: any, file, cb) => {
    const { fieldname } = file;
    let folder = "public";
    if (fieldname === "avatar") {
      const path = `${folder}/${fieldname}s/${uuidv4()}`;
      try {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      } catch (error) {
        console.error("[errorMulterCreateFolder]: ", error);
      }
    }
    if (fieldname === "logo" || fieldname === "fachada") {
      const path = `${folder}/${fieldname}s/${configDev.commonID}`;
      try {
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      } catch (error) {
        console.error("[errorMulterCreateFolder]: ", error);
      }
    }
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = uuidv4() + extension;
    cb(null, fileName);
  },
});
export const upload = multer({ storage: storage });
