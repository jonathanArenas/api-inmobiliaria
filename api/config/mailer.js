import nodemailer from 'nodemailer'
import config from '../config/index.js'

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true,
    auth:{
        user:config.mailCredentials.userMail,
        pass:config.mailCredentials.pass
    }
})

export  {
    transporter
}