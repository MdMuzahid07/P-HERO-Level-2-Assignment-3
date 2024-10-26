

// taking an function as an parameter and return a new function if the promise return successfully. if not, then getting the error using catch(), and then passing it to the global error handler by calling next() function

import { NextFunction, Request, RequestHandler, Response } from "express";

const tryCatchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(

            // this function will return if its resolved
            fn(req, res, next)

        ).catch((error) => (
            // otherwise this functional will send the error to global error handler
            next(error)
        ));
    };
};

export default tryCatchAsync;