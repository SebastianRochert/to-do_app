import {json, NextFunction, Request, Response} from "express";

const log = (req: Request, res: Response, next: NextFunction) => {

    next();
    console.log(JSON.stringify(req.body,null, 4))
}

export default log;