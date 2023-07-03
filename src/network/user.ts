import { Router, Response, Request } from 'express';
const router: Router = Router();
router.get('/', (request: Request, response: Response) => {
  response.send('Hello world! estas en User');
});
export default router;
