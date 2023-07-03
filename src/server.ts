import 'tsconfig-paths/register';
import { appExts } from '@modules/exts';
import express from 'express';

appExts.use(express.json());
