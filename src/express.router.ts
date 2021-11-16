import {Request, Response} from "express";
import {NextFunction} from "express";
import express from 'express';
import logger from "./utils/logger";

const router = express.Router();

// middleware that is specific to this router
/*
router.use(function timeLog (req: Request, res: Response, next: NextFunction) {
    logger.info("Express Router was called");
    next();
})
 */

function timeLog(req: Request, res: Response, next: NextFunction) {
    logger.info("Express Router was called");
}

router.get("/", timeLog, (req: Request, res: Response) => res.sendStatus(200));

export default router;