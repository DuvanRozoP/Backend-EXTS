const templateServer = (imports: string, code: string): string => {
  return `
    ${imports}
    import * as dotenv from 'dotenv';
    import Router from './router.exts';
    dotenv.config();
    ${code}
    Router(appExts);
    appExts.listen(process.env.PORT || 4001);
    `;
};
export default templateServer;
