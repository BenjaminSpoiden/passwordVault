import { CreateServer } from "./utils/createServer"
import { handler } from "./utils/promiseHandler"

console.log("INDEX FILE")


const main = async () => {
    const server = CreateServer()

    const { data, error } = await handler(server.listen(4000, '0.0.0.0'))
    if(error) { 
        console.error(error)
        process.exit(1) 
    }

    console.log(`Server Listening at ${data}`)
    
}

main()