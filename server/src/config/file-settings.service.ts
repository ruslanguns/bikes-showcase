import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import moment = require('moment');
import { extname } from 'path';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class FileSettingsService extends ConfigService {

  imagesAllowed = this.ImageFormatsAllowed();

  public fileOptions() {
    return {
      storage: diskStorage({
        destination: './files/bikes',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${randomName}_${moment().format('YYYY-MM-DD')}_${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        if (this.imagesAllowed.includes(ext)) {
          cb(null, true);
        } else {
          // tslint:disable-next-line: max-line-length
          return cb(new NotFoundException(`'${ext}' no es una extensión válida, las válidas son ${this.imagesAllowed.toString()}`), false);
        }
      },
      limits: {
        fileSize: 9000000, // BITS
      },
    };
  }
}
