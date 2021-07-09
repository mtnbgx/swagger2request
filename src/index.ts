import fs from 'fs'
import {codegen} from './codegen'
import fetch from 'node-fetch';

async function boot() {
    const json = await (await fetch('https://petstore.swagger.io/v2/swagger.json')).json()
    const first = 'import {request} from "./request"\n\n'
    const out = await codegen(first, json)
    if (out) {
        fs.writeFileSync('./example/api.ts', out)
    }
}

boot()

