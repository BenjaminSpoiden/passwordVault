import { logger } from "./utils/logger"
import { CreateServer } from "./utils/createServer"
import { handler } from "./utils/promiseHandler"
import { FastifyInstance } from "fastify"
import { prismaClient } from "./utils/db"

const shutdown = (shutdownSignal: string, app: FastifyInstance) => {
    process.on(shutdownSignal, async () => {
        logger.info('Shutting Down Server')
        app.close()
        prismaClient.$disconnect()
        process.exit(0)
    })
}

const main = async () => {
    const server = CreateServer()

    const { data, error } = await handler(server.listen(4000, '0.0.0.0'))
    if(error) { 
        logger.error(error)
        process.exit(1) 
    }

    logger.info(`Server Listening at ${data}`)

    const shutdownSignals = ["SIGTERM", "SIGINT"]

    shutdownSignals.forEach(signal => {
        shutdown(signal, server)
    })

    
}

main()