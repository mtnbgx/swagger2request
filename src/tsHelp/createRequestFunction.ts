import ts, { factory, FunctionDeclaration, ObjectLiteralElementLike, ParameterDeclaration, PropertySignature } from "typescript";
import { RequestMethod, SchemaObject } from "../types/openapi"
import { createParamsPath } from "./createParamsPath";
import { createPropert, createPropertyType } from "./createPropert";

export class CreateRequestFunction {
    name: string
    path: string
    method: RequestMethod


    responses: SchemaObject | undefined
    body: SchemaObject | undefined

    params: PropertySignature[] = []
    querys: PropertySignature[] = []

    constructor(name: string, path: string, method: RequestMethod) {
        this.name = name
        this.path = path
        this.method = method
    }

    addResponses(ojb: SchemaObject) {
        this.responses = ojb
    }

    addBody(ojb: SchemaObject) {
        this.body = ojb
    }

    addParam(name: string, ojb: SchemaObject) {
        this.params.push(createPropert(name, ojb, true, 'Api'))
    }

    addQuery(name: string, ojb: SchemaObject) {
        this.querys.push(createPropert(name, ojb, true, 'Api'))
    }

    //创建模板
    // export async function replaceOneBaseSysUserControllerSysUser(
    //     params: {
    //         id: number;
    //     },
    //     body: API.SysUser,
    //     query: {
    //         name: string
    //     }
    //     options?: { [key: string]: any },
    // ) {
    //     return request<API.SysUser>(`/api/sysUser`, {
    //         method: 'PUT',
    //         params,
    //         query,
    //         data: body,
    //         ...(options || {}),
    //     });
    // }
    getNode(): FunctionDeclaration {
        const funcParameter: ParameterDeclaration[] = []

        const requestObject: ObjectLiteralElementLike[] = [
            factory.createPropertyAssignment(
                factory.createIdentifier("method"),
                factory.createStringLiteral(this.method.toUpperCase())
            )
        ]
        if (this.params.length > 0) {
            funcParameter.push(
                factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    factory.createIdentifier("params"),
                    undefined,
                    factory.createTypeLiteralNode(this.params),
                    undefined
                ),
            )
            requestObject.push(
                factory.createShorthandPropertyAssignment(
                    factory.createIdentifier("params"),
                    undefined
                )
            )
        }
        if (this.querys.length > 0) {
            funcParameter.push(
                factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    factory.createIdentifier("query"),
                    undefined,
                    factory.createTypeLiteralNode(this.querys),
                    undefined
                )
            )
            if (this.method !== 'post') {
                requestObject.push(
                    factory.createPropertyAssignment(
                        factory.createIdentifier("data"),
                        factory.createIdentifier("query")
                    )
                )
            } else {
                requestObject.push(
                    factory.createShorthandPropertyAssignment(
                        factory.createIdentifier("query"),
                        undefined
                    )
                )
            }
        }
        //添加body
        if (this.body) {
            funcParameter.push(
                factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    factory.createIdentifier("body"),
                    undefined,
                    createPropertyType(this.body, 'Api'),
                    undefined
                )
            )
            requestObject.push(
                factory.createPropertyAssignment(
                    factory.createIdentifier("data"),
                    factory.createIdentifier("body")
                )
            )
        }

        return factory.createFunctionDeclaration(
            undefined,
            [
                factory.createModifier(ts.SyntaxKind.ExportKeyword),
                factory.createModifier(ts.SyntaxKind.AsyncKeyword)
            ],
            undefined,
            factory.createIdentifier(this.name),
            undefined,
            //方法参数
            funcParameter.concat([
                //options 不处理
                factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    factory.createIdentifier("options"),
                    factory.createToken(ts.SyntaxKind.QuestionToken),
                    factory.createTypeLiteralNode([factory.createIndexSignature(
                        undefined,
                        undefined,
                        [factory.createParameterDeclaration(
                            undefined,
                            undefined,
                            undefined,
                            factory.createIdentifier("key"),
                            undefined,
                            factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                            undefined
                        )],
                        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                    )]),
                    undefined
                )
            ]),
            undefined,
            factory.createBlock(
                [factory.createReturnStatement(factory.createCallExpression(
                    factory.createIdentifier("request"),
                    //responses
                    this.responses ? [createPropertyType(this.responses, 'Api')] : [],
                    [
                        createParamsPath(this.path, 'params'),
                        factory.createObjectLiteralExpression(
                            //请求参数
                            requestObject.concat([
                                //options
                                factory.createSpreadAssignment(factory.createParenthesizedExpression(factory.createBinaryExpression(
                                    factory.createIdentifier("options"),
                                    factory.createToken(ts.SyntaxKind.BarBarToken),
                                    factory.createObjectLiteralExpression(
                                        [],
                                        false
                                    )
                                )))
                            ]),
                            true
                        )
                    ]
                ))],
                true
            )
        )

        //end
    }
}