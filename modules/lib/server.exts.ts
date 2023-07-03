
    import 'tsconfig-paths/register';
import { appExts } from '@modules/exts';
import express from 'express';
    import * as dotenv from 'dotenv';
    import Router from './router.exts';
    dotenv.config();
    // HERE CODE ...
    appExts.use(express.json());
    // HERE FINALLY CODE ...
    Router(appExts);
    appExts.listen(process.env.PORT);
    