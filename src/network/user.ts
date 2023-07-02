import { Router, Response, Request } from 'express';
const router: Router = Router();
router.get('/', (request: Request, response: Response) => {
  response.send('hello world user');
});
export default router;
