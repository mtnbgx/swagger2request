import { Openapi } from "../types/openapi";

const converter = require('swagger2openapi');
export function swagger2openapi(json: any): Promise<Openapi> {
    return new Promise((resolve, reject) => {
        converter.convertObj(json, {}, function (err: any, options: any) {
            if (!err) {
                resolve(options.openapi)
            } else {
                reject(err)
            }
        });
    })
}