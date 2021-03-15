import ts, { factory } from "typescript";
import { SchemaObject } from "../types/openapi";
import { createPropertyType } from "./createPropert";

export function createType(name: string, ojb: SchemaObject) {
    return factory.createTypeAliasDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name),
        undefined,
        createPropertyType(ojb)
    )
}