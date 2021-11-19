import {Request, Response} from "express";
import {NextFunction} from "express";
import express from 'express';
import logger from "./utils/logger";
import {testApp} from "./test";

const router = express.Router();

function timeLog(req: Request, res: Response, next: NextFunction) {
    logger.info("Express Router was called");
    next();
}

function testAppCall(req: Request, res: Response, next: NextFunction) {
    logger.info("testApp was called");
    testApp();
    next();
}

router.get("/healthcheck", timeLog, (req: Request, res: Response) => res.sendStatus(200));

router.get("/test", testAppCall, (req: Request, res: Response) => res.sendStatus(200));

export default router;