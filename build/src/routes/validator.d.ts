/// <reference types="qs" />
import { Request, Response, NextFunction } from "express";
export declare const postValidationRules: () => any[];
export declare const validatePost: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const userValidationRules: () => any[];
export declare const validateUser: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
declare const _default: {
    postValidationRules: () => any[];
    validatePost: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void | Response<any, Record<string, any>>;
    userValidationRules: () => any[];
    validateUser: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void | Response<any, Record<string, any>>;
};
export default _default;
