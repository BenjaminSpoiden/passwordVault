import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { getUsersHandler, registerUserHandler } from "./user.controller";

export const UserRoute = (
    app: FastifyInstance, 
    options: FastifyPluginOptions, 
    done: (error?: FastifyError) => void
    ) => {
        app.post('/', registerUserHandler)
        app.get('/', getUsersHandler)
        done()
}