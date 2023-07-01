import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import { messageLog, errorMessage } from './config';
const directorio = path.join(__dirname, 'network');
const Routers = async (server: Express) => {
  try {
    if (!fs.existsSync(directorio))
      throw new Error("El directorio 'network' no existe'");

    const files = await fs.promises.readdir(directorio);
    if (files.length === 0) throw new Error('No se encuentra ningun Network');

    const filePromises = files.map(async (file) => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const filePath = path.join(directorio, file);
        const fileName = path.parse(filePath).name;
        const { default: router } = await import(filePath);
        server.use(`/${fileName}`, router);
        messageLog('info', `Endpoint: /${fileName} ✅`);
      } else throw new Error(`El archivo ${file} no es valido`);
    });

    await Promise.all(filePromises).then(() =>
      messageLog('info', `✅ EndPoints Complete ✅`)
    );
  } catch (error: unknown) {
    errorMessage(error);
  }
};
export default Routers;
