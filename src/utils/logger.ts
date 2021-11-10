import logger from "pino";
import dayjs from "dayjs";

const pino = require('pino')
const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            ignore: 'pid,hostname',
        }
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})


export default log;