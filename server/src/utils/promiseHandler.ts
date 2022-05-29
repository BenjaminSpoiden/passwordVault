
interface PromiseHandlerInterface<T> {
    data?: T,
    error?: any
}

export const handler = <T> (promiseCallback: Promise<T>): Promise<PromiseHandlerInterface<T>> => {
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