
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from '../config/index.js'

const cloud = cloudinary.v2;

/**
 * 1.- Crear const de configuración de cloudinary con nuestras credenciales
 */
cloud.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.key,
  api_secret: config.cloud.secret,
});

/**
 * 2.- Configurar un storage temporal antes de subirlo a cloudinary con la config de antes
 */

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: 'DEV',
  },
});

export {storage}