import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  const form = formidable({});
  let fields;
  let files;
  [fields, files] = await form.parse(request);

  if (!files || !files['file']) {
    return response.status(400).json({ status: 400, message: "Arquivo não encontrado" });
  }

  const file = files['file'][0];
  const functionName = fields.functionName as unknown as string;
  const filePath = file.filepath;

  if (!functionName) {
    return response.status(400).json({ status: 400, binary: "functionName is required" });
  }

  sendBinaryImage(filePath, response);
}

async function sendBinaryImage(
  filePath: string,
  response: NextApiResponse
) {
  try {

    if (!filePath) {
      return response.status(400).json({ status: 400, message: "Arquivo não encontrado" });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(filePath));
    formData.append('size', 'auto');

    const apiKey = '';
    const url = 'https://api.remove.bg/v1.0/removebg';

    const result = await axios.post(url, formData, {
      headers: {
        'X-API-Key': apiKey,
        ...formData.getHeaders()
      },
      responseType: 'arraybuffer'
    });

     fs.writeFileSync('no-bg.png', result.data);

     return response.status(200).json({ status: 200, message: "Imagem enviada com sucesso", binary: result.data });
  } catch (error) {
    console.error("Erro ao enviar imagem em binário", error);
    return response.status(500).json({ status: 500, message: "Erro ao processar a imagem" });
  }
}