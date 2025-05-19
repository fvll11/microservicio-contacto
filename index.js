require('dotenv').config();  // carga variables de .env
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log("Datos recibidos:", nombre, email, mensaje);

  try {
    const serviceID = process.env.SERVICE_ID;
    const templateID = process.env.TEMPLATE_ID;
    const userID = process.env.USER_ID;
    console.log("Variables entorno:", serviceID, templateID, userID);

    const data = {
      service_id: serviceID,
      template_id: templateID,
      user_id: userID,
      template_params: {
        nombre,
        email,
        mensaje,
      },
    };

    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);

    res.status(200).json({ mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

