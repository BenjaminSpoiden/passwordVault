import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

export const UserRoute = (
    app: FastifyInstance, 
    options: FastifyPluginOptions, 
    done: (error?: FastifyError) => void
    ) => {
        
        done()
}