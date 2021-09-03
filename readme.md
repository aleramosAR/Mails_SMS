# Mails y SMS desde la app

- El sistema debe enviar un mail, utilizando una cuenta de ethereal, que indique cuando un usuario se loguea (a través de la red social implementada anteriormente: de aquí en más Facebook). Así mismo debe proceder de la misma forma al desloguerse el usuario.

- En ambos casos, el asunto del mail debe describir la operación (log in, log out) y el nombre del usuario junto a la fecha y hora del evento.

-Además, al momento del logueo se debe enviar un email similar, utilizando gmail como servidor de correo, a la cuenta de email registrada en Facebook ó alguna otra elegida. Se debe adjuntar la foto de perfil de la red social Facebook en el envío.

Para estos puntos cree un archivo llamado **sendMail.js** donde creo y exporto las funciones ```sendMailEthereal()``` y ```sendMailGmail()``` que envian los email desde Ethereal y Gmail respectivamente.

El servidor también enviará un SMS a un número elegido, cada vez que reciba un mensaje con la palabra 'administrador' en el canal de chat, indicando quién lo envió y el texto completo del mensaje.

Para este punto cree un archivo llamado **sendSMS.js** desde donde exporto la funcion ```sendSMS()``` que envia los SMSs.


<hr />


Las claves de configuracion de estos servicios van en el archivo **utils.js**, en la version que subo de este archivo solo estan los datos de Ethereal, los de Twilio los paso por mensaje y para gmail se pueden poner los que se quieran poner y la plataforma usara la cuenta de Gmail que se desee.

```
// TWILIO
export const TWILIO_ACCID = 'Lo paso x mensaje';
export const TWILIO_AUTHTOKEN = 'Lo paso x mensaje';

// NODEMAILER ETHEREAL
export const ETHEREAL_USER = "donnie.lockman61@ethereal.email";
export const ETHEREAL_PASS = "BY67X7jBAq6Ks1HpYK";

// NODEMAILER GMAIL
export const GMAIL_USER = 'Cuenta Gmail';
export const GMAIL_PASS = 'Pass Gmail';
```