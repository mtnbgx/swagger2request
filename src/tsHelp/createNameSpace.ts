import ts, { factory, ModuleDeclaration, Statement } from 'typescript';

/**
 * 创建ts命名空间
 * @param name
 * @param faces
 * @returns
 */
export function createNamespace(name: string, faces: Statement[]): ModuleDeclaration {
    return factory.createModuleDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name),
        factory.createModuleBlock(faces),
        ts.NodeFlags.Namespace
    )
}
