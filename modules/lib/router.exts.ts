
  import { Express } from 'express';
  import user from '@network/user' 

  const Router = (server: Express) => {
    try{
      server.use('/user', user);
    }catch(error: unknown){
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('error inesperado');
      }
    }
  };
  export default Router;