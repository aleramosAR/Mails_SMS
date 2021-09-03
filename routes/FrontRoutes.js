import express from "express";
import passport from "passport";
import compression from "compression";
import fs from "fs";
import fetch from "node-fetch";
import logger from '../utils/logger.js';
import { isAuth } from '../middlewares/Middlewares.js';
import { PORT } from '../utils.js';
import { sendMailEthereal, sendMailGmail } from '../utils/sendMail.js';
import os from 'os';

const emailDestino = 'aleramos.ok@gmail.com';

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/index', failureRedirect: '/login' }));

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get("/index", isAuth, async(req, res) => {

  const user = req.session.passport.user;
  const url = user.photos[0].value;
  const perfilPath = './images/perfil.jpg';
  const adjuntos = [];

  (async() => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(perfilPath, buffer, () => 
      console.log('Imagen de perfil descargada'));
      adjuntos.push({ path: perfilPath });
  })();

  await sendMailEthereal({
    to: emailDestino,
    subject: `${user.displayName} se logueo a las ${new Date()}`,
    html: `<strong>${user.displayName}</strong> se logueo a las <strong>${new Date()}</strong>`
  });

  await sendMailGmail({
    from: 'aleramos.ok@gmail.com',
    to: emailDestino,
    subject: `${user.displayName} se logueo a las ${new Date()}`,
    html: `<strong>${user.displayName}</strong> se logueo a las <strong>${new Date()}</strong>`,
    attachments: adjuntos
  });

  logger.info("Ingreso a la aplicacion.");
  res.render("index", { user });
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("index");
  } else {
    logger.info("Ingreso al login");
    res.render("login");
  }
});

router.get('/logout', async(req, res) => {

  const user = req.session.passport.user;

  await sendMailEthereal({
    to: emailDestino,
    subject: `${user.displayName} se deslogueo a las ${new Date()}`,
    html: `<strong>${user.displayName}</strong> se deslogueo a las <strong>${new Date()}</strong>`
  });

  logger.info("Usuario deslogueado.");
  res.render("logout", { user });
  req.logout();
})

router.get("/unauthorized", (req, res) => {
  logger.warn("No estas autorizado para ingresar a esta ruta");
  res.render("unauthorized");
});

router.get("/login-error", (req, res) => {
  logger.error("Intento de logueo fallido.");
  res.render("login-error");
});

// Funcion que genera la informacion que se mostrara en /info y /infozip.
const generarInfo = () => {
  const used = process.memoryUsage();
  const memoria = [];
  const numCPUs = os.cpus().length;
  for (let key in used) {
    memoria.push(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  return {
    process: process,
    path: process.cwd(),
    memoria: memoria,
    numCPUs: numCPUs
  }
}

router.get('/info', function(req, res){
  const info = generarInfo();
  logger.info("Chequeo de datos en la ruta /info");
  // res.render("info", info);
  res.send(info);
});

router.get('/infozip', compression(), function(req, res){
  const info = generarInfo();
  logger.info("Chequeo de datos en la ruta /infozip");
  // res.render("info", info);
  res.send(info);
});

let visitas = 0;
router.get('/visitas', function(req, res) {
  logger.info(`Conteo de visitas: ${visitas}`);
  res.end(`Visitas: ${++visitas}`);
});

router.get("/exit", (req, res) => {
  res.end("Salida del proceso de node.js");
  process.on('exit', (code) => {
    logger.warn(`Salida del proceso con el código: ${code}`);
  });
  process.exit();
});


router.get('/fork', (req, res) => {
  res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

router.get('/cluster', (req, res) => {
  res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

export default router;