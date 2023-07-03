import 'tsconfig-paths/register';
import express from 'express';
import { PORT } from '@modules/dev/messageLog';
// import Router from '@modules/router';

const app = express();
app.use(express.json());
// Router(app);
app.listen(PORT);
