const facebookID = '559885825005670';
const facebookSecret = '6a2926fd1ded556381f2275ddfbee1f2';
const PORT_DEFAULT = 8080;

export const MODE = process.env.npm_lifecycle_event;

export const FACEBOOK_CLIENT_ID = (MODE === 'startFB') ? process.argv[2] : facebookID;
export const FACEBOOK_CLIENT_SECRET = (MODE === 'startFB') ? process.argv[2] : facebookSecret;

export const PORT = (MODE === 'fork') ? (process.argv[2] ? parseInt(process.argv[2]) : PORT_DEFAULT) : PORT_DEFAULT;

export const MONGO_URI = 'mongodb+srv://user:pass@cluster0.99scg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// TWILIO
export const TWILIO_ACCID = 'AC278d1712d34620c78cf391d8920e4f1b';
export const TWILIO_AUTHTOKEN = 'd8ed681b7c666c92fcde4db428c63e56';

// NODEMAILER ETHEREAL
export const ETHEREAL_USER = "donnie.lockman61@ethereal.email";
export const ETHEREAL_PASS = "BY67X7jBAq6Ks1HpYK";

// NODEMAILER GMAIL
export const GMAIL_USER = 'aleramos.ok@gmail.com';
export const GMAIL_PASS = 'alejandrito77';