import jwt from 'jwt-simple'
import config from '../config/index.js'
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { transporter } from '../config/mailer.js';


const singup = async (req, res)=>{
    const {password, role} = req.body
    console.log(role);
    try{
        const hash = await bcrypt.hash(password, 10);
        req.body.password = hash;
       
        const user  = await User.create(req.body)
        const payload = {
            userId: user.id,
          };
          const token = jwt.encode(payload, config.jwtSecret);
          const mailOptions = {
            from: 'jonathanarenas318@gmail.com',
            to: user.email,
            subject: 'Nodemailer TEST',
            text: 'Verify your credentials on link below',
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${user.firstName}</h2>
            <a href=${config.server.url}/auth/verify/${token}> Click here</a>
            `,
          };

          const sendEmail = await transporter.sendMail(mailOptions);
          return res.status(200).json({
            msg: 'Register suscefully',
            sendEmail,
          })
    }catch(error){
        return res.status(500).json({
            msg: 'Error registration User ',
            error,
        });
    }

}

const singin = async(req, res)=>{
    const { body } = req;
  if (!body.password || !body.email) {
    return res.status(400).json({
      msg: 'Ingresa correo y contraseña',
    });
  }
  try {
    // Busca el usuario unico en la BD busco correo electronico
    const user = await User.findOne({
      email: body.email,
    });
    // Validamos si el usuario exite
    if (!user) {
      return res.status(403).json({
        msg: 'Credenciales inválidas',
      });
    }

    // Validamos si el usuario tiene el correo verificado
    if (!user.isVerified) {
      return res.status(407).json({
        msg: 'Correo no verificado',
      });
    }

    // compara el password enviado con el de la base de datos
    const isValid = await bcrypt.compare(body.password, user.password);

    // Compara si es valido el password
    if (!isValid) {
      return res.status(403).json({
        msg: 'Credenciales inválidas',
      });
    }

    const payload = {
      userId: user.id,
    };
    // este es el Token @.
    const token = jwt.encode(payload, config.jwtSecret);
    return res.json({
      msg: 'login correcto',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error la hacer login',
      error,
    });
  }

}

const verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const payload = jwt.decode(token, config.jwtSecret);
    const { userId } = payload;
    const verified = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      {
        new: true,
      }
    );
    return res.json({ msg: 'User verified successfully', name: verified.firstName });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error updating user',
      error,
    });
  }
};



export {singup, singin, verifyUser}