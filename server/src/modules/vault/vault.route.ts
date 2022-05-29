import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { updateVaultHandler } from "./vault.controller";

export const VaultRoute = (
    app: FastifyInstance, 
    options: FastifyPluginOptions, 
    done: (error?: FastifyError) => void
    ) => {
        app.put('/', {
            onRequest: [app.authenticate]
        } ,updateVaultHandler)
        done()
}