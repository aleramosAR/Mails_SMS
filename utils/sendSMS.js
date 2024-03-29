import twilio from 'twilio';
import {TWILIO_ACCID, TWILIO_AUTHTOKEN} from '../utils.js';

const twilioClient = twilio(TWILIO_ACCID, TWILIO_AUTHTOKEN);

export const sendSMS = async(body, from, to) => {
  const info = await twilioClient.messages.create({ body, from, to });
  console.log(info);
}