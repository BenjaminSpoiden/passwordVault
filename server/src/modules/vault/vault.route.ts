import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

export const VaultRoute = (
    app: FastifyInstance, 
    options: FastifyPluginOptions, 
    done: (error?: FastifyError) => void
    ) => {
        
        done()
}