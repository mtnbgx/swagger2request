#!/usr/bin/env node
const fs = require("fs")
const fetch = require("node-fetch")
const Codegen = require('../dist/codegen')

function boot() {
    //args[0]:url args[1]:path
    const args = process.argv.slice(2)
    if (args.length < 2) {
        console.log('command error;; example: swagger2request https://petstore.swagger.io/v2/swagger.json ./example.ts')
    }
    const first = "import {request} from \"./request\"\n\n"
    fetch(args[0])
        .then(res => res.json())
        .then(json => {
            Codegen.codegen(first, json).then(out => {
                if (out) {
                    fs.writeFileSync(args[1], out)
                }
            })
        });
}
boot()