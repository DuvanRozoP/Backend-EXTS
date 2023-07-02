import path from 'path';
import fs from 'fs';
import templateEndpoints from '@template/endpoints';
const directorio = path.join(__dirname, '..', 'src', 'network');
export const endPointsBundle = () => {
  try {
    if (!fs.existsSync(directorio))
      throw new Error("El directorio 'network' no existe");
    const files = fs.readdirSync(directorio);
    if (files.length === 0) throw new Error('No se encuentra ningún Network');
    let modulesImport = '';
    let modulesUse = '';
    for (const file of files) {
      if (file.endsWith('.ts')) {
        const fileName = file.replace('.ts', '');
        modulesImport += `import ${fileName} from '@network/${fileName}' \n`;
        modulesUse += `server.use('/${fileName}', ${fileName});`;
      } else throw new Error(`El archivo ${file} no es válido`);
    }
    fs.writeFileSync(
      'modules/router.ts',
      templateEndpoints(modulesImport, modulesUse)
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('error', error.message);
    } else {
      console.log('error inesperado');
    }
  }
};
