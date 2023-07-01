import express from 'express';
import Routers from './router';
import { PORT, MESSAGE_SERVER, messageLog } from './config';
const app = express();
app.use(express.json());
Routers(app);
app.listen(PORT, () => {
  messageLog(
    'check',
    `${MESSAGE_SERVER} 🟢 start server in http://localhost:${PORT}/ ✅`
  );
});
