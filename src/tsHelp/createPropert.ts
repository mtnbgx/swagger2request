import ts, { factory, TypeNode } from "typescript"
import { SchemaObject } from "../types/openapi"

/**
 * 创建参数
 * @param name 
 * @param ojb 
 * @param required 
 * @returns 
 */
export function createPropert(name: string, ojb: SchemaObject, required = true, field?: string) {
    return factory.createPropertySignature(
        undefined,
        factory.createIdentifier(name),
        required ? undefined : factory.createToken(ts.SyntaxKind.QuestionToken),
        createPropertyType(ojb, field)
    )
}

/**
 * 创建参数类型
 * @param ojb 
 * @returns 
 */
export function createPropertyType(ojb: SchemaObject, field?: string): TypeNode {
    //直接引用
    if (ojb.$ref) {
        const arr = ojb.$ref.split('/')
        if (field) {
            return createUnionUndefinedType(
                factory.createTypeReferenceNode(
                    factory.createQualifiedName(
                        factory.createIdentifier(field),
                        factory.createIdentifier(arr[arr.length - 1])
                    ),
                    undefined
                ),
                ojb.nullable
            )
        }
        return createUnionUndefinedType(
            factory.createTypeReferenceNode(
                factory.createIdentifier(arr[arr.length - 1]),
                undefined
            ),
            ojb.nullable
        )
    }
    //非数组基本类型
    if (ojb.type && ojb.type !== 'array') {
        //TODO 还有很多类型
        if (ojb.type === 'string') {
            return createUnionUndefinedType(
                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                ojb.nullable
            )
        }
        if (ojb.type === 'number' || ojb.type === 'integer') {
            return createUnionUndefinedType(
                factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                ojb.nullable
            )
        }
        if (ojb.type === 'boolean') {
            return createUnionUndefinedType(
                factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
                ojb.nullable
            )
        }
        return createUnionUndefinedType(
            factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
            ojb.nullable
        )
    }
    //数组
    if (ojb.type === 'array' && ojb.items) {
        return createUnionUndefinedType(
            factory.createArrayTypeNode(createPropertyType(ojb.items, field)),
            ojb.nullable
        )
    }
    //oneOf 联合
    if (ojb.oneOf) {
        const types: TypeNode[] = []
        for (const o of ojb.oneOf) {
            //一次次执行
            types.push(createPropertyType(o, field))
        }
        //执行结果联合
        return createUnionType(types)
    }
    return createUnionUndefinedType(
        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        ojb.nullable
    )
}


/**
 * 创建联合类型
 * @param type 
 * @param need 
 * @returns 
 */
function createUnionType(types: TypeNode[]) {
    return factory.createUnionTypeNode(types)
}


/**
 * 创建包含undefined的联合类型
 * @param type 
 * @param need 
 * @returns 
 */
function createUnionUndefinedType(type: TypeNode, need = false) {
    if (need) {
        return createUnionType([
            type,
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)]
        )
    } else {
        return type
    }
}