import fs from 'fs'
import path from 'path'
import { codegen } from "./codegen"
import { Openapi } from './types/openapi'
import fetch from 'node-fetch';
const converter = require('swagger2openapi');

async function boot() {
    const json = await (await fetch('https://petstore.swagger.io/v2/swagger.json')).json()
    const first = "import {request} from \"./request\"\n\n"
    const out = await codegen(first, json)
    if (out) {
        fs.writeFileSync('./dist/out.ts', out)
    }
}

boot()

