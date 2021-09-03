import nodemailer from 'nodemailer';
import {ETHEREAL_USER, ETHEREAL_PASS, GMAIL_USER, GMAIL_PASS} from '../utils.js';

function createSendMail(mailConfig) {
  const transporter = nodemailer.createTransport(mailConfig);

  return async function sendMail({ to, subject, text, html, attachments }) {
    console.log(to, subject, text, html, attachments);
    const mailOptions = { from: mailConfig.auth.user, to, subject, text, html, attachments };
    return await transporter.sendMail(mailOptions)
  }
}

function createSendMailEthereal() {
  return createSendMail({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: { user: ETHEREAL_USER, pass: ETHEREAL_PASS }
  })
}

function createSendMailGmail() { 
  return createSendMail({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_PASS }
  })
}

const sendMailEthereal = createSendMailEthereal();
const sendMailGmail = createSendMailGmail();

export { sendMailEthereal, sendMailGmail };