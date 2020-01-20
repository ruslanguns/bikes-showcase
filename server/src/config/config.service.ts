import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from '@hapi/joi';

@Injectable()
export class ConfigService extends ConfigManager {

  provideConfigSpec() {
    return {
      HOST: {
        validate: Joi.string().alphanum().min(3).max(30),
        default: undefined
      },
      PORT: {
        validate: Joi.number().min(1000).max(9999),
        default: '4200'
      },
      DEFAULT_ADMIN_USERNAME: {
        validate: Joi.string().alphanum().min(3).max(30),
        default: 'admin'
      },
      DEFAULT_ADMIN_PASSWORD: {
        validate: Joi.string(),
        default: '123456'
      },
      DEFAULT_ADMIN_EMAIL: {
        validate: Joi.string().email(),
        required: true,
      },
      DB_HOST: {
        validate: Joi.string(),
        required: true,
      },
      DB_NAME: {
        validate: Joi.string(),
        required: true,
      },
      DB_PORT: {
        validate: Joi.number(),
        required: true,
      },
      DB_USERNAME: {
        validate: Joi.string(),
        required: true,
      },
      DB_PASSWORD: {
        validate: Joi.string(),
        required: true,
      },
      DB_AUTH_SOURCE: {
        validate: Joi.string(),
        required: true,
      },
      JWT_SECRET: {
        validate: Joi.string(),
        required: true,
      },
      SMTP_DOMAIN: {
        validate: Joi.string(),
        required: true,
      },
      SMTP_PORT: {
        validate: Joi.number(),
        required: true,
      },
      SMTP_SECURE: {
        validate: Joi.string(),
        required: true,
      },
      SMTP_USERNAME: {
        validate: Joi.string(),
        required: true,
      },
      SMTP_PASSWORD: {
        validate: Joi.string(),
        required: true,
      },
      EMAIL_DEFAULT_FROM_NAME: {
        validate: Joi.string(),
        required: true,
      },
      EMAIL_DEFAULT_FROM_EMAIL: {
        validate: Joi.string().email(),
        required: true,
      },
    };
  }

  public mongooseOptions() {
    return {
      uri: this.MongoUri(),
      authSource: 'admin',
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
  }

  public mailerOptions() {
    return {
      transport: this.SmtpTransporterSetup(),
      defaults: {
        from: this.SmtpFromSetup(),
      }
    };
  }

  public jwtOptions() {
    return {
      secret: this.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    };
  }

  /**
   * Imagenes disponibles para la carga
   */
  public ImageFormatsAllowed(): string[] {
    return ['.jpg', '.jpeg', '.png'];
  }

  /**
   * MongoDB URL from ENV
   * @returns `mongodb://username:password@host:port/database`
   */
  private MongoUri(): string {
    return `mongodb://${this.get<string>('DB_USERNAME')}:${this.get<string>('DB_PASSWORD')}@${this.get<string>('DB_HOST')}:${this.get<string>('DB_PORT')}/${this.get<string>('DB_NAME')}`;
  }

  private SmtpTransporterSetup() {
    const credentials = this.createSmtpCredentials(
      this.get<string>('SMTP_USERNAME'),
      this.get<string>('SMTP_PASSWORD'),
      this.get<string>('SMTP_DOMAIN'),
    );

    return this.createSmtpTransporter(
      credentials,
      this.get<number>('SMTP_PORT'),
      this.get<boolean>('SMTP_SECURE'),
    );
  }

  private SmtpFromSetup() {
    return this.createSmtpFromHeader(
      this.get<string>('EMAIL_DEFAULT_FROM_NAME'),
      this.get<string>('EMAIL_DEFAULT_FROM_EMAIL'),
    );
  }

  /**
   * Valid MongoUri Constructor for Mongoose
   */
  private createMongoUri(db_username: string, db_password: string, db_host: string, db_port: number, db_name: string) {
    return `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}`;
  }

  /**
   * Valid SmtpCredentials for Nestjs Mailer
   */
  private createSmtpCredentials(smtp_username: string, smtp_password: string, smtp_domain: string) {
    return `smtp://${smtp_username}:${smtp_password}@${smtp_domain}`;
  }

  /**
   * Valid SmtpTransporter for NestJs Mailer
   */
  private createSmtpTransporter(smtp_credentials: string, smtp_port: number, smtp_secure: boolean) {
    return `${smtp_credentials}?port=${smtp_port}&secure=${smtp_secure}`;
  }

  /**
   * Valid Smtp From Header for NestJs Mailer
   */
  private createSmtpFromHeader(email_from_name: string, email_from_email) {
    return `${email_from_name} <${email_from_email}>`;
  }

}
