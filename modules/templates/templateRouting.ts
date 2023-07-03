const templateRouting = (modulesImport: string, modulesUse: string): string => {
  let templateModules: string = `
  import { Express } from 'express';
  import { errorMessage } from '@modules/dev/messageLog';
  ${modulesImport}
  const Router = (server: Express) => {
    try{
      ${modulesUse}
    }catch(error: unknown){
      errorMessage(error)
    }finally{
      console.log('finalizado')
    }
  };
  export default Router;`;
  return templateModules;
};
export default templateRouting;
