import path from 'path';
import fs from 'fs';
import templateServer from '../templates/templateServer';
const outputFilePath = path.resolve(__dirname, '..', 'lib', 'server.exts.ts');
const directorio = path.join(__dirname, '..', '..', 'src', 'server.ts');
if (!fs.existsSync(directorio))
  throw new Error("El directorio 'network' no existe");
const server = fs.readFileSync(directorio, 'utf8');
const importsMatches = server.match(/import\s.*?;/gs);
if (!importsMatches) throw new Error('No se encontraron imports en el código');
const importsContent = importsMatches.join('\n');
const codeContent = server.replace(/import\s.*?;/gs, '').trim();
fs.writeFileSync(outputFilePath, templateServer(importsContent, codeContent));
