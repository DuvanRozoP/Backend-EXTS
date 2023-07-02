import * as dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const MESSAGE_SERVER = process.env.MESSAGE_SERVER;
export const MODE = process.env.MODE;
type TMessageType = {
  [key: string]: string;
};

const messageType: TMessageType = {
  err: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[36m',
  check: '\x1b[35m',
};
export function messageLog(type: string, message: string) {
  if (MODE === 'dev')
    console.log(`${messageType[type]}\x1b[1m`, `${MESSAGE_SERVER}  ${message}`);
}
export function errorMessage(error: unknown) {
  if (MODE === 'dev')
    if (error instanceof Error)
      console.log(
        `${messageType['warn']}\x1b[4m`,
        `${MESSAGE_SERVER} ${error.message}. 📢🛠️`
      );
    else
      console.log(
        `${messageType['err']}\x1b[4m`,
        `${MESSAGE_SERVER} Error inesperado 💥`
      );
}
