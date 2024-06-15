import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const requestValidator = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // if the validation is OK, then next function will called
            await schema.parseAsync(req.body);

            next();
        } catch (error) {
            console.log(error, "zod error, from request validator");
        }
    };
}

export default requestValidator;