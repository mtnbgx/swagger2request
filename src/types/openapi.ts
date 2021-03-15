export interface Openapi {
    openapi: string;
    swagger: string
    info: Info;
    tags: any[];
    servers: any[];
    components: Components;
    paths: Paths;
}

export type RequestMethod = 'get' | 'post'
interface Paths {
    [propName: string]: { [key in RequestMethod]: Request };
}

type RequestCode = '200' | '201'
interface Request {
    operationId: string
    summary: string
    parameters: Parameter[]
    requestBody?: RequestBody | SchemaObject
    responses: { [key in RequestCode]?: Responses }
    tags: string[]
}

interface RequestBody {
    required: boolean
    content: { "application/json": { schema: SchemaObject } }
}

interface Responses {
    description: string
    content?: { "application/json": { schema: SchemaObject } }
}

type ParameterIn = 'path' | 'query'
export interface Parameter {
    name: string
    required: boolean
    in: ParameterIn,
    schema: SchemaObject
}

interface Info {
    title: string;
    description: string;
    version: string;
    contact: any;
}

interface Components {
    schemas: Schemas;
    requestBodies?: RequestBodies
}
interface RequestBodies {
    [propName: string]: { content: { "application/json": { schema: SchemaObject } } };
}

interface Schemas {
    [propName: string]: OpenapiSchema;
}


export interface OpenapiSchema {
    type: string
    properties: Record<string, SchemaObject>
    required: string[]
}

export interface SchemaObject {
    type?: string
    nullable?: boolean
    '$ref'?: string
    items?: SchemaObject
    oneOf?: SchemaObject[]
}
