
    import 'tsconfig-paths/register';
import { appExts } from '@modules/exts';
import express from 'express';
    import * as dotenv from 'dotenv';
    import Router from './router.exts';
    dotenv.config();
    appExts.use(express.json());
    Router(appExts);
    appExts.listen(process.env.PORT || 4001);
    