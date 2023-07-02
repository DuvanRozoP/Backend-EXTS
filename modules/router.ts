
    import { Express } from 'express';
    import { errorMessage } from '@modules/dev/messageLog';
    import auth from '@network/auth' 
import user from '@network/user' 

    const Router = (server: Express) => {
      try{
        server.use('/auth', auth);server.use('/user', user);
      }catch(error: unknown){
        errorMessage(error)
      }finally{
        console.log('finalizado')
      }
    };
    export default Router;