const express = require('express');
const fileUpload = require('express-fileupload');
const pdf = require('pdf-parse');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());

const apiKey = '';

app.post('/api/process-pdf', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }

  const pdfFile = req.files.file;

  try {
    const data = await pdf(pdfFile.data);
    const text = data.text;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Resume el siguiente texto de una manera amigable para el usuario...: ${text}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (error) {
    console.error('Error al procesar el PDF:', error);
    res.status(500).send('Error al procesar el PDF.');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
