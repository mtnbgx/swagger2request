import { factory, TemplateExpression, TemplateSpan } from 'typescript';

/**
 * 创建params template string
 * @param path
 * @param variableName
 * @returns
 */
export function createParamsPath(path: string, variableName: string) {
    const result = splitStringByCharacter(path, ['{', '}'])
    if (result.length === 1) {
        return factory.createNoSubstitutionTemplateLiteral(
            result[0],
            result[0]
        )
    }
    if (result.length % 2 === 0) {
        result.push('')
    }
    const tempSpanList: TemplateSpan[] = []
    const expression: TemplateExpression = factory.createTemplateExpression(
        factory.createTemplateHead(
            result[0],
            result[0]
        ),
        tempSpanList
    )
    for (let n2 = 1; n2 < result.length / 2; n2++) {
        tempSpanList.push(
            factory.createTemplateSpan(
                factory.createPropertyAccessExpression(
                    factory.createIdentifier(variableName),
                    factory.createIdentifier(result[(n2 * 2) - 1])
                ),
                factory.createTemplateTail(
                    result[n2 * 2],
                    result[n2 * 2]
                )
            )
        )
    }
    return expression
}


/**
 * 按字符切分字符串
 * @param path 要切分的字符串
 * @param matchArr 只能匹配长度为1的字符串
 * @returns
 */
export function splitStringByCharacter(path: string, matchArr: string[]) {
    const result: string[] = []
    let temp = ''
    for (let i = 0; i < path.length; i++) {
        if (matchArr.includes(path[i])) {
            result.push(temp)
            temp = ''
            continue
        }
        temp += path[i]
    }
    if (temp.length > 0) {
        result.push(temp)
    }
    return result
}
