import ts = require('typescript');
import { factory } from 'typescript';

export function printNodeList(nodeList: ts.Node[]) {
    const resultFile = ts.createSourceFile('result.ts', '', ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray(nodeList), resultFile)
}

export function printNode(node: ts.Node) {
    const resultFile = ts.createSourceFile('result.ts', '', ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printNode(ts.EmitHint.Unspecified, node, resultFile)
}

