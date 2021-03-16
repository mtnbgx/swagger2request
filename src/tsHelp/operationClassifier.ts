import ts, { Statement } from "typescript";
import { createNamespace } from "./createNameSpace";

//operation分类器
export class OperationClassifier {
    nodeMap: { [key in string]: Statement[] } = {}
    addOperation(tag: string, node: Statement) {
        if (!this.nodeMap[tag]) {
            this.nodeMap[tag] = []
        }
        this.nodeMap[tag].push(node)
    }
    getNodes() {
        const result: ts.Node[] = []
        for (const tag of Object.keys(this.nodeMap)) {
            result.push(createNamespace(tag, this.nodeMap[tag]))
        }
        return result
    }
}
