import express from 'express';
import morgan from 'morgan';
import propertyRouter from './routes/propertyRoutes.js';
import authRouter from  './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import offerRoutes from './routes/offerRoutes.js'

const api = express();

api.use(morgan('combined'));

api.use(express.json());
//api.use(express.urlencoded())

api.get('/status', (_, res) => {
  res.json({
    msg: 'API En linea funcionado',
    envs: process.env,
  });
});

api.use('/auth', authRouter);
api.use('/users', userRouter);
api.use('/properties', propertyRouter)
api.use('/message', offerRoutes)


export default api;
