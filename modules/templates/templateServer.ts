const templateServer = (imports: string, code: string): string => {
  return `
    ${imports}
    import * as dotenv from 'dotenv';
    import Router from './router.exts';
    dotenv.config();
    // HERE CODE ...
    ${code}
    // HERE FINALLY CODE ...
    Router(appExts);
    appExts.listen(process.env.PORT);
    `;
};
export default templateServer;
