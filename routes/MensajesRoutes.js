import express from "express";
import Mensaje from '../models/Mensaje.js';
import { authAPI } from '../middlewares/Middlewares.js';
import { sendSMS } from '../utils/sendSMS.js';

const router = express.Router();
router.use(express.json());

router.get("/", async(req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.status(200).json(mensajes);
  } catch (err) {
    return res.status(404).json({
      error: "No hay mensajes cargados.",
    });
  }
});

router.post("/", authAPI, async(req, res) => {
  try {
    const newMensaje = new Mensaje(req.body);
    await newMensaje.save();
    
    const texto = newMensaje.texto.toLowerCase();
    if (texto.includes('administrador')) {
      console.log('ENVIAR SMS ------------');
      sendSMS(newMensaje.texto, '+18438060154', '+541157491402');
      // console.log(`Nuevo mensaje de ${newMensaje.username} con el texto: '${newMensaje.texto}'`);
    }
    
    res.status(201).json(newMensaje);
  } catch (err) {
    res.status(400).send();
  }
});

export default router;