//responses包裹接口
interface R<T> {
    data: T
    code: number
    msg: string
}

export async function request<T>(url: string, option: any): Promise<R<T>> {
    //execution request method
    return {} as R<T>
}


