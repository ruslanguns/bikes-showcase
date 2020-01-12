import { NotFoundException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as moment from 'moment';


const imagesAllowed = ['.jpg', '.jpeg', '.png'];

export const fileOptions = {
  storage: diskStorage({
    destination: './files/bikes',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      return cb(null, `${randomName}_${moment().format('YYYY-MM-DD')}_${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (imagesAllowed.includes(ext)) {
      cb(null, true);
    } else {
      return cb(new NotFoundException(`'${ext}' no es una extensión válida, las válidas son ${imagesAllowed.toString()}`), false);
    }
  },
  limits: {
    fileSize: 9000000, // BITS
  },
};
