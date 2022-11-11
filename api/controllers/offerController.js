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
      <a href=${config.server.url}/message/${message._id}/property/${property._id}/> Click here</a>
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
  const  idMessage  = req.params.id;
  const userId = req.user.id;
  try {
    const messaged = await Property.find(
      {  
        user: userId,
        message: { $elemMatch : { $in : idMessage }}
      },
    );
    const message = await Message.findById(idMessage);
    return res.json({
      msg: 'Request Okay',
      message: message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error to query message',
      error,
    });
  }
};



const remove = async (req, res) =>{
  const  idMessage  = req.params.id;
  const userId = req.user.id;
  try{
    const messaged = await Property.find(
      {  
        user: userId,
        message: { $elemMatch : { $in : idMessage }}
      },
      );
    const message = await Message.findByIdAndUpdate(id,{isDeleted: true,}, {new: true,});
    return res.json({
      msg: 'Message deleted suscefully'
    })
  }catch(error){
    return res.json({
      msg: 'Error to deleted Message',
      error,
    })
  }
}
//leer todos los usuarios solo ADMIN
const list = async (req, res) =>{
  const userId = req.user.id;
  const {id} = req.body;
  try{
    const messages = await Property.findById(id,
     {
        message: 1
      }
    ).populate('message');
    return res.json({
      message: messages 
    })
  }catch(error){
    return res.json({
      msg: 'Error to query',
      error,
    })
  }
}




export { create, read, list};
