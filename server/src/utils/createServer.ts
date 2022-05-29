import fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import fs from "fs"
import path from "path"
import fastifyCookie from "@fastify/cookie"
import { FastifyRequest, FastifyReply } from "fastify"
import { handler } from "./promiseHandler"
import { logger } from "./logger"
import { UserRoute } from "../modules/user/user.route"
import { VaultRoute } from "../modules/vault/vault.route"

export const CreateServer = () => {
    const app = fastify()

    app.register(cors, {
        origin: 'http://localhost:3000',
        credentials: true
    })

    app.register(jwt, {
        secret: {
            private: fs.readFileSync(`${path.join(process.cwd(), 'certifications')}/private.key`),
            public:  fs.readFileSync(`${path.join(process.cwd(), 'certifications')}/public.key`)
        },
        sign: {
            algorithm: "RS256"
        },
        cookie: { cookieName: 'token', signed: false }
    })

    app.register(fastifyCookie)

    app.decorate("Auth", async (req: FastifyRequest, reply: FastifyReply) => {
        const { data: user, error } = await handler(req.jwtVerify<{
            _id: string
        }>())
        if(error) {
            logger.error(error)
            process.exit(1)
        }

        req.user = user
    })

    app.register(UserRoute,  { prefix: 'api/users' })
    app.register(VaultRoute, { prefix: 'api/vault' })

    return app
}