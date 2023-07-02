import 'tsconfig-paths/register';
import express from 'express';
import { endPointsBundle } from '@modules/endpoints';
import { PORT } from '@modules/dev/messageLog';
import Router from '@modules/router';

// * create dinamyc endpoints
endPointsBundle();

const app = express();
app.use(express.json());
Router(app);
app.listen(PORT);
