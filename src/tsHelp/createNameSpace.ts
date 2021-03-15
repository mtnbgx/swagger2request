import ts, { DeclarationStatement, factory, InterfaceDeclaration, ModuleDeclaration } from "typescript";

export function createNamespace(name: string, faces: DeclarationStatement[]): ModuleDeclaration {
    return factory.createModuleDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(name),
        factory.createModuleBlock(faces),
        ts.NodeFlags.Namespace
    )
}