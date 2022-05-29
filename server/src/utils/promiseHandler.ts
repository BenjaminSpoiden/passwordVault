
interface PromiseHandlerInterface {
    data?: any,
    error?: any
}

export const handler = <T extends any> (promiseCallback: Promise<T>): Promise<PromiseHandlerInterface> => {
    return promiseCallback.then(data => {
        return {
            data,
            error: undefined
        }
    }).catch(error => {
        return {
            data: undefined,
            error
        }
    })
}