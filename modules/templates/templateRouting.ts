const templateRouting = (modulesImport: string, modulesUse: string): string => {
  let templateModules: string = `
  import { Express } from 'express';
  ${modulesImport}
  const Router = (server: Express) => {
    try{
      ${modulesUse}
    }catch(error: unknown){
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('error inesperado');
      }
    }
  };
  export default Router;`;
  return templateModules;
};
export default templateRouting;
