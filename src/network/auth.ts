import { Router, Response, Request } from 'express';
const router: Router = Router();
router.get('/', (request: Request, response: Response) => {
  response.send('hello world Auth');
});
export default router;
