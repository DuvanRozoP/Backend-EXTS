import path from 'path';
import fs from 'fs';
import templateEndpoints from '../templates/templateRouting';
const directorio = path.join(__dirname, '..', '..', 'src', 'network');
const outputFilePath = path.resolve(__dirname, '..', 'lib', 'router.exts.ts');
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
    outputFilePath,
    templateEndpoints(modulesImport, modulesUse)
  );
} catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error('error inesperado');
  }
}
