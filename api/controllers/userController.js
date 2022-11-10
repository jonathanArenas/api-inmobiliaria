import User from '../models/user.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';


//leer el usuario especifico
const read = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    return res.json({
      msg: 'Request Okay',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar items',
      error,
    });
  }
};

const update = async (req, res) => {
  //Obtenemos el id del usuario y el body
  const { id } = req.params;
  const { body } = req;
  
  //Actualizamos el usuario
  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.json({
      msg: 'User updated suscefully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar usuario',
      error,
    });
  }
};

const remove = async (req, res) =>{
  const {id} = req.params;
  try{
    const user = await User.findByIdAndUpdate(id,{isDeleted: true,}, {new: true,});
    return res.json({
      msg: 'User deleted suscefully'
    })
  }catch(error){
    return res.json({
      msg: 'Error to deleted user',
      error,
    })
  }
}
//leer todos los usuarios solo ADMIN
const list = async (req, res) =>{
 
  try{
    const users= await User.find({isDeleted: false});
    return res.json({
      users: users
    })
  }catch(error){
    return res.json({
      msg: 'Error to query users',
      error,
    })
  }
}

const myInfo = async (req, res) => {
  const id = req.user.id;
  try {
    const users = await User.findById(id);
    return res.json({
      msg: 'Your account information',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Bad request',
      error,
    });
  }
};

const updateMyInfo = async (req, res) => {
  //Obtenemos el id del usuario y el body
  const  id = req.user.id;
  const { body } = req;
  //Verificamos si existe password si es asi verificar que exista oldPassword
  if (body.password) {
    if (!body.oldPassword) {
      return res.status(400).json({
        msg: 'Ingresa oldPassword',
      });
    } else {
      //Obtenemos el usuario para comparar contraseña y si no exite avisar
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          msg: 'El usuario que intentas modificar no existe',
        });
      }
      //Verificamos que la contraseña anterior coincida
      const isValid = await bcrypt.compare(body.oldPassword, user.password);
      if (!isValid) {
        return res.status(403).json({
          msg: 'La antigua contraseña no es valida.',
        });
      } else {
        const hashed = await bcrypt.hash(body.password, 10);
        body.password = hashed;
      }
    }
  }
  if (body.oldPassword) {
    delete body.oldPassword;
  }
  //Actualizamos el usuario
  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.json({
      msg: 'Usuario modificado',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar usuario',
      error,
    });
  }
};
export { read, update, remove, list, myInfo, updateMyInfo};
