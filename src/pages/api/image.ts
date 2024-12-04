import type { NextApiRequest, NextApiResponse } from "next";
import { Message, responseStatusMapping } from "../utils/Message";
import { AxiosError } from 'axios'

type Data = {
  binary: string;
  status: number;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) {
  const { functionName } = request.body

  const functionMap: { [key: string]: Function } = {
    sendBinaryImage: sendBinaryImage,
    getBinaryImage: getBinaryImage,
  };

  const func = functionMap[functionName];

  if (func) {
    return func(request, response);
  } else {
    return response.send({ status: 200, binary: "" });
  }
}

async function sendBinaryImage(
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) {
  const buffers: Buffer[] = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  const fileBuffer = Buffer.concat(buffers);
}

function getBinaryImage() {
}

export function formatErrorMessage(error: AxiosError) {
  let status = Number((error).response?.status)
  if (!status) return { status: 500, message: 'Houve um erro ao processar binário da imagem' }
  let message = responseStatusMapping[status] ?? Message('serverError')

  return { status, message }
}