import { diskStorage } from 'multer';
import moment = require('moment');
import { extname } from 'path';
import { NotFoundException } from '@nestjs/common';
import { IMAGES_EXTENSION_ALLOWED } from './constants';

export const fileSettings = {
  storage: diskStorage({
    destination: './files/bikes',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      return cb(null, `${randomName}_${moment().format('YYYY-MM-DD')}_${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (IMAGES_EXTENSION_ALLOWED.includes(ext)) {
      cb(null, true);
    } else {
      // tslint:disable-next-line: max-line-length
      return cb(new NotFoundException(`'${ext}' no es una extensión válida, las válidas son ${IMAGES_EXTENSION_ALLOWED.toString()}`), false);
    }
  },
  limits: {
    fileSize: 9000000, // BITS
  },
};
