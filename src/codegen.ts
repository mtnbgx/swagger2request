import { Openapi, RequestMethod } from './types/openapi';
import { InterfaceNodeBuilder } from './tsHelp/interfaceNodeBuilder';
import { printNodeList } from './tsHelp/printer';
import { DeclarationStatement } from 'typescript';
import { CreateRequestFunction } from './tsHelp/createRequestFunction';
import { createNamespace } from './tsHelp/createNameSpace';
import { swagger2openapi } from './utils/swaggerUtil';
import { createType } from './tsHelp/createType';
import { OperationClassifier } from './tsHelp/operationClassifier';

export async function codegen(firstCode: string, json: any) {
    let openapi: Openapi
    if (json.swagger === '2.0') {
        openapi = await swagger2openapi(json)
    } else {
        openapi = json as Openapi
    }
    if (openapi.openapi !== '3.0.0') {
        console.log('wrong version')
        return
    }
    const namespaceItems: DeclarationStatement[] = []
    const names: string[] = []
    //components.schemas
    const schemas = openapi.components.schemas
    Object.keys(schemas).forEach(interfaceName => {
        names.push(interfaceName)
        const schemaInterface = InterfaceNodeBuilder.build(interfaceName)
        for (const name of Object.keys(schemas[interfaceName].properties)) {
            if (Array.isArray(schemas[interfaceName].required)) {
                schemaInterface.addProperty(name, schemas[interfaceName].properties[name], schemas[interfaceName].required.includes(name))
            } else {
                schemaInterface.addProperty(name, schemas[interfaceName].properties[name], true)
            }
        }
        namespaceItems.push(schemaInterface.getNode())
    })
    //components.requestBodies
    const requestBodies = openapi.components.requestBodies
    if (requestBodies) {
        Object.keys(requestBodies).forEach(typeName => {
            if (!names.includes(typeName)) {
                namespaceItems.push(createType(typeName, requestBodies[typeName].content['application/json'].schema))
            }
        })
    }
    //operation
    let out = firstCode + printNodeList([createNamespace('Api', namespaceItems)])
    const operationIds: string[] = []
    const operationClassifier = new OperationClassifier()
    for (const path of Object.keys(openapi.paths)) {
        for (const method of Object.keys(openapi.paths[path])) {
            const m = method as RequestMethod
            const req = openapi.paths[path][m]
            if (operationIds.includes(req.operationId)) {
                const pathArr = path.split('/')
                req.operationId = req.operationId + '_' + pathArr[pathArr.length - 2] + '_' + pathArr[pathArr.length - 1]
            }
            operationIds.push(req.operationId)
            const func = new CreateRequestFunction(req.operationId, path, m)

            //处理parameters
            if (req.parameters && req.parameters.length > 0) {
                for (const pa of req.parameters) {
                    if (pa.in === 'path') {
                        func.addParam(pa.name, pa.schema)
                    } else {
                        func.addQuery(pa.name, pa.schema)
                    }
                }
            }

            //处理requestBody
            if (req.requestBody) {
                if ('content' in req.requestBody) {
                    if (req.requestBody.content['application/json']) {
                        func.addBody(req.requestBody.content['application/json'].schema)
                    }
                } else {
                    func.addBody(req.requestBody)
                }
            }
            //处理Responses
            if (req.responses) {
                //200状态
                if (req.responses[200] && req.responses[200].content) {
                    func.addResponses(req.responses[200].content['application/json'].schema)
                }
                //201状态
                if (req.responses[201] && req.responses[201].content) {
                    func.addResponses(req.responses[201].content['application/json'].schema)
                }
            }
            if (req.tags && req.tags.length > 0) {
                operationClassifier.addOperation('r_' + req.tags[0], func.getNode())
            } else {
                operationClassifier.addOperation('r_unnamedRequest', func.getNode())
            }
        }
    }
    const cnode = printNodeList(operationClassifier.getNodes())
    out += cnode
    console.log('code generated successfully')
    return out
}
