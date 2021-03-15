import ts, { factory, InterfaceDeclaration, PropertySignature } from 'typescript';
import { SchemaObject } from '../types/openapi';
import { createPropert } from './createPropert';

/**
 * interface节点生成器
 */
export class InterfaceNode {
    private name: string
    private members: PropertySignature[] = []

    constructor(name: string) {
        this.name = name
    }

    static build(name: string) {
        return new InterfaceNode(name)
    }

    /**
     * 添加属性
     * @param name 
     * @param kind 可常用类型和非常用类型 
     * @param required 
     * @returns 
     */
    addProperty(name: string, ojb: SchemaObject, required = true) {
        this.members.push(
            createPropert(name, ojb, required)
        )
        return this
    }


    /**
     * 生成节点
     * @returns 
     */
    getNode(): InterfaceDeclaration {
        return factory.createInterfaceDeclaration(
            undefined,
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createIdentifier(this.name),
            undefined,
            undefined,
            this.members
        )
    }


}
