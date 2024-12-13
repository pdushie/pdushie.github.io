import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
    destination: './_FrontendStarterFiles/albumart',
    filename: function(req,file,callback) {
        const newFileName = `${nanoid(12)}${path.extname(file.originalname)}`;
        callback(null, newFileName);
    }
});

export const uploadFile = multer({storage: storage});