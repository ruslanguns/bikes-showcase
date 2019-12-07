
/**
 * DATABASE
 */
const DB = {
  host: 'localhost',
  name: 'bikes',
  port: 27017,
  username: 'cash',
  password: '123',
  authSource: 'admin'
};

// Local Format: 'mongodb://username:password@host:port/database?authSource=admin'
export const MONGO_URI = `mongodb://${DB.username}:${DB.password}@${DB.host}:${DB.port}/${DB.name}`;

/**
 * IMAGES EXTENSIONS ALLOWED
 */
export const IMAGES_EXTENSION_ALLOWED = ['.jpg', '.jpeg', '.png'];
