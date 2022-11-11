import Message from '../models/message.js';
import Property from '../models/property.js';
import { transporter } from '../config/mailer.js';
import config from '../config/index.js'

const create = async(req, res) =>{
  const {id} = req.params
  try {
    const message = await Message.create(req.body);
    const property = await Property.findByIdAndUpdate(id,{ $push:{ message: {$each:[message._id]}}}, { new: true}).populate('user');
  
    const mailOptions = {
      from: 'jonathanarenas318@gmail.com',
      to: property.user.email,
      subject: 'You have received a message to one of your offers',
      html: `
      <h2>Hello ${property.user.firstName}</h2>
      <h3>Check the message your property </h3>
      <a href=${config.server.url}/message/${message._id}/> Click here</a>
      `,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    
    return res.json({
      msg: 'Message to send succefully',
      message: message,
    });
  }catch (error) {
    return res.status(500).json({
      msg: 'Error to send message',
      error: 'Este es el error', error,
    });
  }
}


//leer el message
const read = async (req, res) => {
  const { idMessage } = req.params.id;
  const userId = req.user.id;
  try {
    const message = await Property.findOne({ user: userId },{message:1}).populate({
      path : 'message',
      match : {_id: idMessage}
    }
    );
    return res.json({
      msg: 'Request Okay',
      message: message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar items',
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




export { create, read};
