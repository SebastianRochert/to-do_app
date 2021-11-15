import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import log from "./middleware/log";

const port = config.get<number>("port");
const app = express();
import router from "./express.router";

app.use(express.json());

app.use("/api", log);

app.use("/healthcheck", router)

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port} `);
    await connect();

    routes(app);
})

/**
 * ToDo:
 *  [X] Selektoren hinzufügen
 *  [X] GET Routen über Selektoren abfrühstücken
 *  [X] DELETE Suche <to-do> im Store
 *  [X] Express-Router: https://expressjs.com/en/guide/routing.html > Ganz unten: express.Router
 *  [X] Splitting von healthcheck und api/todos API
 *  [ ] Middleware (Redux) (einfach logging)
 *  [ ] Redux-Debugging > Chrome Extensions Redux Devtools. + npm install -g redux-devtools
 *  [ ] Wie kann ich in der App performance messen?
 * */

/**
 * Module:
 * - router? (api)
 * - reducer?
 * - middlewares (persistence / andere Sachen)
 * */
